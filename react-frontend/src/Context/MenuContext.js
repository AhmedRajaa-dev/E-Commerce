import {createContext, useState ,useContext} from "react";

export const Menu=createContext("");
export default function MenuContext({children}){
const [isOpenMenu,isSetOpenMenu]=useState(false);
return <Menu.Provider value={{isOpenMenu,isSetOpenMenu}}>{children}</Menu.Provider>
}