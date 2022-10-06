import { createContext,useState,useEffect } from "react"
import { Progress } from "@chakra-ui/react";
export const userContext = createContext();



export const UserState = (props) => {
  
    const [user, setuser] = useState()
    const [loadingscreen, setloadingscreen] = useState(true)

   

useEffect(() => {
 setloadingscreen(true);

},[user])




    return (
        <userContext.Provider value={{user,loadingscreen, setloadingscreen,setuser}}>
            {props.children}
        </userContext.Provider>
    )



}