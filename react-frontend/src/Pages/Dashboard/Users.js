import { useEffect, useState } from "react"
import Cookie from "cookie-universal";
import { USER, USERS } from "../../Api/Api";
import Logout from "../Auth/LogOut";
import { Axios } from "../../Api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import Laouding from "../../Css/Laouding";
//states
export default function Users(){
    const [users,setUsers]=useState([]);
    const [currentUser,setCurrentUser]=useState([]);
    const [deleteUser,setDeleteUser]=useState(false);
    const [noUsers,setNoUsers]=useState(true);
    const cookie=new Cookie();
    const token=cookie.get("token");
    //get all users
    useEffect(()=>{
        const res=Axios.get(`/${USERS}`)
        .then((res)=>setUsers(res.data))
        .then(()=>setNoUsers(true))
    },[deleteUser]);
    //get current user
    useEffect(()=>{
        Axios.get(`${USER}`).then((res)=>setCurrentUser(res.data))
    },[])
    console.log(users)
    async function handleDeleteUser(id){
        try{
            const res= await Axios.delete(`${USER}/${id}`)
            setDeleteUser((prev)=>!prev)
        }catch (error){
            console.log(error);
        }

    };
    //filter current user
    const userFilter=users.filter((user)=>user.id !==currentUser.id)
    //mapping current users
    const usersShow=userFilter.map((user,key)=>(
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
                            <td class="px-6 py-4">
                               {user.role==="1995"?"Admin":user.role==="2001"?"User":"Writer"}
                            </td>
                            <td class="px-6 py-4 flex items-center gap-2">
                                <Link to={`${user.id}`}>
                                <FontAwesomeIcon  icon={faPenToSquare}/>
                                </Link>
                                <FontAwesomeIcon className="cursor-pointer" icon={faTrashCan}  color="red" onClick={()=>handleDeleteUser(user.id)}/>
                            </td>
                            
                        </tr>
    ));

    return (
        
        <div className="w-screen p-2">
            <div className="flex items-center justify-between">
                <h1>Users Page</h1>
                <Link to="dashboard/user/add">
                <button type="button" class="text-blue-800 bg-white box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Add Users</button>
                </Link>
            </div>
            
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
                                Role
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length===0?<tr><td colSpan={12}><div className="flex items-center justify-center"><Laouding/></div></td></tr>
                        :users.length <=1&&noUsers?<tr><td colSpan={12}><div className="flex items-center justify-center"><h1>No Users Found</h1></div></td></tr>:usersShow  
                    } 
                    </tbody>
                </table>
            </div>
            

            
        </div>
    )
}