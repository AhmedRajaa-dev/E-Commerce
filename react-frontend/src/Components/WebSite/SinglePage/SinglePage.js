import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import { PRODUCT } from "../../../Api/Api";

export default function SinglePage() {
  const [product, setProduct] = useState({});
  const [productImages, setProductImages] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`).then((res) => {
      const data = res.data[0];

      setProductImages(
        data.images.map((img) => {
          return {
            original: img.image,
            thumbnail: img.image,
          };
        }),
      );

      setProduct(res.data[0]);
    });
  }, [id]);

  return (
    <div className="mt-36 w-full max-w-4xl mx-auto bg-slate-500 p-4">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div className="w-full md:w-2/3">
          <ImageGallery
            items={productImages}
            onSlide={(index) => console.log("Slid to", index)}
          />
        </div>

        <div className="w-full md:w-1/3 bg-slate-600 p-4 text-white">
          <h1>{product.title[0]}</h1>
        </div>
      </div>
    </div>
  );
}
