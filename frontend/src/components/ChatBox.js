import React, { useEffect, useState, useContext } from 'react'
import { Box, Input, Button, Center } from '@chakra-ui/react'
import axios from "axios"
import { chatContext } from "../context/chatsState"

function ChatBox({ selectedChat }) {

    const [messages, setmessages] = useState([])
    const { user } = useContext(chatContext);

    useEffect(() => {
        const fetchMessages = () => {
            if (!selectedChat) return;

            // console.log(selectedChat)
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

const handlesend=()=>{
    const msg=document.getElementById("msgInput").value;
    document.getElementById("msgInput").value="";
    axios.post(`http://localhost:5000/api/sendmsg`,{chat_id:selectedChat,msg} ,{ headers: { token: JSON.parse(localStorage.getItem("token")) } })
    .then(res => {
        // console.log(res.data)
       
    })

}



    return (
        <Box  position={"relative"} height={"400px"} width={"100%"} backgroundColor={"blackAlpha.800"}  borderWidth={"2px"}>
            <Box overflowY={"scroll"} height={"350px"} width={"100%"} >

            {messages.length > 0 ? messages.map((element, index) => {
                return (
                    <Box key={index} width={"200px"} m={"8px"} mt={"12px"} borderRadius={"20px"} p={"10px"} backgroundColor={"green.300"} color={"blackAlpha.900"} ml={user._id === element.sender._id ? "auto" : ""}>{element.messege}</Box>
                );
            })





                : <Center mt={"20%"} color={"white"}>"No messages of this chat"</Center> }
</Box>


            <Box backgroundColor={"blackAlpha.800"} p={"5px"} display={"flex"} bottom={0} width={"100%"} position={"absolute"}>
                <Input borderRadius={"20px"} mr={"20px"}  backgroundColor={"white"} id='msgInput' type={"text"}></Input>
                <Button backgroundColor={"blue.500"} color={"white"} width={"80px"} borderRadius={"20px"} id='send_btn' onClick={handlesend}>Send</Button>
            </Box>
            
        </Box>

    )
}

export default ChatBox