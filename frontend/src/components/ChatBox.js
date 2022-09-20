import React, { useEffect, useState, useContext, useRef } from 'react'
import { Box,  Flex, Text, Divider, Button,  Avatar, AvatarBadge, Input, IconButton,  useToast, Center } from '@chakra-ui/react'
import {  AttachmentIcon } from '@chakra-ui/icons'
import axios from "axios"
import { chatContext } from "../context/chatsState"
import io from "socket.io-client"

var socket = 0;
function ChatBox({ selectedChat }) {
    // console.log("chat box render");
    const toast = useToast();
    const [messages, setmessages] = useState([])
    const { user, chats, updateChats } = useContext(chatContext);
    // const [socketConnected, setsocketConnected] = useState(false)
    const [roomjoined, setroomjoined] = useState(false);
    const [chatInfo, setchatInfo] = useState({})



    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

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


        const getChatinfo=()=>{
            const chat=chats.find((e)=>{
              return e._id===selectedChat;
            })
            setchatInfo(chat)
      }
      getChatinfo();

        return () => socket.off("message received");
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
        <>
            {/* <Box position={"relative"} height={"400px"} width={"100%"} backgroundColor={"blackAlpha.800"} borderWidth={"2px"}>
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

            </Box> */}





            {/* message box start below */}
            <Box h="100%" w={"70%"} px="12px" pt={"5px"}>


                <Flex w="100%">
                    <Avatar size="lg" src="">
                        <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>
                    <Flex flexDirection="column" mx="5" justify="center">
                        <Text fontSize="lg" fontWeight="bold">
                        {chatInfo?chatInfo.isGroupChat? chatInfo.chatName:chatInfo.users[0].name:""}
                        </Text>
                        <Text color="green.500">Online</Text>
                    </Flex>
                </Flex>
                <Divider borderBottomWidth="3px" color="black" mt="5" />


                <Flex w="100%" h="80%" overflowY="auto" flexDirection="column" p="3">



                {messages.length > 0 ? messages.map((element, index) => {
                    return (
                        user._id === element.sender._id?<Flex w="100%" justify="flex-end">
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
                    : <Flex w="100%">
                    <Avatar
                        name="Computer"
                        size={"sm"}
                        src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                        bg="blue.300"
                    ></Avatar>
                    <Flex
                        flexDirection={"column"}
                        bg="gray.100"
                        color="black"
                        borderRadius={"8px"}
                        minW="100px"
                        maxW="350px"
                        px={"3"}
                        pt="1"
                        my="1"

                    >
                        <Text>{user._id === element.sender._id ? element.messege : `from ${element.sender.name}: ${element.messege}`}

                        </Text>
                        <Text alignSelf={"end"} fontSize={["10px", "12px"]}>6:30 PM</Text>
                    </Flex>


                </Flex>
                    );
                })

                    : <Center mt={"20%"} color={"white"}>"No messages of this chat"</Center>}



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