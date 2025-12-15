import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/SideBar";
import TopBar from "../../Components/Dashboard/TopBar";

export default function Dashboard(){
    return (
        <div className=" h-screen relative bg-gray-100 ">
            <TopBar/>
            <div className="mt-20 flex  gap-1">
                <SideBar/>
                <Outlet/>
            </div>
            

        </div>
    );
}