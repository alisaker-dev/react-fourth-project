import { useEffect, useState } from "react";
import { USER, USERS } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { Link } from "react-router-dom";
import TableShow from "../../Components/Dashboard/Table";

export default function Users() {
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [total, setTotal] = useState(1);

  // get cuurent user
  useEffect(() => {
    Axios.get(`${USER}`).then((res) => setCurrentUser(res.data));
  }, []);
  // get all users
  useEffect(() => {
    Axios.get(`/${USERS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setUsers(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err));
  }, [limit, page]);

  const header = [
    { k: "name", name: "Username" },
    { k: "email", name: "Email" },
    { k: "role", name: "Role" },
    { k: "created_at", name: "Created At" },
    { k: "updated_at", name: "Updated At" },
  ];
  // handle delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="bg-white w-100 p-2 rounded shadow-sm">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Users Page</h1>
        <Link className="btn btn-primary" to="/dashboard/users/add">
          Add User
        </Link>
      </div>
      <TableShow
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        header={header}
        data={users}
        currentUser={currentUser}
        delete={handleDelete}
        total={total}
        search="name"
        searchLink={USER}
      />
    </div>
  );
}
