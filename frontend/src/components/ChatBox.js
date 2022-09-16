import React, { useEffect, useState, useContext } from 'react'
import { Box, Input, Button, Center, useToast, Text } from '@chakra-ui/react'
import axios from "axios"
import { chatContext } from "../context/chatsState"
import io from "socket.io-client"

var socket = 0;
function ChatBox({ selectedChat }) {
    // console.log("chat box render");
    const toast = useToast();
    const [messages, setmessages] = useState([])
    const { user, chats,updateChats } = useContext(chatContext);
    // const [socketConnected, setsocketConnected] = useState(false)
    const [roomjoined, setroomjoined] = useState(false);

    useEffect(() => {
        socket = io("http://localhost:5000");

        socket.emit("setup", user._id);
        socket.on("user joined the room", (user_id) => {
            setroomjoined(true);
        })
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
      
        socket.on("message received", (msg) => {
            console.log("inside receive");
            if (selectedChat !== msg.chat._id) {
                // handle notifications
               let index= chats.findIndex((e)=>{
                return e._id === msg.chat._id
               })
               console.log(index);
               if(index!==-1){
                console.log(msg);
                console.log("ind")
                   const newState=   chats.map(element => {
                          if (element._id === msg.chat._id) {
                              const counter=element.unReadmessages+1;
                             return {...element,unReadmessages:counter}
      
                          }
                          
                          return element
                      });
                   updateChats(newState);
               

               }
               else{
                console.log("chat not found. creatting a new chat");
                console.log(msg);
                 let newchat={
                    _id:msg.chat._id,
                    users:[...msg.chat.users],// make deep 
                    chatName: msg.chat.chatName,
                    isGroupChat:msg.chat.isGroupChat,
                    groupAdmin:msg.chat.groupAdmin?msg.chat.groupAdmin:"Default",
                    unReadmessages:1
                 }
                 updateChats([...chats,newchat]);
               }

            }
            else {

                setmessages([...messages, msg])
            }

        })

return ()=>socket.off("message received");
    })


    useEffect(() => {
        const fetchMessages = () => {
            if (!selectedChat) return;

            axios.get(`http://localhost:5000/api/fetchmessages/${selectedChat}`, { headers: { token: JSON.parse(localStorage.getItem("token")) } })
                .then(res => {
                    // console.log(res.data)
                    if (res.data.success) {
                        setmessages(res.data.payload);
                    }
                })
        }
        fetchMessages();


    //     const newState=   chats.map(element => {
    //         if (element._id === msg.chat._id) {
    //             const counter=element.unReadmessages+1;
    //            return {...element,unReadmessages:counter}
    //         }
            
    //         return element
    //     });
    //  updateChats(newState);


    }, [selectedChat]);

    const handlesend = () => {
        const msg = document.getElementById("msgInput").value;
        document.getElementById("msgInput").value = "";
        axios.post(`http://localhost:5000/api/sendmsg`, { chat_id: selectedChat, msg }, { headers: { token: JSON.parse(localStorage.getItem("token")) } })
            .then(res => {
                console.log(res.data.payload)
                if (res.data.success) {
                    setmessages([...messages, res.data.payload]);
                    if (socket.connected && roomjoined) {

                        socket.emit("new message", res.data.payload);

                    }
                    else {

                        toast({
                            title: "SOCKET NOT CONNECTED",
                            description: "Refresh the page",
                            status: 'error',
                            duration: 5000,
                            isClosable: true,
                        });
                    }
                }
            })

    }



    return (
        <Box position={"relative"} height={"400px"} width={"100%"} backgroundColor={"blackAlpha.800"} borderWidth={"2px"}>
            <Box overflowY={"scroll"} height={"350px"} width={"100%"} >

                {messages.length > 0 ? messages.map((element, index) => {
                    return (
                        <Box key={index} width={"250px"} m={"8px"} mt={"16px"} borderRadius={"20px"} pt={"3px"} pb={"3px"} backgroundColor={"green.300"} color={"blackAlpha.900"}
                            ml={user._id === element.sender._id ? "auto" : ""}

                        >

                            <Text> {user._id === element.sender._id ? element.messege : `from ${element.sender.name}: ${element.messege}`} </Text>
                        </Box>
                    );
                })





                    : <Center mt={"20%"} color={"white"}>"No messages of this chat"</Center>}
            </Box>


            <Box backgroundColor={"blackAlpha.800"} p={"5px"} display={"flex"} bottom={0} width={"100%"} position={"absolute"}>
                <Input borderRadius={"20px"} mr={"20px"} backgroundColor={"white"} id='msgInput' type={"text"}></Input>
                <Button backgroundColor={"blue.500"} color={"white"} width={"80px"} borderRadius={"20px"} id='send_btn' onClick={handlesend}>Send</Button>
            </Box>

        </Box>

    )
}

export default ChatBox