import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { Axios } from "../../Api/Axios";
import { LOGOUT, USER } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Cookie from "cookie-universal";
export default function Topbar() {
  const menu = useContext(Menu);
  const navigate = useNavigate();
  const setIsOpen = menu.setIsOpen;
  const cookie = Cookie();
  const [name, setName] = useState("");

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setName(data.data.name))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  async function handleLogOut() {
    try {
      const res = await Axios.get(`/${LOGOUT}`);
      cookie.remove("e-commerce");
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="top-bar">
      <div className="top-bar d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-5">
          <h3>E-COMMERCE</h3>
          <FontAwesomeIcon
            onClick={() => setIsOpen((prev) => !prev)}
            cursor={"pointer"}
            icon={faBars}
          />
        </div>
        <div className="d-flex gap-3">
          <a href="/" className="btn btn-primary">
            WebSite
          </a>
          <div>
            <DropdownButton id="dropdown-basic-button" title={name}>
              <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    </div>
  );
}
