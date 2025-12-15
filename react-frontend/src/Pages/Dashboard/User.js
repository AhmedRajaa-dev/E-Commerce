import { useEffect, useState } from "react"
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";

export default function User(){
    const navigate=useNavigate()
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [disable,setDisable]=useState(false);
    const { id } = useParams();
    useEffect(()=>{
        Axios.get(`${USER}/${id}`).then((res)=>{
            setName(res.data.name)
            setEmail(res.data.email)
        }).then(()=>setDisable(false))
        
    },[]);
     async function handleSubmit(e){
        e.preventDefault();
        try{
         const res=  await Axios.post(`${USER}/edit/${id}`,{name:name,email:email})
         
         navigate("/dashboard/users")
         
        }catch (error){
            console.log(error);
        }
    }
    return(
        <div>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-heading">Your Name:</label>
                    <input type="text" id="name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"  required  value={name}  onChange={(e) => setName(e.target.value)}/>
                </div>
                <div class="mb-5">
                    <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Your email:</label>
                    <input type="email" id="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"  required value={email}  onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <button  type="submit" disabled={disable} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">Save</button>
             </form>


        </div>
    )
}