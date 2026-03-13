import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { LatestSale } from "../../../Api/Api";
import Productq from "./Productq";
import SkeletonShow from "../Skeleton/SkeletonShow";

export default function LatestSaleProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${LatestSale}`)
      .then((res) => setProducts(res.data))
      .finally(setLoading(false));
  }, []);
  const productsShow = products.map((product, key) => (
    <Productq
      title={product.title}
      description={product.description}
      key={key}
      img={product.images[0].image}
      sale
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      id={product.id}
    />
  ));
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap gap-3">
        {loading ? (
          <>
            <SkeletonShow length="8" height="70px" classes="col-lg-3" />
          </>
        ) : (
          productsShow
        )}
      </div>
    </>
  );
}
