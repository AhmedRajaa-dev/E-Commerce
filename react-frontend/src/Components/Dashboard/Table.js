import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import Laouding from "../../Css/Laouding"
import PaginatedItems from "./Pagination/Pagination";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { CATEGORIES } from "../../Api/Api";
import TransformDate from "../../Helpers/TransformDate";

export default function TableShow(props){
    const [search,setSearch]=useState("")
    const [filtredData,setFiltredData]=useState([])
    const [date,setDate]=useState("")
    const filteredDataByDate=date.length!=0 ?props.data.filter((item)=>TransformDate(item.created_at)===date)
    :props.data
    console.log(filteredDataByDate);
   
    const filterSearchByDate=data.length>0?filtredData.filter((item)=>
   TransformDate(item.created_at)===date ):filtredData
     const showWithDate=search.length>0?filterSearchByDate:filteredDataByDate
    
 async function getSearchHandleData() {
        
        try {
            const res= await Axios.post(`${props.searchLink}/search?title=${search}`)
            setFiltredData(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        const debounce=setTimeout(()=>{ 
            getSearchHandleData()
        },800)
        return ()=>clearTimeout(debounce)
    },[search])
    
    
    const currentUser=props.currentUser || {name:""};
    console.log(TransformDate("2026-01-13T14:52:05.000000"));
    
    
    //handle delete
   
    //header show
    const headerShow=props.header.map((el)=><th scope="col" class="px-6 py-3 font-medium">{el.name}</th>)
    //body show
    const dataShow=props.data.map((el,key)=>
        <tr key={key}>    
        <td className="px-6 py-4">{el.id}</td>
        {props.header.map((item,key2)=>(
            <td key={key2} class="px-6 py-4">{item.key==="image"?<img className="w-14 h-14" src={el[item.key]} alt=""/>:item.key=="images"?
            el[item.key].map((img)=><img width="50px" src={img.image} alt=""/>)
            :item.key==="created_at"||item.key==="updated_at"?TransformDate(el[item.key]): el[item.key]==="1995"?"Admin":el[item.key]==="2001"?"User":el[item.key]==="1996"?"Writer":el[item.key]==="1999"?"Product Manger":el[item.key]}{currentUser&&el[item.key]===currentUser.name&&" (You)"}</td>
        ))}
         <td class="px-6 py-4 flex items-center gap-2">
                <Link to={`${el.id}`}>
                <FontAwesomeIcon  icon={faPenToSquare}/>
                </Link>
                {currentUser.name!==el.name&&
                <FontAwesomeIcon className="cursor-pointer" icon={faTrashCan}  color="red" onClick={()=>props.handleDelete(el.id) }
                />}
                
                                      
                            </td>
        </tr>
    
    )
    //handleSearch
 
    return (
        <>
            <form class="max-w-2xl mx-auto">
                <div class="flex shadow-xs rounded-base -space-x-0.5">
                    <label for="search-dropdown" class="block mb-2.5 text-sm font-medium text-heading sr-only ">Your Email</label>
                    <button id="dropdown-button" data-dropdown-toggle="dropdown" type="button" class="inline-flex items-center shrink-0 z-10 text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-s-base text-sm px-4 py-2.5 focus:outline-none">
                        <svg class="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"/></svg>
                        All categories
                        <svg class="w-4 h-4 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg>
                    </button>
                    <div id="dropdown" class="z-10 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44">
                        <ul class="p-2 text-sm text-body font-medium" aria-labelledby="dropdown-button">
                            <li>
                                <a href="#" class="block p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded-md">Shopping</a>
                            </li>
                            <li>
                                <a href="#" class="block p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded-md">Images</a>
                            </li>
                            <li>
                                <a href="#" class="block p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded-md">News</a>
                            </li>
                            <li>
                                <a href="#" class="block p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded-md">Finance</a>
                            </li>
                        </ul>
                    </div>
                    <input type="search" id="search-dropdown" id="input-group-1" class="px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm focus:ring-brand focus:border-brand block w-full placeholder:text-body" placeholder="Search for products" required onChange={(e)=>setSearch(e.target.value)}/>
                    <button type="button" class="inline-flex items-center  text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-e-base text-sm px-4 py-2.5 focus:outline-none">
                    <svg class="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
                    Search
                    </button>
                     <input type="date" id="search-dropdown" id="input-group-1" class="px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm focus:ring-brand focus:border-brand block w-full placeholder:text-body" placeholder="Search for products" required onChange={(e)=>setDate(e.target.value)}/>
                    <button type="button" class="inline-flex items-center  text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-e-base text-sm px-4 py-2.5 focus:outline-none">
                    <svg class="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
                    Search
                    </button>
                </div>
            </form>

         <table class="w-full text-sm text-left rtl:text-right text-body">
                    <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                      
                        
                            
                        <tr>
                            <th scope="col" class="px-6 py-3 font-medium">
                                id
                            </th>
                            {headerShow}
                            <th scope="col" class="px-6 py-3 font-medium">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.length ===0&&<td class="px-6 py-4 text-center" colSpan={12}><Laouding/></td>}
                       {dataShow}
                    </tbody>
                </table>
                <div className="flex items-center justify-end flex-wrap">
                    <div className="col-span-1">
                        
                        <form className="max-w-sm mx-auto">
                        <label htmlFor="countries_disabled" className="block mb-2.5 text-sm font-medium text-heading">Select an option</label>
                        <select  id="countries_disabled" className="block w-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs text-fg-disabled" onChange={(e)=>props.setLimit(e.target.value)}>
                            <option selected>Choose a country</option>
                            <option value="8">8</option>
                            <option value="16">16</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                        </select>
                        </form>

                    </div>
                </div>
                <PaginatedItems setPage={props.setPage} itemsPerPage={props.limit} data={props.data} page={props.page} setLimit={props.setLimit}/>
    </>
    )
    
}