import { Outlet } from "react-router-dom";
import TopContent from "../../Components/WebSite/TopContent";
import NavBar from "../../Components/WebSite/NavBar";

export default function WebSite() {
  return (
    <div>
      <>
        <NavBar />

        <Outlet />
      </>
    </div>
  );
}
