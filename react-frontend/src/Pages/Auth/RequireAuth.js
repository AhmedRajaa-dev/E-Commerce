import { data, Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal"
import { useEffect, useState } from "react";
import axios from "axios";
import { bascURL, USER } from "../../Api/Api";
import Laouding from "../../Css/Laouding";
import Error403 from "./Error403";

export default function RequireAuth({allowedRole}){
    const navigate=useNavigate();
    const cookie=new Cookie();
    const token=cookie.get("token");
    const [user,setUser]=useState("");
    useEffect(()=>{
        axios.get(`${bascURL}/${USER}`,{headers:{
            Authorization:`Bearer ${token}`
        }}).then((res)=>{setUser(res.data)}).catch(()=>navigate("/login"))
    },[]);
    
    if(!token){
        <Navigate to={"/login"}replace={true}/>
    }
    if(user===""){
        return  <div className="flex min-h-screen items-center justify-center"><Laouding/></div>
        
    }
    if(allowedRole.includes(user.role)){
        return<Outlet/>
    }else{
       return <Error403/>
    }

       
        
    
    
} 