import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import i from "../../../Assits/logo (2).png";
export default function Product(props) {
  const stars = Math.min(props.rating, 5);
  const showGoldStars=Array.from({length:stars}).map((el,key)=>(
    <FontAwesomeIcon key={key} icon={solid} />
  ))
  return (
    <div className="w-80 h-[400px]  bg-slate-500 rounded-md p-3.5 m-4  ">
      <div className="w-72 h-48 bg-slate-200 mx-auto  rounded-sm ">
        <img src={props.img} alt="" />
      </div>
      <div>
        <div className="start flex items-center justify-between mt-2">
          <div>
           {showGoldStars}
          </div>
          <h4>4.5</h4>
        </div>
        <div className="mt-2 contetn w-72 bg-slate-200">
          <p className="title">{props.title}</p>
          <p className="description">{props.description}</p>
        </div>
        <div>
          <h3>{props.price}</h3>
          {props.discout ? <h4>props.discout</h4> : ""}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <button>buyNow</button>
          <FontAwesomeIcon size="24px" icon={faCartShopping} />
        </div>
      </div>
    </div>
  );
}
