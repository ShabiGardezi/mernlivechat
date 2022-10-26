import { createContext,useState,useEffect,useContext } from "react"
import axios from "axios"
import io from "socket.io-client"
import { userContext } from "../context/userState"
import { useToast } from '@chakra-ui/react'
export const chatContext = createContext();

export const ChatState = (props) => {
// console.log("charstate");
    const [chats, setchats] = useState([]);
    const [selectedChat, setselectedChat] = useState()
    const [socket, setsocket] = useState(0);
    const [roomjoined, setroomjoined] = useState(false);
    const [onlineUsers, setonlineUsers] = useState([])
    const { user,loadingscreen, setloadingscreen } = useContext(userContext);
    const [progress, setprogress] = useState(0)
    const toast = useToast();
   


const _setselectedChat = (chat_id) => {

    setselectedChat(chat_id);
}



   useEffect(() => {

    let socket = io("https://chatting-app-real-time.herokuapp.com/");
    setsocket(socket);

    socket.emit("setup", user._id);
   
    return ()=>socket.disconnect();
    // eslint-disable-next-line
}, [])


useEffect(()=>{
    // console.log(onlineUsers);
    // console.log(chats)
if(socket)
   { 

    socket.on("connect", () => {
        // console.log("connected") reconnected feature has to be implemnented in future
      });

    socket.on("user joined the room", ({user_id,onlineUsers}) => {
        setroomjoined(true);
        setonlineUsers(onlineUsers);
        
    })

    socket.on("i am online",(user_id)=>{
      

        setonlineUsers((pre)=>{
            return [...pre,user_id]
        });
    })

    socket.on("user has left",(user_id)=>{
        // console.log("user has left: ",user_id)
        let newarr=onlineUsers.filter((id)=>{ return id!== user_id })
        setonlineUsers(newarr)

    })
    socket.on("disconnect", (reason) => {
        console.log(reason);
        // setonlineUsers([]);
        // socket.disconnect();
      });
}

    return ()=>{
        if(socket)
       { socket.off("user joined the room");
        socket.off("i am online");
        socket.off("user has left");
    socket.off("connect");
}
        };

})


useEffect(() => {
  fetchChats();


}, [])

useEffect(() => {
    let timer
    if(progress===100)
   { timer = setTimeout(() => {
        setloadingscreen(false);
      }, 1000);}


      return () => clearTimeout(timer);
  
  }, [progress])




    const fetchChats=()=>{

        axios.get(`/api/getallchats`, { headers: { token: JSON.parse(localStorage.getItem("token")) }
    ,
    onDownloadProgress: function (e) {
      console.log(Math.trunc((e.loaded / e.total)*100))
        setprogress(Math.trunc((e.loaded / e.total)*100))
    } })
        .then(res => {
        if(res.data.success)
         { 
            setchats(res.data.payload)
            // setloadingscreen(false);
        //     setTimeout(() => {
        //         setloadingscreen(false);
                
        // }, 1000);
        }
        

        }).catch(function(error){
            toast({
                title:error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        })
        
    }

    const updateChats=(newchats)=>{
        let updatedchats=[];
        updatedchats=newchats
        setchats(updatedchats);
        // console.log(updatedchats);
    }




    return (
        <chatContext.Provider value={{updateChats,fetchChats,chats,user,socket,roomjoined,onlineUsers,selectedChat,_setselectedChat,progress}}>
            {props.children}
        </chatContext.Provider>
    )


}

