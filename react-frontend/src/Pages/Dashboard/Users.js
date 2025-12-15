import { useEffect, useState } from "react"
import Cookie from "cookie-universal";
import { USERS } from "../../Api/Api";
import Logout from "../Auth/LogOut";
import { Axios } from "../../Api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

export default function Users(){
    const [users,setUsers]=useState([]);
    const cookie=new Cookie();
    const token=cookie.get("token");
    useEffect(()=>{
        const res=Axios.get(`/${USERS}`)
        .then((res)=>setUsers(res.data));
    },[]);
    console.log(users)
    const usersShow=users.map((user,key)=>(
        <tr class="bg-neutral-primary border-b border-default" key={key}>
                            <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                {key+1}
                            </th>
                            <td class="px-6 py-4">
                                {user.name}
                            </td>
                            <td class="px-6 py-4">
                               {user.email}
                            </td>
                            <td class="px-6 py-4 flex items-center gap-2">
                                <Link to={`${user.id}`}>
                                <FontAwesomeIcon icon={faPenToSquare}/>
                                </Link>
                                <FontAwesomeIcon icon={faTrashCan} color="red"/>
                            </td>
                            
                        </tr>
    ));

    return (
        <div className="w-screen p-2">
            <h1>Users Page</h1>
            <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                <table class="w-full text-sm text-left rtl:text-right text-body">
                    <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                        <tr>
                            <th scope="col" class="px-6 py-3 font-medium">
                               ID
                            </th>
                            
                            <th scope="col" class="px-6 py-3 font-medium">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersShow} 
                    </tbody>
                </table>
            </div>

            
        </div>
    )
}