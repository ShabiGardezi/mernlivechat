import React ,{useContext}from 'react'
import {
   Avatar,
    useToast,Box,Text
 
  } from '@chakra-ui/react'
  import axios from 'axios';
  import {chatContext} from "../context/chatsState"

function SUprofile({name,img,_id,onClose}) {
  const toast = useToast();
  const context=useContext(chatContext);

 const handleclick=()=>{
  const findChat=context.chats.find((i)=>{
    if(i.isGroupChat) return false;
    return i.users[0]._id===_id})
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
    context.updateChats([res.data.payload,...context.chats])
    // context.updateChats([...context.chats,res.data.payload])
    onClose();

  })
 }

  return (
    <>
  
  
   <Box onClick={handleclick} borderRadius={"8px"} px="2" py={"1"} cursor={"pointer"} _hover={{backgroundColor:"blue.100"}} textAlign={"center"}>
   <Avatar name={name} />
   <Text> {name}</Text>
</Box>
</>
  )
}

export default SUprofile