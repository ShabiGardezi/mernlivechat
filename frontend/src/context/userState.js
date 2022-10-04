import { createContext,useState,useEffect } from "react"
import { Progress } from "@chakra-ui/react";
export const userContext = createContext();



export const UserState = (props) => {
  
    const [user, setuser] = useState()
    const [loadingscreen, setloadingscreen] = useState(true)

    const _setUser=()=>{
        let newUser=JSON.parse(localStorage.getItem("user"));
        setuser(newUser);
    }

useEffect(() => {
 setloadingscreen(true);
},[user])




    return (
        <userContext.Provider value={{user,_setUser,loadingscreen, setloadingscreen}}>
            {props.children}
        </userContext.Provider>
    )



}