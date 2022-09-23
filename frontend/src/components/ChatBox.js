import React, { useEffect, useState, useContext, useRef } from 'react'
import { Box,  Flex, Text, Divider, Button,  Avatar, AvatarBadge, Input, AvatarGroup,IconButton,  useToast, Center, HStack } from '@chakra-ui/react'
import {  AttachmentIcon } from '@chakra-ui/icons'
import axios from "axios"
import { chatContext } from "../context/chatsState"
import GroupInfomodal from './GroupInfomodal'

// var socket = 0;
function ChatBox({ selectedChat }) {
 
    // console.log("chat box render");
    
    const toast = useToast();
    const [messages, setmessages] = useState([])
    const { user, chats, updateChats,socket,roomjoined,onlineUsers } = useContext(chatContext);
   
    const [chatInfo, setchatInfo] = useState()
    
    const [onlineStatus, setonlineStatus] = useState("Offline")


    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    


    useEffect(() => {

       

        socket.on("message received", (msg) => {
            
            if (selectedChat !== msg.chat._id) {
                // handle notifications
                let index = chats.findIndex((e) => {
                    return e._id === msg.chat._id
                })
                console.log(index);
                if (index !== -1) {
                    console.log(msg);
                    console.log("ind")
                    const newState = chats.map(element => {
                        if (element._id === msg.chat._id) {
                            const counter = element.unReadmessages + 1;
                            return { ...element, unReadmessages: counter }

                        }

                        return element
                    });
                    updateChats(newState);


                }
                else {
                    console.log("chat not found. creatting a new chat");
                    console.log(msg);
                    let newchat = {
                        _id: msg.chat._id,
                        users: [...msg.chat.users],// make deep 
                        chatName: msg.chat.chatName,
                        isGroupChat: msg.chat.isGroupChat,
                        groupAdmin: msg.chat.groupAdmin ? msg.chat.groupAdmin : "Default",
                        unReadmessages: 1
                    }
                    updateChats([...chats, newchat]);
                }

            }
            else {

                setmessages([...messages, msg])
            }

        })


       

        return () => socket.off("message received");
    })


    useEffect(() => {
        const getChatinfo=()=>{
           
            const chat=chats.find((e)=>{
              return e._id===selectedChat;
            })
            setchatInfo(chat)
          
      }
      getChatinfo();
        const fetchMessages = () => {
            if (!selectedChat) return;

            axios.get(`http://localhost:5000/api/fetchmessages/${selectedChat}`, { headers: { token: JSON.parse(localStorage.getItem("token")) } })
                .then(res => {
                    if (res.data.success) {
                        setmessages(res.data.payload);
                       
                    }
                })
        }
        fetchMessages();

// eslint-disable-next-line
    }, [selectedChat]);



    useEffect(() => {
   
        const showStatus=()=>{
            if(chatInfo)
        {  if(!chatInfo.isGroupChat)
           { const foundOnline=onlineUsers.includes(chatInfo.users[0]._id);
            if(foundOnline) setonlineStatus("Online")
            else setonlineStatus("Offline")
          }}
        }
    
        showStatus();
    
    
      }, [onlineUsers,chatInfo])


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
 
   const [showModal, setshowModal] = useState(false)


    return (
        <>
           

            {/* message box start below */}
            <Box h="100%" w={"70%"} px="12px" pt={"5px"}>


                <Flex w="100%">
                    
                {chatInfo?chatInfo.isGroupChat? 
                <HStack cursor={"pointer"} onClick={()=>setshowModal(true)}>
                    <GroupInfomodal users={chatInfo.users} showModal={showModal} setshowModal={setshowModal} chatInfo={chatInfo}/>
                <AvatarGroup size='lg' max={2}>
                    {chatInfo?chatInfo.users.map((e,i)=>{
                        return <Avatar key={i} name={e.name} src='' />
                    }):""}
                 <Avatar name={user.name} src='https://bit.ly/code-beast' />
                
              </AvatarGroup>
              <Text fontSize="xl" fontWeight="bold">{chatInfo?chatInfo.chatName:"" }</Text>
                </HStack>
                :<>
                <Avatar size="lg" name={chatInfo?chatInfo.users[0].name:"Loading" }src="">
                <AvatarBadge boxSize="1.25em" bg={onlineStatus==="Online"?'green.500':'red.500'} />
              </Avatar>
              <Flex flexDirection="column" mx="5" justify="center">
                  <Text fontSize="lg" fontWeight="bold">
                  {chatInfo?chatInfo.users[0].name:"" }
                  </Text>
                  <Text color={onlineStatus==="Online"?'green.500':'red.500'}>{onlineStatus}</Text>
                </Flex>
                </>:""}
                

                   
                </Flex>
                <Divider borderBottomWidth="3px" color="black" mt="5" />


                <Flex w="100%" h="80%" overflowY="auto" flexDirection="column" p="3">



                {messages.length > 0 ? messages.map((element, index) => {
                    return (
                        user._id === element.sender._id?<Flex w="100%" key={index}justify="flex-end">
                        <Flex
                        
                            flexDirection={"column"}
                            bg="#0078FF"
                            color="white"
                            minW="100px"
                            maxW="350px"
                            borderRadius={"8px"}
                            my="1"
                            // p="3"
                            px={"3"}
                           pt="1"
                        >
                            <Text>{element.messege}</Text>
                            <Text alignSelf={"end"} fontSize={["10px", "12px"]}>6:30 PM</Text>
                        </Flex>
                    </Flex>
                    : 
                    <Flex w="100%" key={index} >
                     <Avatar
                        name={element.sender.name}
                        size={"sm"}
                        src=""
                        
                      > </Avatar>
                      <Flex
                      ml={"5px"}
                        flexDirection={"column"}
                        bg="gray.100"
                        color="black"
                        borderRadius={"8px"}
                        minW="100px"
                        maxW="350px"
                        px={"3"}
                        pt={chatInfo?chatInfo.isGroupChat?"":"1":"" }
                        my="1"

                       >
                        {chatInfo?chatInfo.isGroupChat?<Text alignSelf={"end"} fontSize={["10px", "12px"]}>{element.sender.name}</Text>:"":""}
                        <Text>{element.messege}

                        </Text>
                        <Text alignSelf={"end"} fontSize={["10px", "12px"]}>6:30 PM</Text>
                    </Flex>


                </Flex>
                    );
                })

                    : <Center mt={"20%"} >No messages of this chat</Center>}



                    <AlwaysScrollToBottom />




                </Flex>

                {/* <Divider borderBottomWidth="3px" color="black" mt="5" /> */}
                <Box h="53px" p={"6px"}>
                    <Flex w="100%" justifyContent={"space-between"} px="10px" >
                        <Input
                            flexBasis={"84%"}
                            placeholder="Type Something..."
                            border="1px"
                            borderRadius="8px"
                            _focus={{
                                border: "1px solid blue.400",
                            }}
                            id='msgInput'


                        />


                        <IconButton borderRadius={"full"} aria-label='Attachment icon' icon={<AttachmentIcon />} />



                        <Button  onClick={handlesend} colorScheme={"messenger"} borderRadius="8px">Send</Button>
                    </Flex>
                </Box>



            </Box>











        </>
    )
}

export default ChatBox