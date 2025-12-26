import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState, useRef } from "react";
import { Menu } from "../../Context/MenuContext";
import { Axios } from "../../Api/Axios";
import { LOGOUT, USER } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal" 

export default function TopBar(){
    const [name,setName]=useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false); 
    const CMenu=useContext(Menu);
    const navigate=useNavigate();
    const cookie=new Cookie()
    const isSetOpen=CMenu.isSetOpenMenu;
    const dropdownRef = useRef(null);

   // console.log(isSetOpen);

    useEffect(()=>{
       // console.log('fromtop bar')
        Axios.get(`/${USER}`)
            .then((res)=>{setName(res.data.name)})
            .catch(()=>navigate("/login"))
    },[]);

    // close Dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    async function handleLogout(){
            
            try{
                const res=await Axios.get(`/${LOGOUT}`);
                console.log(res)
                cookie.remove("token");
                window.location.pathname="/login";
            }catch (error){
                console.log(error);
            }
        }

    return (
        <div className="fixed top-0 left-0 w-full h-[70px] bg-white shadow-md z-20 flex items-center justify-between p-5">
            <div className="flex items-center content-center gap-20">
                <h3 className="text-lg">ECommerce</h3>
                <FontAwesomeIcon icon={faBars} cursor={"pointer"} onClick={()=>isSetOpen(prev=>!prev)}/>  
            </div>

            {/* Dropdown  */}
            <div ref={dropdownRef} className="relative">
                <button
                    onClick={() => setDropdownOpen(prev => !prev)}
                    className="inline-flex items-center px-4 py-2 bg-blue-800 text-white rounded"
                >
                    {name}
                    <svg
                        className="w-4 h-4 ms-1.5 -me-0.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 9-7 7-7-7"
                        />
                    </svg>
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg">
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={handleLogout}
                        >
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
