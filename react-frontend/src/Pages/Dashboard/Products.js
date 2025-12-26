
import { useEffect, useState } from "react";
import {  PRODUCT, PRODUCTS } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { Link } from "react-router-dom";
import Laouding from "../../Css/Laouding";

import TableShow from "../../Components/Dashboard/Table";

export default function Products(){
    
    const [products,setProducts]=useState([]);
    //get all categories
    useEffect(()=>{
        try {
        const res=Axios.get(`/${PRODUCTS}`)
        .then((res)=>setProducts(res.data))
        } catch (error) {
            console.log(error)
            
        }
  
    },[]);
    
    const header=[{key:"images",name:"images"},{key:"title",name:"Title"},{key:"image",name:"Image"},{key:"description",name:"description"},{key:"price",name:"price"},{key:"rating",name:"rating"}];
    async function handleDelete(id){
           
            try{
                const res= await Axios.delete(`${PRODUCT}/${id}`)
                setProducts((prev)=>prev.filter((item)=>item.id !==id));
              //  getUsers()
    
            }catch (error){
                console.log(error);
            }
            
        }
 
    return (
        
        <div className="w-screen p-2">
            <div className="flex items-center justify-between">
                <h1>Products Page</h1>
                <Link to="/dashboard/products/add">
                <button type="button" class="text-blue-800 bg-white box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Add Product</button>
                </Link>
            </div>
            
            <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
              <TableShow header={header} data={products} handleDelete={handleDelete}/>
            </div>
            

            
        </div>
    )
    
}