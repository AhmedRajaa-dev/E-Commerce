import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar,faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import i from "../../../Assits/logo (2).png";
export default function product() {
  return (
    <div className="w-full h-[500px]">
      <h1>Deal Of The Day</h1>
      <div className=" flex items-center justify-center  ">
        <div className="w-80 h-[400px]  bg-slate-500 rounded-md p-3.5  ">
          <div className="w-72 h-48 bg-slate-200 mx-auto  rounded-sm ">
            <img src="" alt="" />
          </div>
          <div>
            <div className="start flex items-center justify-between mt-2">
              <div>
                <FontAwesomeIcon icon={solid} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
              <h4>4.5</h4>
            </div>
            <div className="mt-2 contetn w-72 bg-slate-200">lkf'psf'powp'efon'wpfn'nf'snf;oihweofhepjf;laah;emdj;
              fafhaahmedr</div>
            <div>
              <h3>129$</h3>
              <h4>dicount</h4>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <button>
              buyNow
              </button>
              <FontAwesomeIcon size="24px" icon={faCartShopping}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
