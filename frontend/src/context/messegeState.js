import { createContext,useState,useEffect,useContext } from "react"

import { chatContext } from "../context/chatsState"
export const messegeContext = createContext();


export const MessegeState = (props) => {
  
    const [messages, setmessages] = useState([]);
    const { chats, updateChats,socket,selectedChat } = useContext(chatContext);


const _setmessages=(msgArr)=>{
setmessages(msgArr);
}




    useEffect(() => {
      
if(socket)
       { socket.on("message received", (msg) => {
            // console.log(msg)
            if (selectedChat !== msg.chat._id) {
                // handle notifications
                let index = chats.findIndex((e) => {
                    return e._id === msg.chat._id
                })
             
                if (index !== -1) {
                    // console.log(msg);
                    const newState = chats.map(element => {
                        if (element._id === msg.chat._id) {
                            const counter = element.unReadmessages + 1;
                            return { ...element, unReadmessages: counter,latestMessage:{messege:msg.messege,createdAt:msg.createdAt} }

                        }

                        return element
                    });
                    updateChats(newState);


                }
                else {
                    // console.log(msg);
                    let newchat = {
                        _id: msg.chat._id,
                        latestMessage:{messege:msg.messege,createdAt:msg.createdAt},
                        users: [...msg.chat.users],// make deep 
                        chatName: msg.chat.chatName,
                        isGroupChat: msg.chat.isGroupChat,
                        groupAdmin: msg.chat.groupAdmin ? msg.chat.groupAdmin : "Default",
                        unReadmessages: 1,
                       
                    }
                    // console.log(newchat)
                    updateChats([...chats, newchat]);
                }

            }
            else {

                _setmessages([...messages, msg])
                const newState = chats.map(element => {
                    if (element._id === msg.chat._id) {
                        const counter = element.unReadmessages + 1;
                        return { ...element, latestMessage:{messege:msg.messege,createdAt:msg.createdAt} }

                    }

                    return element
                });
                // console.log(newState);
                updateChats(newState);
            }

        })
}

       

        return () => {
            if(socket)
            socket.off("message received");
        }
            
    },)







    return (
        <messegeContext.Provider value={{messages,_setmessages}}>
            {props.children}
        </messegeContext.Provider>
    )



}