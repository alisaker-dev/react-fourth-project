import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { cat, CAT } from "../../Api/Api";
import { useEffect, useState } from "react";
import TableShow from "../../Components/Dashboard/Table";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);

  // get all categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CAT}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCategories(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  }, [limit, page]);
  const header = [
    { k: "title", name: "Title" },
    { k: "image", name: "Image" },
    { k: "created_at", name: "Created At" },
    { k: "updated_at", name: "Updated At" },
  ];

  // handle delete
  async function handleDelete(id) {
    try {
      await Axios.delete(`${cat}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Categories Page</h1>
        <Link className="btn btn-primary" to="/dashboard/category/add">
          Add Categories
        </Link>
      </div>
      <TableShow
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        header={header}
        data={categories}
        delete={handleDelete}
        loading={loading}
        total={total}
        search="title"
        searchLink={cat}
      />
    </div>
  );
}
