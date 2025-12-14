import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Menu } from "../../Context/MenuContext";

export default function TopBar(){
    const CMenu=useContext(Menu);
    const isSetOpen=CMenu.isSetOpenMenu;
    console.log(isSetOpen)
    
    return (
        <div className="fixed top-0 left-0  w-full h-[70px] bg-white shadow-md z-20 flex items-center justify-between p-5 ">
        <div className="flex items-center content-center gap-20">
            <h3 className="text-lg">ECommerce</h3>
        <FontAwesomeIcon icon={faBars} cursor={"pointer"} onClick={()=>isSetOpen(prev=>!prev)}/>  
        </div>
        </div>
    )
} 