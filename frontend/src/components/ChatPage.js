import React, { useContext, useEffect, useState } from 'react'
import { Box, Container, Flex, Heading,  Divider, Button} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import { chatContext } from "../context/chatsState"
import MyChats from './MyChats';
import ChatBox from './ChatBox';
import Gmodal from './Gmodal';
import bgimg from './3.gif'

function ChatPage() {

    const [selectedChat, setselectedChat] = useState()
    const context = useContext(chatContext);

    useEffect(() => {

        context.fetchChats();
        // eslint-disable-next-line
    }, [])// error in this line 

    const _setselectedChat = (chat_id) => {

        setselectedChat(chat_id);
    }


    return (
        <>
            {/* <Heading textAlign={"center"}>My Chats</Heading>

            <GroupChat></GroupChat>
            <Container maxW='1000px'>
                {context.chats.length > 0 ?

                    context.chats.map((element, index) => {
                        return (<MyChats key={index} chat={element} _setselectedChat={_setselectedChat} selectedChat={selectedChat} />);
                    })
                    : "No Chats Yet"}
                <ChatBox selectedChat={selectedChat} />
            </Container> */}





            <Container maxW='1200px' h={"700"} mt="50px" p={0}>
                <Flex h="100%" border='1px' >

 {/* My chats box start below */}
 <Box h="100%" w={"30%"} p={"5px"} >

<Box mb={"10px"}>
  <Heading
    mb={"10px"}>Chats</Heading>
  <Divider />
</Box >

<Box mb={"10px"} w={"100%"} textAlign="center" >
    <Gmodal/>
</Box >


<Box w={"350px"} h={"82%"} borderRadius="lg" >
{context.chats.length > 0 ?

context.chats.map((element, index) => {
    return (<MyChats key={index} chat={element} _setselectedChat={_setselectedChat} selectedChat={selectedChat} />);
})
: "No Chats Yet"}

</Box>

</Box >




{selectedChat?<ChatBox selectedChat={selectedChat} />:<Box   bgImage={`url(${bgimg})`}
       bgPosition="center"
       bgRepeat="no-repeat"
       bgSize={"cover"}
       h="100%" bgColor={"red"} w={"100%"} display="flex" justifyContent={"center"} alignItems="start">
         <Heading mt={"40px"} color={"blue.400"} fontSize={"2rem"}>Select a Chat to Start Messaging</Heading>
      </Box>}








                </Flex>
            </Container>
        </>
    )

}

export default ChatPage