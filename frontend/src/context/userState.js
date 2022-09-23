import { createContext,useState,useEffect } from "react"

export const userContext = createContext();



export const UserState = (props) => {
  
    const [user, setuser] = useState()


    const _setUser=()=>{
        let newUser=JSON.parse(localStorage.getItem("user"));
        setuser(newUser);
    }





    return (
        <userContext.Provider value={{user,_setUser}}>
            {props.children}
        </userContext.Provider>
    )



}