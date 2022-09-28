import React, { useEffect, useState, useContext, useRef } from 'react'
import { Box,  Flex, Text, Divider, Button,  Avatar, AvatarBadge, Input, AvatarGroup,IconButton,  useToast, Center, HStack } from '@chakra-ui/react'
import {  AttachmentIcon } from '@chakra-ui/icons'
import axios from "axios"
import { chatContext } from "../context/chatsState"
import { messegeContext } from "../context/messegeState"
import GroupInfomodal from './GroupInfomodal'

// var socket = 0;
function ChatBox({ selectedChat }) {
 
    // console.log("chat box render");
    
    const toast = useToast();

    const { user, chats, updateChats,socket,roomjoined,onlineUsers } = useContext(chatContext);
    const { messages,_setmessages } = useContext(messegeContext);
    const [chatInfo, setchatInfo] = useState()
    
    const [onlineStatus, setonlineStatus] = useState("Offline")
const [typing, settyping] = useState(false)

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    const handlechange=(e)=>{
             
               if(e.target.value.length>0)
               { 
                if(typing)
               { settyping(true);
                socket.emit("typing",{typing,selectedChat})
            }
            
            }
               else
               {
                settyping(false);
                socket.emit("typing",{typing,selectedChat})
            
            }
    }

    
useEffect(() => {
  if(socket){

    socket.on("typing",({typing,selectedChat})=>{
        settyping(typing);
    });
   

  }

  return () => {
    if(socket)
  socket.off("typing");
  }
}, [socket])


    


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
                        _setmessages(res.data.payload);
                       
                    }
                })
        }
        fetchMessages();




// eslint-disable-next-line
    }, [selectedChat]);

useEffect(() => {
 
if(chatInfo){
    if(chatInfo.unReadmessages!==0){
        console.log("runs")
        const newState = chats.map(element => {
            if (element._id === chatInfo._id) {
                const counter = 0;
                return { ...element, unReadmessages:counter }

            }

            return element
        });
        // console.log(newState);
        updateChats(newState);
    }
}

}, [chatInfo])





    useEffect(() => {
   
        const showStatus=()=>{
            if(chatInfo)
        {  if(!chatInfo.isGroupChat)
           { const foundOnline=onlineUsers.includes(chatInfo.users[0]._id);
            if(foundOnline) setonlineStatus("Online")
            else setonlineStatus("Offline")
          }}
        }
    
        showStatus()
    
    
      }, [onlineUsers,chatInfo])


    const handlesend = () => {
        const msg = document.getElementById("msgInput").value;
        document.getElementById("msgInput").value = "";
        axios.post(`http://localhost:5000/api/sendmsg`, { chat_id: selectedChat, msg }, { headers: { token: JSON.parse(localStorage.getItem("token")) } })
            .then(res => {
                console.log(res.data.payload)
                if (res.data.success) {
                    const msg=res.data.payload;
                    _setmessages([...messages, res.data.payload]);
                    const newState = chats.map(element => {
                        if (element._id === msg.chat._id) {
                            const counter = element.unReadmessages + 1;
                            return { ...element, latestMessage:{messege:msg.messege,createdAt:msg.createdAt} }

                        }

                        return element
                    });
                    // console.log(newState);
                    updateChats(newState);
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
   function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }
 const gettime=(time)=>{
    let t=tConvert(new Date(time).toLocaleTimeString())
    let [h,m,s]=t.split(":")
let [se,p]=s.split(" ")
let ti=h+":"+m+" "+p;
return ti;
 }
 
    return (
        <>
           

            {/* message box start below */}
            <Box h="100%"  w={"67%"} px="12px" pt={"5px"}  border={"1px"} borderColor={"#ededed"}
 boxShadow="2xl" borderRadius={"8px"}
            >


                <Flex w="100%" >
                    
                {chatInfo?chatInfo.isGroupChat? 
                <HStack cursor={"pointer"} onClick={()=>setshowModal(true)}>
                    <GroupInfomodal users={chatInfo.users} showModal={showModal} setshowModal={setshowModal} chatInfo={chatInfo}/>
                <AvatarGroup size='lg' max={2}>
                    {chatInfo?chatInfo.users.map((e,i)=>{
                        return <Avatar key={i} name={e.name} src={e.profileImage} />
                    }):""}
                 <Avatar name={user.name} src='https://bit.ly/code-beast' />
                
              </AvatarGroup>
              <Text fontSize="xl" fontWeight="bold">{chatInfo?chatInfo.chatName:"" }</Text>
                </HStack>
                :<>
                <Avatar size="lg" name={chatInfo?chatInfo.users[0].name:"Loading" }src={chatInfo.users[0].profileImage}>
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
                            <Text alignSelf={"end"} fontSize={["10px", "12px"]}>{gettime(element.createdAt)}</Text>
                        </Flex>
                    </Flex>
                    : 
                    <Flex w="100%" key={index} >
                     <Avatar
                        name={element.sender.name}
                        size={"sm"}
                        src={element.sender.profileImage}
                        
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
                        <Text alignSelf={"end"} fontSize={["10px", "12px"]}>{gettime(element.createdAt)}</Text>
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
                            onChange={handlechange}
                            flexBasis={"84%"}
                            placeholder="Type Something..."
                            border="1px"
                            borderRadius="8px"
                            _focus={{
                                border: "1px solid blue.400",
                            }}
                            id='msgInput'
                            onKeyDown={(e)=>{if (e.key === 'Enter')handlesend()}}

                        />


                        <IconButton borderRadius={"full"} aria-label='Attachment icon' icon={<AttachmentIcon />} />



                        <Button   onClick={handlesend} colorScheme={"messenger"} borderRadius="8px">Send</Button>
                    </Flex>
                </Box>



            </Box>











        </>
    )
}

export default ChatBox