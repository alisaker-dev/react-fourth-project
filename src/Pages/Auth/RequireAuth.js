import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { USER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import { Axios } from "../../Api/Axios";
import Err403 from "./403";

export default function RequireAuth({ allowedRole }) {
  const navigate = useNavigate();
  // user
  const [user, setUser] = useState({});
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  // token & cookie
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  // <Outlet /> :
  return token ? (
    Object.keys(user).length === 0 ? (
      <LoadingSubmit />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Err403 role={user.role} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
