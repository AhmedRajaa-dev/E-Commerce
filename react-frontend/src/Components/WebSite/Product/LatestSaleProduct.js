import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { LATEST } from "../../../Api/Api";
import Product from "../Product/Product";
import Skeleton from "react-loading-skeleton";
import ShowTopRated from "./ShowTopRated";

export default function LatestSaleProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${LATEST}`)
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);
  const productSaleShow = products.map((product) => (
    <Product
      key={product.id}
      title={product.title}
      description={product.description}
      img={product.images}
      price={product.price}
      discount={product.discount}
      rating={product.rating}
    />
  ));
  console.log(products);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="flex items-center justify-center flex-wrap mt-5">
          {loading ? (
            <>
              <div className=" flex items-center justify-center flex-wrap">
                <div className="h-80 w-80 m-5">
                  {" "}
                  <Skeleton height="300px" width="400px" />
                </div>
                <div className="h-80 w-80 m-5">
                  {" "}
                  <Skeleton height="300px" width="400px" />
                </div>
                <div className="h-80 w-80 m-5">
                  {" "}
                  <Skeleton height="300px" width="400px" />
                </div>
                <div className="h-80 w-80 m-5">
                  {" "}
                  <Skeleton height="300px" width="400px" />
                </div>
              </div>
            </>
          ) : (
            productSaleShow
          )}
        </div>
      </div>
    </>
  );
}
