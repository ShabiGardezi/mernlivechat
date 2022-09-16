import { createContext,useState } from "react"
import axios from "axios"
export const chatContext = createContext();


export const ChatState = (props) => {

    const [chats, setchats] = useState([]);
   const user=JSON.parse(localStorage.getItem("user"));
    const fetchChats=()=>{

        axios.get(`http://localhost:5000/api/getallchats`, { headers: { token: JSON.parse(localStorage.getItem("token")) } })
        .then(res => {
        //     console.log("fetchChats = ");
          console.log(res.data.payload);
          setchats(res.data.payload)

        })
        
    }

    const updateChats=(newchats)=>{
        let updatedchats=[];
        updatedchats=newchats
        setchats(updatedchats);
        // console.log(updatedchats);
    }




    return (
        <chatContext.Provider value={{updateChats,fetchChats,chats,user}}>
            {props.children}
        </chatContext.Provider>
    )


}

