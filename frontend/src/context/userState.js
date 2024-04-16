<<<<<<< HEAD
 import { createContext,useState,useEffect } from "react"
=======
import { createContext,useState,useEffect } from "react"
>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145
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