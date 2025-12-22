
import { useEffect, useState } from "react"
import { Axios } from "../../Api/Axios";
import {  CATEGORIES, CATEGORY, PRODUCT } from "../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import { faL } from "@fortawesome/free-solid-svg-icons";

export default function AddProduct(){
    const navigate=useNavigate();
    const [form,setForm]=useState({
        Category:"select Category",title:"",description:"",price:"",discount:"",About:""
    });
    const [images,setImages]=useState([]);
    const [categories,setCategories]=useState([]);
    const [send,setSend]=useState(false);
    //handleChange
    function handleChange(e){
        setForm({...form,[e.target.name]:e.target.value})
    }
     async function handleSubmit(e){
        e.preventDefault();
        setSend(true)
        try{
         const res=  await Axios.post(`${PRODUCT}/add`,form)
         
         navigate("/dashboard/product")
         
        }catch (error){
            console.log(error);
        }
    }
        //get all categories
        useEffect(()=>{
            try {
            const res=Axios.get(`/${CATEGORIES}`)
            .then((res)=>setCategories(res.data))
            } catch (error) {
                console.log(error)
            }},[]);
            const categoriesShow=categories.map((item,key)=>(
                <option key={key} value={item.id}>{item.title}</option>
            ))
    return(
        <div>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="max-w-sm mx-auto">
                     <label htmlFor="Category" class="block mb-2.5 text-sm font-medium text-heading">Select Category</label>
                        <select id="Category" name="Category" class="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"  onChange={handleChange} value={form.Category}>
                                <option disabled >select Category</option>
                                {categoriesShow}
                                
                        </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2.5 text-sm font-medium text-heading">Title:</label>
                    <input type="text" id="title" name="title" disabled={!send} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"  required  value={form.title}  onChange={ handleChange} placeholder="Title..."/>
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2.5 text-sm font-medium text-heading">Description:</label>
                    <input type="text" id="description" name="description"disabled={!send} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"  required  value={form.description}  onChange={handleChange} placeholder="Description..."/>
                </div>
                <div className="mb-5">
                    <label htmlFor="price" className="block mb-2.5 text-sm font-medium text-heading">Price:</label>
                    <input type="text" id="price"name="price"disabled={!send} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"  required  value={form.price}  onChange={handleChange} placeholder="Price..."/>
                </div>
                <div className="mb-5">
                    <label htmlFor="discount"className="block mb-2.5 text-sm font-medium text-heading">Discount:</label>
                    <input type="number" id="discount"name="discount" disabled={!send} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"  required  value={form.discount}  onChange={handleChange } placeholder="Discount..."/>
                </div>
                <div className="mb-5">
                    <label htmlFor="About" className="block mb-2.5 text-sm font-medium text-heading">About:</label>
                    <input type="text" id="About" name="About"disabled={!send} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"  required  value={form.About}  onChange={handleChange } placeholder="About..."/>
                </div>
                <div class="flex items-center justify-center w-full">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium">
                        <div class="flex flex-col items-center justify-center text-body pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"/></svg>
                            <p class="mb-2 text-sm"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file"disabled={!send}  onChange={(e)=>setImages(e.target.files)} />
                    </label>
                </div> 
                
              

                <button disabled={form.title.length>1?false:true}  type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">Save</button>
             </form>


        </div>
    )
}