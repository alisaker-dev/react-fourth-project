import { Link } from "react-router-dom";
import { Axios } from "../../Api/Axios";
import { pro, PRO } from "../../Api/Api";
import { useEffect, useState } from "react";
import TableShow from "../../Components/Dashboard/Table";

export default function Products() {
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(1);

  // get all products
  useEffect(() => {
    Axios.get(`/${PRO}?limit=${limit}&page=${page}`)
      .then((data) => {
        setProducts(data.data.data);
        setTotal(data.data.total);
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  }, [limit, page]);
  const header = [
    { k: "images", name: "Images" },
    { k: "title", name: "Title" },
    { k: "description", name: "Description" },
    { k: "price", name: "Price" },
    { k: "rating", name: "Rating" },
    { k: "created_at", name: "Created At" },
    { k: "updated_at", name: "Updated At" },
  ];

  // handle delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${pro}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Products Page</h1>
        <Link className="btn btn-primary" to="/dashboard/product/add">
          Add Product
        </Link>
      </div>
      <TableShow
        setPage={setPage}
        page={page}
        limit={limit}
        setLimit={setLimit}
        header={header}
        data={products}
        delete={handleDelete}
        total={total}
        search="title"
        searchLink={pro}
      />
    </div>
  );
}
