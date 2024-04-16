<<<<<<< HEAD
 import React ,{useContext,useState}from 'react'
=======
import React ,{useContext,useState}from 'react'
>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145
import {
   Avatar,
    useToast,Box,Text
 
  } from '@chakra-ui/react'
  import axios from 'axios';
  import {chatContext} from "../context/chatsState"
import constants from '../constants';

function SUprofile({name,img,_id,onClose}) {
  const toast = useToast();
  const context=useContext(chatContext);
  const [axiosinprocess, setaxiosinprocess] = useState(false);
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
  setaxiosinprocess(true);
  // axios.post(`http://localhost:5000/api/accesschat`, {user_id:_id},{ headers: { token: JSON.parse(localStorage.getItem("token")) } })
  axios
    .post(
      `${constants.baseUrl}/api/accesschat`,
      { user_id: _id },
      { headers: { token: JSON.parse(localStorage.getItem("token")) } }
    )
    .then((res) => {
      if (res.data.success) {
        context.updateChats([res.data.payload, ...context.chats]);
        setaxiosinprocess(false);
        onClose();
      } else {
        setaxiosinprocess(false);
        toast({
          title: "ERROR OCCURED",
          description: res.data.payload,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    })
    .catch(function (error) {
      setaxiosinprocess(false);
      toast({
        title: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });
 }

  return (
    <>
  
  
   <Box onClick={()=>{
    if(!axiosinprocess)
    handleclick()
    }} borderRadius={"8px"} px="2" py={"1"} cursor={"pointer"} _hover={{backgroundColor:"blue.100"}} textAlign={"center"}>
   <Avatar name={name} src={img} />
   <Text> {name}</Text>
</Box>
</>
  )
}

export default SUprofile