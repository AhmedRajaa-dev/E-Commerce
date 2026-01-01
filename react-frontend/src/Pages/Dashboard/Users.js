import { useEffect, useState } from "react"
import Cookie from "cookie-universal";
import { USER, USERS } from "../../Api/Api";
import Logout from "../Auth/LogOut";
import { Axios } from "../../Api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { data, Link } from "react-router-dom";
import Laouding from "../../Css/Laouding";
import TableShow from "../../Components/Dashboard/Table";
//states
export default function Users(){
    const [users,setUsers]=useState([]);
    const [currentUser,setCurrentUser]=useState([]);
    const [deleteUser,setDeleteUser]=useState(false);
    const cookie=new Cookie();
    const token=cookie.get("token");
    const [limit,setLimit]=useState(8);
    const[page,setPage]=useState(1)

    const getUsers =async ()=>{
    
     try {
         const res=await Axios.get(`/${USERS}?page=${page}&limit=${limit}`)
         setUsers(res.data.data);
     } catch (error) {
        console.log(error)
     }
       
    }
    //get all users
    useEffect(()=>{
    
         getUsers()
    },[limit,page]);
    //get current user
    useEffect(()=>{
        Axios.get(`${USER}`).then((res)=>setCurrentUser(res.data))
    },[])
    console.log(users)
     async function handleDelete(id){
       
        try{
            const res= await Axios.delete(`${USER}/${id}`)
            getUsers()

        }catch (error){
            console.log(error);
        }
        
    }
    
    const header=[{key:"name",name:"UserName"},{key:"email",name:"Email"},{key:"role",name:"Role"}];
    
   

    return (
        
        <div className="w-screen p-2">
            <div className="flex items-center justify-between">
                <h1>Users Page</h1>
                <Link to="/dashboard/user/add">
                <button type="button" class="text-blue-800 bg-white box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Add Users</button>
                </Link>
            </div>
            
            <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
               /*table*/
               <TableShow header={header} data={users} handleDelete={handleDelete} currentUser={currentUser} page={page} limit={limit} setPage={setPage} />
            </div>
            

            
        </div>
    )
}