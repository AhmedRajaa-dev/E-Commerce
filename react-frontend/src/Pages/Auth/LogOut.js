import {  LOGOUT } from "../../Api/Api";
import Cookie from "cookie-universal";
import { Axios } from "../../Api/Axios";

export default function Logout(){
    const cookie=new Cookie();
    const token=cookie.get("token");
    async function handleLogout(){
        console.log(token);
        try{
            const res=await Axios.get(`/${LOGOUT}`);
            console.log(res)
        }catch (error){
            console.log(error);
        }
    }
    return(
        <div>
            <button onClick={handleLogout}>LogOut</button>
        </div>
    )
}