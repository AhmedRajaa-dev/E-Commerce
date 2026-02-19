import NavBar from "../../../Components/WebSite/NavBar";
import Product from "../../../Components/WebSite/Product/Product";
import Landing from "../../../Components/WebSite/Landing/Landing";

export default function HomeWebSite() {
  return (
    <div className="home">
      <Landing />
      <Product />
    </div>
  );
}
