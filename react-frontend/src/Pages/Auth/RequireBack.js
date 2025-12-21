import Cookie from "cookie-universal"
import {  Navigate, Outlet } from "react-router-dom";
export default function RequireBack(){
    
     const cookie=new Cookie();
     const token =cookie.get("token");

   return token? <Navigate to="/dashboard/users"/>:<Outlet/>
}