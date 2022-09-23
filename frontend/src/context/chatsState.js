import { createContext,useState,useEffect,useContext } from "react"
import axios from "axios"
import io from "socket.io-client"
import { userContext } from "../context/userState"
export const chatContext = createContext();

export const ChatState = (props) => {
// console.log("charstate");
    const [chats, setchats] = useState([]);
    const [socket, setsocket] = useState(0);
    const [roomjoined, setroomjoined] = useState(false);
    const [onlineUsers, setonlineUsers] = useState([])
    const { user } = useContext(userContext);
//    const user=JSON.parse(localStorage.getItem("user"));


   useEffect(() => {

    let socket = io("http://localhost:5000");
    setsocket(socket);

    socket.emit("setup", user._id);
   
    return ()=>socket.disconnect();
    // eslint-disable-next-line
}, [])


useEffect(()=>{
    // console.log(onlineUsers);
if(socket)
   { 
    socket.on("user joined the room", ({user_id,onlineUsers}) => {
        setroomjoined(true);
        setonlineUsers(onlineUsers);
        
    })

    socket.on("i am online",(user_id)=>{
        console.log("i am online")

        setonlineUsers((pre)=>{
            return [...pre,user_id]
        });
    })

    socket.on("user has left",(user_id)=>{
        // console.log("user has left: ",user_id)
        let newarr=onlineUsers.filter((id)=>{ return id!== user_id })
        setonlineUsers(newarr)

    })
    // socket.on("disconnect", (reason) => {
    //     console.log(reason);
    //     // socket.disconnect();
    //   });
}

    return ()=>{
        if(socket)
       { socket.off("user joined the room");
        socket.off("i am online");
        socket.off("user has left");}
        };

})




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
        <chatContext.Provider value={{updateChats,fetchChats,chats,user,socket,roomjoined,onlineUsers}}>
            {props.children}
        </chatContext.Provider>
    )


}

