/* eslint-disable jsx-a11y/anchor-is-valid */
import { CAT, LOGOUT } from "../../../Api/Api";
import { useContext, useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import StringSlice from "../../../helpers/StringSlice";
import SkeletonShow from "../Skeleton/SkeletonShow";
import { Button, Modal } from "react-bootstrap";
import { Cart } from "../../../Context/CartChangerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import PlusMinus from "../Btns/PlusMinus";
import Cookie from "cookie-universal";
export default function NavBar() {
  function handleToggle() {
    const navbar = document.querySelector("#navbarLeftAlignExample");
    if (navbar.style.display !== "block" || navbar.style.display === "none") {
      navbar.style.display = "block";
    } else {
      navbar.style.display = "none";
    }
  }
  const [count, setCount] = useState(5);
  // show or hide Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Categories, setCategories] = useState([]);
  useEffect(() => {
    Axios.get(`${CAT}`)
      .then((res) => setCategories(res.data.slice(-8)))
      .finally(setLoading(false));
  }, []);
  const categoriesShow = Categories.map((category, key) => (
    <p key={key} className="m-0">
      {StringSlice(category.title, 15)}
    </p>
  ));
  const [products, setProducts] = useState([]);
  const { isChange } = useContext(Cart);
  useEffect(() => {
    const getProducts = JSON.parse(localStorage.getItem("product"));
    setProducts(getProducts);
  }, [isChange]);
  // delete product from cart
  const handleDelete = (id) => {
    const filterProduct = products.filter((product) => product.id !== id);
    setProducts(filterProduct);
    localStorage.setItem("product", JSON.stringify(filterProduct));
  };

  const changeCount = (id, btnCount) => {
    const getProducts = JSON.parse(localStorage.getItem("product") || []);
    const findProduct = getProducts.find((product) => product.id === id);
    findProduct.count = btnCount;
    localStorage.setItem("product", JSON.stringify(getProducts));
  };
  // show products
  const showProducts = products?.map((item, key) => (
    <div key={key} className="d-flex flex-column">
      <div className="d-flex position-relative gap-2">
        <div
          onClick={() => handleDelete(item.id)}
          className="position-absolute rounded-circle d-flex align-items-center justify-content-center bg-danger text-white"
          style={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
            top: "0px",
            right: "0px",
          }}
        >
          <FontAwesomeIcon icon={faXmark} width="10px" />
        </div>
        <img src={item.images[0].image} alt="img" width="200px" />
        <h4>{item.title}</h4>
        <div>
          <p>{item.description}</p>
          <div className="d-flex gap-3">
            <span
              className="fw-light text-decoration-line-through"
              style={{ color: "rgb(0,0,0,0.3)" }}
            >
              {item.price}$
            </span>
            <span className="fw-bold" style={{ color: "blue" }}>
              {item.discount}$
            </span>
          </div>
        </div>
      </div>
      <PlusMinus
        changeCount={changeCount}
        id={item.id}
        count={item.count || 1}
        setCount={setCount}
      />
    </div>
  ));

  // log out
  async function handleLogOut() {
    try {
      const res = await Axios.get(`/${LOGOUT}`);
      cookie.remove("e-commerce");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  //confirm if is loged in or not
  const cookie = Cookie();
  const [isLogedIn, setIsLogedIn] = useState(false);
  useEffect(() => {
    cookie.get("e-commerce") ? setIsLogedIn(true) : setIsLogedIn(false);
  }, []);

  const [loading, setLoading] = useState(true);
  return (
    <>
      <div className="p-3 bg-white border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <div className="col-lg-2 col-sm-4 col-4">
              <a href="/" className="float-start" rel="noreferrer">
                <img
                  src={require("../../../Assets/logo.png")}
                  height="35"
                  alt="e-commerce"
                />
              </a>
            </div>
            <div className="d-flex flex-wrap align-items-center justify-content-between">
              <div className="">
                <div className="d-flex">
                  {isLogedIn ? (
                    <button
                      className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                      onClick={handleLogOut}
                      title="log out"
                    >
                      <FontAwesomeIcon icon={faArrowRightFromBracket} />
                      <p className="d-none d-md-block mb-0">Log out</p>
                    </button>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                        rel="noreferrer"
                        title="log in"
                      >
                        <i className="fas fa-user-alt m-1 me-md-2"></i>
                        <p className="d-none d-md-block mb-0">Sign in</p>
                      </a>
                    </>
                  )}
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Cart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="row gap-3">{showProducts}</div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary">Checkout</Button>
                    </Modal.Footer>
                  </Modal>
                  <div
                    className="border rounded py-1 px-3 nav-link d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={handleShow}
                    title="cart"
                  >
                    <i className="fas fa-shopping-cart m-1 me-md-2"></i>
                    <p className="d-none d-md-block mb-0">My cart</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container justify-content-center justify-content-md-between">
          <button
            className="navbar-toggler border py-2 text-dark"
            type="button"
            onClick={handleToggle}
            title="more"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div
            style={{ display: "none" }}
            className="navbar-collapse"
            id="navbarLeftAlignExample"
          >
            {loading ? (
              <SkeletonShow length="1" height="40px" />
            ) : (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link text-dark"
                    aria-current="page"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#">
                    Categories
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#">
                    Hot offers
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#">
                    Gift boxes
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#">
                    Projects
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#">
                    Menu item
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#">
                    Menu name
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
