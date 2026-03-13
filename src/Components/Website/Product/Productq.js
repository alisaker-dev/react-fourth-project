import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import StringSlice from "../../../helpers/StringSlice";
import { NavLink } from "react-router-dom";

export default function Productq(props) {
  const roundStars = Math.round(props.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((item, index) => (
    <FontAwesomeIcon color="gold" key={index} icon={solid} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map(
    (item, index) => <FontAwesomeIcon key={index} icon={regularStar} />,
  );
  return (
    <NavLink
      to={`/product/${props.id}`}
      className="col-lg-3 col-md-6 col-12 border border-primary rounded p-2"
    >
      <div className="m-1 border rounded p-3 h-100">
        <div className="border-bottom pb-3">
          <p className="text-truncate" style={{ color: "gray" }}>
            {StringSlice(props.title, 35)}
          </p>
          <p>{StringSlice(props.description, 45)}</p>
          {props.sale && (
            <p
              className="m-0 position-absolute bg-primary rounded-circle text-white text-uppercase d-inline-block text-center"
              style={{ width: "50px", height: "50px", lineHeight: "50px" }}
            >
              Sale
            </p>
          )}
          <img src={props.img} alt="img" className="img-fluid" />
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between mt-2">
        <div>
          {showGoldStars}
          {showEmptyStars}
          <div className="d-flex align-items-center gap-3">
            <h5 className="m-0 text-primary">{props.discount}$</h5>
            <h6
              className="m-0"
              style={{ color: "gray", textDecoration: "line-through" }}
            >
              {props.price}$
            </h6>
          </div>
        </div>
        <div className="border p-2 rounded">
          <img
            src={require("../../../Assets/cart.png")}
            alt="cart"
            width="20px"
          />
        </div>
      </div>
    </NavLink>
  );
}
