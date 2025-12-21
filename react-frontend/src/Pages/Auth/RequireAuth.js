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
    const [isLoading,setIsLoading]= useState(false);
    const [error,setError]= useState(null);

    // useEffect(()=>{
    //     axios.get(`${bascURL}/${USER}`,{headers:{
    //         Authorization:`Bearer ${token}`
    //     }}).then((res)=>{setUser(res.data)}).catch(()=>navigate("/login"))
    // },[]);

    const fetchUserProfile = async ()=>{
        setIsLoading(true)
        try {
            
        const response = await axios.get(`${bascURL}/${USER}`,{headers:{
            Authorization:`Bearer ${token}`
        }})    
        setUser(response.data)
        } catch (error) {
            navigate('/login')
        }finally{
            setIsLoading(false)
        }
    
    }
    useEffect(()=>{
        fetchUserProfile()
    },[token])
    
    if(!token || !!error){
        <Navigate to={"/login"}replace={true}/>
    }
    if(isLoading){
        return  <div className="flex min-h-screen items-center justify-center"><Laouding/></div>
        
    }
    if(allowedRole.includes(user.role)){
        return<Outlet/>
    }else{
       return <Error403/>
    }

       
        
    
    
} 