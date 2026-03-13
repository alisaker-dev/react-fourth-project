import "./bars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "../../Context/WindowContext";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import { Links } from "./NavLink";

export default function Sidebar() {
  const menu = useContext(Menu);
  const WindowContext = useContext(WindowSize);
  const windowSize = WindowContext.windowSize;
  const isOpen = menu.isOpen;
  const navigate = useNavigate();
  // user
  const [user, setUser] = useState({});
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: "0",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0 , 0, 0 ,0.2)",
          display: windowSize < "768" && isOpen ? "block" : "none",
        }}
      ></div>
      <div
        className="side-bar pt-3"
        style={{
          left: windowSize < "768" ? (isOpen ? 0 : "-100%") : "0",
          width: isOpen ? "240px" : "fit-content",
          position: windowSize < "768" ? "fixed" : "sticky",
        }}
      >
        {Links.map(
          (link, key) =>
            link.role.includes(user.role) && (
              <NavLink
                key={key}
                to={link.path}
                className="d-flex align-items-center gap-2 side-bar-link"
              >
                <FontAwesomeIcon
                  style={{
                    padding: isOpen ? "10px 8px 10px 15px" : "10px 13px",
                  }}
                  icon={link.icon}
                />
                <p
                  className="m-0"
                  style={{ display: isOpen ? "block" : "none" }}
                >
                  {link.name}
                </p>
              </NavLink>
            ),
        )}
      </div>
    </>
  );
}
