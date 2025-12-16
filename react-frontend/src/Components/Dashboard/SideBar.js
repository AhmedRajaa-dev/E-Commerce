import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";

export default function SideBar(){
    const CMenu=useContext(Menu);
    const isOpen= CMenu.isOpenMenu;
    
   
    return (
        <div className={`sticky top-[70px] left-0 bg-white h-screen shadow-md z-10 ${isOpen?"w-[220px]":"w-fit"} `}>
            <NavLink to={"users"} className={({isActive})=>
            `flex items-center gap-2 mt-2  my-0 mx-2 text-lg text-[#495057] hover:text-black :bg-[#f2f3fe] rounded-lg ${isActive ?"bg-[#f2f3fe] text-black": "text-[#495057] hover:text-black"}
            `}
            >
            <FontAwesomeIcon icon={faUsers} className={`${isOpen?"px-2.5 py-2.5":"px-1 py-2.5"}`} />
            {isOpen&&<p className="m-0">Users</p>}
            </NavLink>
            <NavLink to={"user/add"} className={({isActive})=>
            `flex items-center gap-2 mt-2  my-0 mx-2 text-lg text-[#495057] hover:text-black :bg-[#f2f3fe] rounded-lg ${isActive ?"bg-[#f2f3fe] text-black": "text-[#495057] hover:text-black"}
            `}
            >
            <FontAwesomeIcon icon={faPlus} className={`${isOpen?"px-2.5 py-2.5":"px-1 py-2.5"}`} />
            {isOpen&&<p className="m-0">Add Users</p>}
            </NavLink>
        </div>
    )
}