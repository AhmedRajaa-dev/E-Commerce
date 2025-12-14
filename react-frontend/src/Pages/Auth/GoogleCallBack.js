import axios from "axios"
import { useEffect } from "react"
import { bascURL, GOOGLE_CALL_BACK } from "../../Api/Api";
import { useLocation } from "react-router-dom";

export default function GoogleCallBack(){
    const location=useLocation();
    useEffect(()=>{
        async function GoogleCall(){
            try{
            const res=await axios.get(`${bascURL}/${GOOGLE_CALL_BACK}${location.search}`);
            console.log(res);
            console.log("..........")
            }catch (error){
                console.log(error);
            }
        }
        GoogleCall();

    },[])
    return (
        <div>test</div>
    )
}