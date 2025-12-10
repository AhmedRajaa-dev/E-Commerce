import axios from "axios";
import { bascURL, LOGOUT } from "../../Api/Api";
import Cookie from "cookie-universal";

export default function Logout(){
    const cookie=new Cookie();
    const token=cookie.get("token");
    async function handleLogout(){
        console.log(token);
        try{
            const res=await axios.get(`${bascURL}/${LOGOUT}`,{headers:{
                Authorization:`Bearer ${token}`
            }});
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