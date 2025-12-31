import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import Laouding from "../../Css/Laouding"
import PaginatedItems from "./Pagination/Pagination";

export default function TableShow(props){
    const currentUser=props.currentUser || {name:""};
    const start=Number(props.limit*(props.page -1 ))  ;
    const end =start+Number(props.limit);
    const final =props.data.slice(start,end);
    console.log(final);
    //handle delete
   
    //header show
    const headerShow=props.header.map((el)=><th scope="col" class="px-6 py-3 font-medium">{el.name}</th>)
    //body show
    const dataShow=final.map((el,key)=>
        <tr key={key}>    
        <td className="px-6 py-4">{el.id}</td>
        {props.header.map((item,key2)=>(
            <td key={key2} class="px-6 py-4">{item.key==="image"?<img className="w-14 h-14" src={el[item.key]} alt=""/>:item.key=="images"?
            el[item.key].map((img)=><img width="50px" src={img.image} alt=""/>)
            :el[item.key]==="1995"?"Admin":el[item.key]==="2001"?"User":el[item.key]==="1996"?"Writer":el[item.key]==="1999"?"Product Manger":el[item.key]}{currentUser&&el[item.key]===currentUser.name&&" (You)"}</td>
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
    return (
        <>
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