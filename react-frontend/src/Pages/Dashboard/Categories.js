import { useEffect, useState } from "react";
import { CATEGORIES, CATEGORY } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { Link } from "react-router-dom";
import Laouding from "../../Css/Laouding";

import TableShow from "../../Components/Dashboard/Table";

export default function Category(){
    
    const [categories,setCategories]=useState([]);
    //get all categories
    useEffect(()=>{
        try {
        const res=Axios.get(`/${CATEGORIES}`)
        .then((res)=>setCategories(res.data))
        } catch (error) {
            console.log(error)
            
        }
  
    },[]);
    
    const header=[{key:"title",name:"Title"},{key:"image",name:"Image"}];
    async function handleDelete(id){
           
            try{
                const res= await Axios.delete(`${CATEGORY}/${id}`)
                setCategories((prev)=>prev.filter((item)=>item.id !==id));
              //  getUsers()
    
            }catch (error){
                console.log(error);
            }
            
        }
 
    return (
        
        <div className="w-screen p-2">
            <div className="flex items-center justify-between">
                <h1>Categories Page</h1>
                <Link to="/dashboard/categories/add">
                <button type="button" class="text-blue-800 bg-white box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Add Category</button>
                </Link>
            </div>
            
            <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
              <TableShow header={header} data={categories} handleDelete={handleDelete}/>
            </div>
            

            
        </div>
    )
    
}