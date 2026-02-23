import Landing from "../../../Components/WebSite/Landing/Landing";
import LatestSaleProduct from "../../../Components/WebSite/Product/LatestSaleProduct";
import ShowTopRated from "../../../Components/WebSite/Product/ShowTopRated";

export default function HomeWebSite() {
  return (
    <div className="home">
      <Landing />
      <LatestSaleProduct />
      <div>
        <ShowTopRated/>
      </div>
    </div>
  );
}
