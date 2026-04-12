import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import TopRated from "./TopRated";
import LatestSaleProduct from "./LatestSaleProduct";
import {  TOPRATED } from "../../../Api/Api";
export default function ShowTopRated() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const res = Axios.get(`${TOPRATED}`)
      .then((res) => setProduct(res.data))
      .finally(() => setLoading(false));
  }, []);
  const productsShow = product.map((product) => (
    <TopRated
      title={product.title}
      description={product.description}
      img={product.images}
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      id={product.id}
    />
  ));

  return (
    <div className="w-80 h-[400px]  bg-slate-500 rounded-md p-3.5 m-4 flex items-center justify-between ">
      {productsShow}
    </div>
  );
}
