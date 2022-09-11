import React from 'react'
import {
    Flex, Heading, Avatar, Stack, Text
} from '@chakra-ui/react'
function MyChats({ chat, _setselectedChat,selectedChat }) {

 

    return (
        <>
            <Stack mt={3}  cursor={"pointer"}
                onClick={() => _setselectedChat(chat._id)}
                backgroundColor={selectedChat===chat._id? "blue.500":""}
                color={selectedChat===chat._id?"white":""}
                borderWidth="1px"
                borderRadius="lg"
                w={{ sm: '100%', md: '100%' }}
                direction={{ base: 'column', md: 'row' }}
                boxShadow={'md'}
                padding={4}>
                <Flex flex={1} alignItems='center'>
                    <Avatar bg='teal.500' />
                    <Heading pl={2} fontSize={'1rem'} fontFamily={'body'}>
                        {chat.users[0].name}
                    </Heading>
                    <Text ml={8} fontSize='md'>{chat.latestmessage ? chat.latestmessage : "Start a conversion now"}</Text>
                </Flex>

            </Stack>
        </>
    )
}

export default MyChats