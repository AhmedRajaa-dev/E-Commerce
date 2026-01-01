import { faClipboardList, faP, faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { use, useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { bascURL, USER } from "../../Api/Api";
import { Axios } from "../../Api/Axios";


export default function SideBar(){
    const navigate=useNavigate()
    const CMenu=useContext(Menu);
    const isOpen= CMenu.isOpenMenu;
    const [user,setUser]=useState("");
    useEffect(()=>{
        Axios.get(`/${USER}`).then((res)=>{setUser(res.data)}).catch(()=>navigate("/login"))
    },[]);
    
   
    return (
        <div className={`sticky top-[70px] left-0 bg-white h-screen shadow-md z-10 ${isOpen ? "w-[220px]" : "w-fit"}`}>

  {/* Admin */}
  {user.role === "1995"&&"1999" && (
    <>
      <NavLink to="users" className={({ isActive }) =>
        `flex items-center gap-2 mt-2 mx-2 text-lg rounded-lg
        ${isActive ? "bg-[#f2f3fe] text-black" : "text-[#495057] hover:text-black"}`
      }>
        <FontAwesomeIcon icon={faUsers} className={isOpen ? "px-2.5 py-2.5" : "px-1 py-2.5"} />
        {isOpen && <p className="m-0">Users</p>}
      </NavLink>

      <NavLink to="user/add" className={({ isActive }) =>
        `flex items-center gap-2 mt-2 mx-2 text-lg rounded-lg
        ${isActive ? "bg-[#f2f3fe] text-black" : "text-[#495057] hover:text-black"}`
      }>
        <FontAwesomeIcon icon={faPlus} className={isOpen ? "px-2.5 py-2.5" : "px-1 py-2.5"} />
        {isOpen && <p className="m-0">Add Users</p>}
      </NavLink>
      <NavLink to="categories" className={({ isActive }) =>
        `flex items-center gap-2 mt-2 mx-2 text-lg rounded-lg
        ${isActive ? "bg-[#f2f3fe] text-black" : "text-[#495057] hover:text-black"}`
      }>
        <FontAwesomeIcon icon={faClipboardList} className={isOpen ? "px-2.5 py-2.5" : "px-1 py-2.5"} />
        {isOpen && <p className="m-0">Category</p>}
      </NavLink>
      <NavLink to="products;" className={({ isActive }) =>
        `flex items-center gap-2 mt-2 mx-2 text-lg rounded-lg
        ${isActive ? "bg-[#f2f3fe] text-black" : "text-[#495057] hover:text-black"}`
      }>
        <FontAwesomeIcon icon={faP} className={isOpen ? "px-2.5 py-2.5" : "px-1 py-2.5"} />
        {isOpen && <p className="m-0">Products</p>}
      </NavLink>
    </>
  )}

  {/* Writer (Admin + Writer) */}
  {(user.role === "1995" || user.role === "1996") && (
    <NavLink to="/dashboard/writer" className={({ isActive }) =>
      `flex items-center gap-2 mt-2 mx-2 text-lg rounded-lg
      ${isActive ? "bg-[#f2f3fe] text-black" : "text-[#495057] hover:text-black"}`
    }>
      <FontAwesomeIcon icon={faPlus} className={isOpen ? "px-2.5 py-2.5" : "px-1 py-2.5"} />
      {isOpen && <p className="m-0">Writer</p>}
    </NavLink>
    
  )}

</div>

    )
}