/* eslint-disable jsx-a11y/anchor-is-valid */
import LatestSaleProducts from "../Product/LatestSaleProducts";
import "./style.css";
export default function Landing() {
  return (
    <>
      <div className="bg-primary text-white py-5">
        <div className="container py-5">
          <h1>
            Best products & <br />
            brands in our store
          </h1>
          <p>Trendy Products, Factory Prices, Excellent Service</p>
          <button type="button" className="btn btn-outline-light mx-2">
            Learn more
          </button>
          <button
            type="button"
            className="btn btn-light shadow-0 text-primary pt-2 border border-white"
          >
            <span className="pt-1">Purchase now</span>
          </button>
        </div>
      </div>
      {/*  Products */}
      <section>
        <div className="container my-5">
          <header className="mb-4 d-flex align-items-center justify-content-between">
            <h3>New products</h3>
            <div className="d-flex">
              <div>
                <div className="form-outline">
                  <label className="form-label" htmlFor="form1">
                    Search
                  </label>
                  <input type="search" id="form1" className="form-control" />
                </div>
                <button type="button" className="btn btn-primary shadow-0 mt-2">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </header>
          <LatestSaleProducts />
        </div>
      </section>

      {/*  Feature  */}
      <section className="mt-5" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="container text-dark pt-3">
          <header className="pt-4 pb-3">
            <h3>Why choose us</h3>
          </header>

          <div className="row mb-4">
            <div className="col-lg-4 col-md-6">
              <figure className="d-flex align-items-center mb-4">
                <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                  <i className="fas fa-camera-retro fa-2x fa-fw text-primary floating"></i>
                </span>
                <figcaption className="info">
                  <h6>Reasonable prices</h6>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit sed
                    do eiusmor
                  </p>
                </figcaption>
              </figure>
            </div>

            <div className="col-lg-4 col-md-6">
              <figure className="d-flex align-items-center mb-4">
                <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                  <i className="fas fa-star fa-2x fa-fw text-primary floating"></i>
                </span>
                <figcaption className="info">
                  <h6>Best quality</h6>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit sed
                    do eiusmor
                  </p>
                </figcaption>
              </figure>
            </div>
            <div className="col-lg-4 col-md-6">
              <figure className="d-flex align-items-center mb-4">
                <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                  <i className="fas fa-plane fa-2x fa-fw text-primary floating"></i>
                </span>
                <figcaption className="info">
                  <h6>Worldwide shipping</h6>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit sed
                    do eiusmor
                  </p>
                </figcaption>
              </figure>
            </div>
            <div className="col-lg-4 col-md-6">
              <figure className="d-flex align-items-center mb-4">
                <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                  <i className="fas fa-users fa-2x fa-fw text-primary floating"></i>
                </span>
                <figcaption className="info">
                  <h6>Customer satisfaction</h6>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit sed
                    do eiusmor
                  </p>
                </figcaption>
              </figure>
            </div>
            <div className="col-lg-4 col-md-6">
              <figure className="d-flex align-items-center mb-4">
                <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                  <i className="fas fa-thumbs-up fa-2x fa-fw text-primary floating"></i>
                </span>
                <figcaption className="info">
                  <h6>Happy customers</h6>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit sed
                    do eiusmor
                  </p>
                </figcaption>
              </figure>
            </div>
            <div className="col-lg-4 col-md-6">
              <figure className="d-flex align-items-center mb-4">
                <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                  <i className="fas fa-box fa-2x fa-fw text-primary floating"></i>
                </span>
                <figcaption className="info">
                  <h6>Thousand items</h6>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit sed
                    do eiusmor
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 mb-4">
        <div className="container text-dark">
          <header className="mb-4">
            <h3>Blog posts</h3>
          </header>

          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <article>
                <a href="#" className="img-fluid">
                  <img
                    className="rounded w-100"
                    src="https://mdbootstrap.com/img/bootstrap-ecommerce/posts/1.webp"
                    style={{ objectFit: "cover" }}
                    height="160"
                    alt="mdbootstrap"
                  />
                </a>
                <div className="mt-2 text-muted small d-block mb-1">
                  <span>
                    <i className="fa fa-calendar-alt fa-sm"></i>
                    23.12.2025
                  </span>
                  <a href="#">
                    <h6 className="text-dark">How to promote brands</h6>
                  </a>
                  <p>
                    When you enter into any new area of science, you almost
                    reach
                  </p>
                </div>
              </article>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <article>
                <a href="#" className="img-fluid">
                  <img
                    className="rounded w-100"
                    src="https://mdbootstrap.com/img/bootstrap-ecommerce/posts/2.webp"
                    style={{ objectFit: "cover" }}
                    height="160"
                    alt="mdbootstrap"
                  />
                </a>
                <div className="mt-2 text-muted small d-block mb-1">
                  <span>
                    <i className="fa fa-calendar-alt fa-sm"></i>
                    13.12.2024
                  </span>
                  <a href="#">
                    <h6 className="text-dark">How we handle shipping</h6>
                  </a>
                  <p>
                    When you enter into any new area of science, you almost
                    reach
                  </p>
                </div>
              </article>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <article>
                <a href="#" className="img-fluid">
                  <img
                    className="rounded w-100"
                    src="https://mdbootstrap.com/img/bootstrap-ecommerce/posts/3.webp"
                    style={{ objectFit: "cover" }}
                    height="160"
                    alt="mdbootstrap"
                  />
                </a>
                <div className="mt-2 text-muted small d-block mb-1">
                  <span>
                    <i className="fa fa-calendar-alt fa-sm"></i>
                    25.11.2025
                  </span>
                  <a href="#">
                    <h6 className="text-dark">How to promote brands</h6>
                  </a>
                  <p>
                    When you enter into any new area of science, you almost
                    reach
                  </p>
                </div>
              </article>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <article>
                <a href="#" className="img-fluid">
                  <img
                    className="rounded w-100"
                    src="https://mdbootstrap.com/img/bootstrap-ecommerce/posts/4.webp"
                    style={{ objectFit: "cover" }}
                    height="160"
                    alt="mdbootstrap"
                  />
                </a>
                <div className="mt-2 text-muted small d-block mb-1">
                  <span>
                    <i className="fa fa-calendar-alt fa-sm"></i>
                    03.09.2025
                  </span>
                  <a href="#">
                    <h6 className="text-dark">Success story of sellers</h6>
                  </a>
                  <p>
                    When you enter into any new area of science, you almost
                    reach
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/*  Footer  */}
      <footer
        className="text-center text-lg-start text-muted mt-3"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <section className="">
          <div className="container text-center text-md-start pt-4 pb-4">
            <div className="row mt-3">
              <div className="col-12 col-lg-3 col-sm-12 mb-2">
                <a href="#" rel="noreferrer">
                  <img
                    src={require("../../../Assets/logo.png")}
                    height="35"
                    alt="e-commerce"
                  />
                </a>
                <p className="mt-2 text-dark">
                  © 2026 Copyright: e-commerce.com
                </p>
              </div>

              <div className="col-6 col-sm-4 col-lg-2">
                <h6 className="text-uppercase text-dark fw-bold mb-2">Store</h6>
                <ul className="list-unstyled mb-4">
                  <li>
                    <a className="text-muted" href="#">
                      About us
                    </a>
                  </li>
                  <li>
                    <a className="text-muted" href="#">
                      Find store
                    </a>
                  </li>
                  <li>
                    <a className="text-muted" href="#">
                      Categories
                    </a>
                  </li>
                  <li>
                    <a className="text-muted" href="#">
                      Blogs
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-sm-4 col-lg-2">
                <h6 className="text-uppercase text-dark fw-bold mb-2">
                  Information
                </h6>
                <ul className="list-unstyled mb-4">
                  <li>
                    <a className="text-muted" href="#">
                      Help center
                    </a>
                  </li>
                  <li>
                    <a className="text-muted" href="#">
                      Money refund
                    </a>
                  </li>
                  <li>
                    <a className="text-muted" href="#">
                      Shipping info
                    </a>
                  </li>
                  <li>
                    <a className="text-muted" href="#">
                      Refunds
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-sm-4 col-lg-2">
                <h6 className="text-uppercase text-dark fw-bold mb-2">
                  Support
                </h6>
                <ul className="list-unstyled mb-4">
                  <li>
                    <a className="text-muted" href="#">
                      Help center
                    </a>
                  </li>
                  <li>
                    <a className="text-muted" href="#">
                      Documents
                    </a>
                  </li>
                  <li>
                    <a className="text-muted" href="#">
                      Account restore
                    </a>
                  </li>
                  <li>
                    <a className="text-muted" href="#">
                      My orders
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-12 col-sm-12 col-lg-3">
                <h6 className="text-uppercase text-dark fw-bold mb-2">
                  Newsletter
                </h6>
                <p className="text-muted">
                  Stay in touch with latest updates about our products and
                  offers
                </p>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control border"
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="button-addon2"
                  />
                  <button
                    className="btn btn-light border shadow-0"
                    type="button"
                    id="button-addon2"
                    data-mdb-ripple-color="dark"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="">
          <div className="container">
            <div className="d-flex justify-content-between py-4 border-top">
              {/*  payment  */}
              <div className="d-flex gap-3">
                <i className="fab fa-lg fa-cc-visa text-dark"></i>
                <i className="fab fa-lg fa-cc-amex text-dark"></i>
                <i className="fab fa-lg fa-cc-mastercard text-dark"></i>
                <i className="fab fa-lg fa-cc-paypal text-dark"></i>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
