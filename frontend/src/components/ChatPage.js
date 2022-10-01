import React, { useContext, useEffect, useState } from 'react'
import { Box, Container, Flex, Heading,  Divider, Button} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import { chatContext } from "../context/chatsState"
import MyChats from './MyChats';
import ChatBox from './ChatBox';
import Gmodal from './Gmodal';
import bgimg from './3.gif'
import {MessegeState} from "../context/messegeState"

function ChatPage() {

   
    const context = useContext(chatContext);

    useEffect(() => {

        context.fetchChats();
        // eslint-disable-next-line
    }, [])// error in this line 

  


    return (
        <>
           <Container maxW="1400px" >
            <Container maxW='1200px' h={"700"} mt="50px" p={0}
           >
                <Flex h="100%"  justifyContent={"space-between"}>

 {/* My chats box start below */}
 <Box h="100%" flexBasis={"30%"} p={"5px"} minW={"360px"} borderRadius="8px" border={"1px"} borderColor={"#ededed"}
 boxShadow="2xl" overflowY={"hidden"}>

<Box textAlign={"center"} mb={"10px"} >
  <Heading color={"#999999"}
    mb={"10px"}>Chats</Heading>
  <Divider />
</Box >

<Box mb={"10px"} w={"100%"} textAlign="center" >
    <Gmodal/>
</Box >


<Box  h={"84%"} borderRadius="lg">
{context.chats.length > 0 ?

context.chats.map((element, index) => {
    return (<MyChats key={index} chat={element} index={index}  />);
})
: "No Chats Yet"}

</Box>

</Box >


<Box  w="32px" minW="28px">

</Box>



<MessegeState>
{context.selectedChat?<ChatBox />
:
<Box   bgImage={`url(${bgimg})`}
       bgPosition="center"
       bgRepeat="no-repeat"
       borderRadius={"8px"}
       bgSize={"cover"}
       h="100%" bgColor={"red"} w={"67%"} display="flex" justifyContent={"center"} alignItems="start">
         <Heading mt={"40px"} color={"blue.400"} fontSize={"2rem"}>Select a Chat to Start Messaging</Heading>
      </Box>}

      </MessegeState>






                </Flex>
            </Container>
            </Container>
        </>
    )

}

export default ChatPage