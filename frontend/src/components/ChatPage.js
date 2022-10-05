import React, { useContext, useEffect, useState } from 'react'
import { Box, Container, Flex, Heading, Divider, Button,useMediaQuery  } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import { chatContext } from "../context/chatsState"
import MyChats from './MyChats';
import ChatBox from './ChatBox';
import Gmodal from './Gmodal';
import bgimg from './3.gif'
import { MessegeState } from "../context/messegeState"

function ChatPage() {


  const context = useContext(chatContext);
  const [isLargerThan700] = useMediaQuery('(min-height: 700px)')

  // useEffect(() => {

  //     context.fetchChats();
  //     // eslint-disable-next-line
  // }, [])// error in this line 




  return (
    <>
      <Container maxW="1400px"  >
        <Container maxW='1200px' mb="20px"
         h={isLargerThan700? "700px":"600px"}
          mt={isLargerThan700? "50px":"15px"}  p={0} 
        >
          <Flex h="100%" justifyContent={"space-between"} >

            {/* My chats box start below */}
            <Box h="100%" flexBasis={"30%"}  minW={"360px"} borderRadius="8px" border={"1px"}
             borderColor={"#ededed"}
              boxShadow="2xl"  
             
            // overflowY={"hidden"} 
            >
<Box px={"5px"} pt="5px" >
              <Box textAlign={"center"} mb={"10px"} >
                <Heading color={"#999999"}
                  mb={"10px"}>Chats</Heading>
                <Divider />
              </Box >

              <Box mb="4px"  w={"100%"} textAlign="center" >
                <Gmodal />
              </Box >

              </Box>
              <Box h={isLargerThan700? "83%":"80%"} 
              borderRadius="lg" 
              overflowY={"auto"}
               
              pt="10px"
              px="7px"
              pb="10px"
              
              >
                {context.chats.length > 0 ?

                  context.chats.map((element, index) => {
                    return (<MyChats key={index} chat={element} index={index} />);
                  })
                  : "No Chats Yet"}

              </Box>

            </Box >


            <Box w="32px" minW="28px">

            </Box>



            <MessegeState>
              {context.selectedChat ? <ChatBox />
                :
                <Box bgImage={`url(${bgimg})`}
                  bgPosition="center"
                  bgRepeat="no-repeat"
                  borderRadius={"8px"}
                  bgSize={"cover"}
                  h="100%" bgColor={"grey"} w={"67%"} display="flex" justifyContent={"center"} alignItems="start">
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