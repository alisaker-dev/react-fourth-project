import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { Axios } from "../../../../Api/Axios";
import { CART, pro } from "../../../../Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import SkeletonShow from "../../Skeleton/SkeletonShow";
import { Cart } from "../../../../Context/CartChangerContext";
import PlusMinus from "../../Btns/PlusMinus";
export default function SingleProduct() {
  const [product, setProduct] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const [count, setCount] = useState(5);
  const [error, setError] = useState("");
  const [loadingCart, setLoadingCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const roundStars = Math.round(product.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((item, index) => (
    <FontAwesomeIcon color="gold" key={index} icon={solid} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map(
    (item, index) => <FontAwesomeIcon key={index} icon={regularStar} />,
  );
  useEffect(() => {
    Axios.get(`${pro}/${id}`)
      .then((res) => {
        setProductImage(res.data[0].images);
        setProduct(res.data[0]);
      })
      .finally(() => setLoading(false));
  }, []);
  const images = [];
  productImage.map((item) =>
    images.push({ original: `${item.image}`, thumbnail: `${item.image}` }),
  );
  // check if there are products enough
  const checkStock = async () => {
    try {
      setLoadingCart(true);
      const getItems = JSON.parse(localStorage.getItem("product")) || [];
      const productCount = getItems.filter((item) => item.id == id)?.[0]?.count;
      await Axios.post(`${CART}/check`, {
        product_id: product.id,
        count: count + (productCount ? productCount : 0),
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      setLoadingCart(false);
    }
  };

  // add to cart
  const { setIsChange } = useContext(Cart);
  const handleSave = async () => {
    const check = await checkStock();
    if (check) {
      const getItems = JSON.parse(localStorage.getItem("product")) || [];
      const productExist = getItems.findIndex((pro) => pro.id == id);
      if (productExist !== -1) {
        // المنتج موجود
        if (getItems[productExist].count) {
          getItems[productExist].count += count;
        } else {
          getItems[productExist].count = count;
        }
      } else {
        // المنتج غير موجود
        if (count > 1) {
          product.count = count;
        }
        getItems.push(product);
      }
      localStorage.setItem("product", JSON.stringify(getItems));
      setIsChange((prev) => !prev);
    }
  };
  return (
    <Container>
      <div className="d-flex align-items-start flex-wrap">
        <div className="col-lg-4 col-md-6 col-12">
          {loading ? (
            <>
              <SkeletonShow length="1" height="120px" />
              <div className="col-3 d-flex">
                <SkeletonShow length="1" height="40px" />
                <SkeletonShow length="1" height="40px" />
                <SkeletonShow length="1" height="40px" />
              </div>
            </>
          ) : (
            <ImageGallery items={images} />
          )}
        </div>
        <div className="col-lg-8 col-md-6 col-12">
          <div className="ms-5">
            <h1>{product.title}</h1>
            <p style={{ fontSize: "10px" }}>{product.description}</p>
            <p>{product.About}</p>
            <div className="d-flex align-items-center justify-content-between mt-2">
              <div>
                {(product.stock === 1 && (
                  <p className="text-danger"> there is only 1 left</p>
                )) ||
                  (product.stock === 0 && (
                    <p className="text-danger"> this product is unavilable</p>
                  ))}
                {showGoldStars}
                {showEmptyStars}
                <div className="d-flex align-items-center gap-3">
                  <h5 className="m-0 text-primary">{product.discount}$</h5>
                  <h6
                    className="m-0"
                    style={{ color: "gray", textDecoration: "line-through" }}
                  >
                    {product.price}$
                  </h6>
                </div>
              </div>
              <div className="d-flex gap-3">
                <div onClick={handleSave} className="border p-2 rounded">
                  <img
                    src={require("../../../../Assets/cart.png")}
                    alt="cart"
                    width="20px"
                  />
                </div>
                <PlusMinus setCount={(data) => setCount(data)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
