import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { LATESTSALE } from "../../../Api/Api";
import Product from "../Product/Product";

export default function LatestSaleProduct() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    Axios.get(`${LATESTSALE}`).then((res) => setProducts(res.data));
  }, []);
  const productSaleShow = products.map((product) => < Product key={product.id} title={product.title} description={product.description} img={product.images} price={product.price} discount={product.discount} rating={product.rating} />);
console.log(products);

  return (
    <div className="flex items-center justify-center flex-wrap mt-5">
      {productSaleShow}
    </div>
  );
}
