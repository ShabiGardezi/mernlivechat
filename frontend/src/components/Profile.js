import React ,{useContext}from 'react'
import {
   
    Flex,
    Heading,
   Avatar,
    Stack,
    useToast,
    useColorModeValue,
  } from '@chakra-ui/react'
  import axios from 'axios';
  import {chatContext} from "../context/chatsState"

function Profile({name,img,_id}) {
  const toast = useToast();
  const context=useContext(chatContext);

 const handleclick=()=>{
  const findChat=context.chats.find((i)=>{return i.users[0]._id===_id})
  if(findChat) { 
    toast({
      
      description: "Chat already exists with that person",
      status: 'info',
      duration: 5000,
      isClosable: true,
    })  
    return 
  }

  axios.post(`http://localhost:5000/api/accesschat`, {user_id:_id},{ headers: { token: JSON.parse(localStorage.getItem("token")) } })
  .then(res => {
    // console.log(res.data);
    // const arr=[{...res.data.payload,name}]
    // changechats(arr);
    context.updateChats([...context.chats,res.data.payload])
 

  })
 }

  return (
    <Stack 
    onClick={handleclick}
    mt={3}
    borderWidth="1px"
    borderRadius="lg"
    w={{ sm: '100%', md: '100%' }}
    
    direction={{ base: 'column', md: 'row' }}
    bg={useColorModeValue('white', 'gray.900')}
    boxShadow={'md'}
    padding={4}>
    <Flex flex={1} alignItems='center'>
    <Avatar bg='teal.500' />
       <Heading pl={2} fontSize={'1rem'} fontFamily={'body'}>
     {name}
      </Heading>
    </Flex>
   
     
      
     
    
  </Stack>
  )
}

export default Profile