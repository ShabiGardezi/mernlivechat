import React from 'react'
import { Box, Text, Divider, Icon, HStack, Badge, Avatar } from '@chakra-ui/react'
function MyChats({ chat, _setselectedChat,selectedChat }) {
    const date = "2/08/22"
    const CircleIcon = (props) => (
        <Icon viewBox='0 0 200 200' {...props}>
          <path
            fill='currentColor'
            d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
          />
        </Icon>
      )

    return (
        <>
           
            <Divider />
              <Box  onClick={() => _setselectedChat(chat._id)}
               backgroundColor={selectedChat===chat._id? "blue.500":""}
               color={selectedChat===chat._id?"white":""}
                _hover={{
                  bgColor:selectedChat===chat._id?"":"blue.100"
                }}
                borderRadius="8px"
                justifyContent={"center"}
                alignItems={"center"} w={"100%"} h={"80px"} display={"flex"}>

                <Box w={"19%"}>
                  {/* image box */}

                  <Avatar name={chat.isGroupChat? chat.chatName:chat.users[0].name} size={"md"} src="{defaultimg}"></Avatar>
                </Box>
                <Box w={"79%"} >
                  <Box>
                    {/* date */}
                    <Text fontSize={"14px"} textAlign={"right"}>{date}</Text>
                  </Box>
                  <Box>
                    
                    <HStack spacing={19}>
                      <Box w="220px"> <Text fontSize={"20px"}>  {chat.isGroupChat? chat.chatName:chat.users[0].name}</Text></Box>
                      <Box   ><Badge px={"10px"} textAlign={"center"} borderRadius={"7px"} colorScheme='red'>{chat.unReadmessages>0?chat.unReadmessages:""}</Badge></Box>


                    </HStack>
                   
                  </Box>
                  <Box>
                    <HStack mt={"5px"}>
                    <Box w="220px" > <Text fontStyle={"italic"}>{chat.latestMessage ? chat.latestMessage.messege : "Start a conversion..."}</Text></Box>
                      <CircleIcon boxSize="10px" color='green.500' />
                      <Text fontSize={"12px"}>Online</Text>
                    </HStack>
                  </Box>

                </Box>

              </Box>
              <Divider />
        </>
    )
}

export default MyChats