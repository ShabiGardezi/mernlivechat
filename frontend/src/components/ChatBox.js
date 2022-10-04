import React, { useEffect, useState, useContext, useRef } from 'react'
import { Box, Flex, Text, Divider, Button, Avatar, AvatarBadge, Input, AvatarGroup, IconButton, useToast, Center, HStack ,Image} from '@chakra-ui/react'
import { AttachmentIcon } from '@chakra-ui/icons'
import axios from "axios"
import { chatContext } from "../context/chatsState"
import { messegeContext } from "../context/messegeState"
import GroupInfomodal from './GroupInfomodal'
import typeloader from "./Vanilla-1s-183px.png"

// var socket = 0;
function ChatBox() {

    // console.log("chat box render");

    const toast = useToast();

    const { user, chats, updateChats, socket, roomjoined, onlineUsers,selectedChat } = useContext(chatContext);
    const { messages, _setmessages,typing,settyping,typingchats, settypingchats } = useContext(messegeContext);
    const [chatInfo, setchatInfo] = useState()
    const [text, settext] = useState("")

    const [onlineStatus, setonlineStatus] = useState("Offline")
  
    const [startedTyping, setstartedTyping] = useState(false)

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    const handlechange = (e) => {
        settext(e.target.value);
        if(!chatInfo.isGroupChat)
        if (e.target.value.length > 0) {
          
            if(startedTyping===false)
               { 
            //     console.log("selected chat: "+selectedChat)
            //    console.log("user id: "+chatInfo.users[0]._id)
            
                setstartedTyping(true);
                socket.emit("typing", { typing:true,chat_id: selectedChat ,user_id:chatInfo.users[0]._id})
                // console.log("typing")
            }
            

        }
        else {
            setstartedTyping(false);
            socket.emit("typing", { typing:false,chat_id: selectedChat,user_id:chatInfo.users[0]._id})
            // console.log("stoped typing")

        }
    }


    useEffect(() => {
        if (socket) {

            socket.on("starttyping", ({ typing, chat_id }) => {
                // console.log(chat_id)
                // console.log(selectedChat)
                settypingchats((pre)=>{
                    return [...pre,chat_id]
                });

                // if(chat_id===selectedChat)
                // {console.log("start  typing")
                //     settyping(typing);
                // }
            });

            socket.on("stoptyping", ({ typing, chat_id }) => {
                settypingchats((pre)=>{
                    
                    return  pre.filter((id)=>{
                      return id!== chat_id
                    });
                });
                
                // if(chat_id===selectedChat)
                // { console.log("stop typing")
                //     settyping(typing);
                // }
            });


        }

        return () => {
            if (socket)
               { socket.off("starttyping");
                socket.off("stoptyping");}
        }
    }, [socket])

useEffect(() => {
    if(typingchats.includes(selectedChat))
    settyping(true);
    else 
    settyping(false);
   
// console.log(typingchats)
 
}, [typingchats])



    useEffect(() => {
        // console.log("selectedchat: "+selectedChat)
       
        settext("");
        setstartedTyping(false);
        if(typingchats.includes(selectedChat))
        settyping(true)
        else
        settyping(false)
        const getChatinfo = () => {

            const chat = chats.find((e) => {
                return e._id === selectedChat;
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
                    else{
                        toast({
                            title: "ERROR OCCURED",
                            description: res.data.payload,
                            status: 'error',
                            duration: 5000,
                            isClosable: true,
                        });
                    }
                }).catch(function (error){
                    // console.log(error)
                    _setmessages([]);

                    toast({
                        title:error.message,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                })
        }
        fetchMessages();



return ()=>{
    // console.log("previos selectedchat: "+selectedChat)
    // console.log(startedTyping)
//    const getuser=(selectedChat)=>{
//           let chat= chats.find((chat)=>{
//             return chat._id===selectedChat
//            })
//            if(chat)
//            return chat.users[0]._id
//    }
//    console.log("typing: "+startedTyping)
//     if(socket)
//     if(startedTyping)
//    { console.log("inside")
//     socket.emit("typing", { typing:false, selectedChat,user_id:getuser(selectedChat) });}// very big bug here: cleanup is one step behind
           
}
        // eslint-disable-next-line
    }, [selectedChat]);

    useEffect(() => {
//     if(chatInfo)
// {console.log(chatInfo)}
        if (chatInfo) {
            if (chatInfo.unReadmessages !== 0) {
                // console.log("runs")
                const newState = chats.map(element => {
                    if (element._id === chatInfo._id) {
                        const counter = 0;
                        return { ...element, unReadmessages: counter }

                    }

                    return element
                });
                // console.log(newState);
                updateChats(newState);
            }
        }
return ()=>{
    // console.log("previous chatinfo")
    // console.log(chatInfo)
}
    }, [chatInfo])





    useEffect(() => {

        const showStatus = () => {
            if (chatInfo) {
                if (!chatInfo.isGroupChat) {
                    const foundOnline = onlineUsers.includes(chatInfo.users[0]._id);
                    if (foundOnline) setonlineStatus("Online")
                    else setonlineStatus("Offline")
                }
            }
        }

        showStatus()


    }, [onlineUsers, chatInfo])


    const handlesend = () => {
       if(text.length===0){
        toast({
            title: "Enter Something",
            status: 'warning',
            duration: 5000,
            isClosable: true,
        });
        return 
       }
        let msg=text;
        axios.post(`http://localhost:5000/api/sendmsg`, { chat_id: selectedChat, msg }, { headers: { token: JSON.parse(localStorage.getItem("token")) } })
            .then(res => {
                // console.log(res.data.payload)
                if (res.data.success) {
                    const msg = res.data.payload;
                    _setmessages([...messages, res.data.payload]);
                    const newState = chats.map(element => {
                        if (element._id === msg.chat._id) {
                            const counter = element.unReadmessages + 1;
                            return { ...element, latestMessage: { messege: msg.messege, createdAt: msg.createdAt } }

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
                else{
                    toast({
                        title: "ERROR OCCURED",
                        description: res.data.payload,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                }
            }).catch(function(error){
                toast({
                    title: error.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            })
            settext("")
            setstartedTyping(false);
            // socket.emit("typing", { typing:false, selectedChat ,user_id:user._id})

    }

    const [showModal, setshowModal] = useState(false)
    function tConvert(time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }
    const gettime = (time) => {
        let t = tConvert(new Date(time).toLocaleTimeString())
        let [h, m, s] = t.split(":")
        let [se, p] = s.split(" ")
        let ti = h + ":" + m + " " + p;
        return ti;
    }

    return (
        <>


            {/* message box start below */}
            <Box h="100%" w={"67%"} px="12px" pt={"5px"} border={"1px"} borderColor={"#ededed"}
                boxShadow="2xl" borderRadius={"8px"}
            >


                <Flex w="100%" >

                    {chatInfo ? chatInfo.isGroupChat ?
                        <HStack cursor={"pointer"} onClick={() => setshowModal(true)}>
                            <GroupInfomodal users={chatInfo.users} showModal={showModal} setshowModal={setshowModal} chatInfo={chatInfo} />
                            <AvatarGroup size='lg' max={2}>
                                {chatInfo ? chatInfo.users.map((e, i) => {
                                    return <Avatar key={i} name={e.name} src={e.profileImage} />
                                }) : ""}
                                <Avatar name={user.name} src='https://bit.ly/code-beast' />

                            </AvatarGroup>
                            <Text fontSize="xl" fontWeight="bold">{chatInfo ? chatInfo.chatName : ""}</Text>
                        </HStack>
                        : <>
                            <Avatar size="lg" name={chatInfo ? chatInfo.users[0].name : "Loading"} src={chatInfo.users[0].profileImage}>
                                <AvatarBadge boxSize="1.25em" bg={onlineStatus === "Online" ? 'green.500' : 'red.500'} />
                            </Avatar>
                            <Flex flexDirection="column" mx="5" justify="center">
                                <Text fontSize="lg" fontWeight="bold">
                                    {chatInfo ? chatInfo.users[0].name : ""}
                                </Text>
                                <Text color={onlineStatus === "Online" ? 'green.500' : 'red.500'}>{onlineStatus}</Text>
                            </Flex>
                        </> : ""}



                </Flex>
                <Divider borderBottomWidth="3px" color="black" mt="5" />


                <Flex w="100%" h="80%" overflowY="auto" flexDirection="column" p="3">



                    {messages.length > 0 ? messages.map((element, index) => {
                        return (
                            user._id === element.sender._id ? <Flex w="100%" key={index} justify="flex-end">
                                <Flex

                                    flexDirection={"column"}
                                    position="relative"
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
                                        pt={chatInfo ? chatInfo.isGroupChat ? "" : "1" : ""}
                                        my="1"

                                    >
                                        {chatInfo ? chatInfo.isGroupChat ? <Text alignSelf={"end"} fontSize={["10px", "12px"]}>{element.sender.name}</Text> : "" : ""}
                                        <Text>{element.messege}

                                        </Text>
                                        <Text alignSelf={"end"} fontSize={["10px", "12px"]}>{gettime(element.createdAt)}</Text>
                                    </Flex>


                                </Flex>
                        );
                    })

                        : <Center mt={"20%"} >No messages of this chat</Center>}



                    <AlwaysScrollToBottom />



                  {typing? <Box  >
                    <HStack >
                    <Avatar size={"sm"}
                           src={chatInfo?chatInfo.users[0].profileImage:""}
                           name={chatInfo?chatInfo.users[0].name:""}
                           > 
                           </Avatar>
                    <Image h={"20px"} src={typeloader}/>
                    {/* <Text>typing</Text> */}
                    </HStack> </Box>:""}
                    
                </Flex>

                
                <Box h="53px" p={"6px"}>
                    <Flex w="100%" justifyContent={"space-between"} px="10px" >
                        <Input
                            onChange={handlechange}
                            value={text}
                            flexBasis={"84%"}
                            placeholder="Type Something..."
                            border="1px"
                            borderRadius="8px"
                            _focus={{
                                border: "1px solid blue.400",
                            }}
                            id='msgInput'
                            onKeyDown={(e) => { if (e.key === 'Enter') handlesend() }}

                        />


                        <IconButton borderRadius={"full"} aria-label='Attachment icon' icon={<AttachmentIcon />} />



                        <Button onClick={handlesend} colorScheme={"messenger"} borderRadius="8px">Send</Button>
                    </Flex>
                </Box>



            </Box>











        </>
    )
}

export default ChatBox