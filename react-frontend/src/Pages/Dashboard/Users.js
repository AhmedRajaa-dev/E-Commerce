import { useEffect } from "react"
import Cookie from "cookie-universal";
import axios from "axios";
import { bascURL, USERS } from "../../Api/Api";

export default function Users(){
    const cookie=new Cookie();
    const token=cookie.get("token");
    useEffect(()=>{
        const res=axios.get(`${bascURL}/${USERS}`,{headers:{
            Authorization:`Bearer ${token}`
        }}).then((data)=>console.log(data));
    
    },[]);

    return (
        <div>
            <h2>Users page</h2>
        </div>
    )
}