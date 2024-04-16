 import {React,useState,useContext,useEffect} from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,Text,Flex,Input,IconButton, Box, Avatar,Divider,useToast, Heading, HStack, VStack
 
} from '@chakra-ui/react'
import {AddIcon} from "@chakra-ui/icons"
  import Gprofile from "./Gprofile"
  import {chatContext} from "../context/chatsState"
  import { userContext } from "../context/userState"

function GroupInfomodal({setshowModal,showModal,users,chatInfo}) {
  // console.log("render")
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupMembers, setgroupMembers] = useState([]);
    const context=useContext(chatContext);
    const { user } = useContext(userContext);
useEffect(() => {
  if(showModal)
  onOpen();

 
}, )
// console.log(chatInfo.groupAdmin)
        
          return (
            <>
      
<Modal
  isCentered
  onClose={()=>{onClose();setshowModal(false)}}
  isOpen={isOpen}
  motionPreset='scale'
  size={"xl"}
>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Group Members</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
    

  <Box borderRadius={"8px"}  maxH={"240px"} overflowX="auto">

{users?users.map((e,i)=>{
    return <HStack key={i}>
    <Box  borderRadius={"8px"} px="2" py={"1"} cursor={"pointer"} _hover={{backgroundColor:"blue.100"}} textAlign={"center"}>
        <HStack>
        <Avatar name= {e.name} src={e.profileImage}></Avatar>
        <VStack spacing={0}>
        <Text>  {e.name}</Text>
       {chatInfo.groupAdmin===e._id? <Text fontWeight={"extrabold"} fontSize="12px">Admin</Text>:""}
       {/* {chatInfo.groupAdmin===e._id?<Text>e._id</Text>:<Text>err</Text>} */}
        </VStack>
        </HStack>
    </Box>
    </HStack>
}):"No Members Found"}
  
 <HStack >
    <Box  borderRadius={"8px"} px="2" py={"1"} cursor={"pointer"} _hover={{backgroundColor:"blue.100"}} textAlign={"center"}>
        <HStack>
        <Avatar name= {context.user.name} src={user.profileImage}></Avatar>
        <VStack spacing={0}>
        <Text>  {context.user.name}</Text>
       {chatInfo.groupAdmin===context.user._id? <Text fontWeight={"extrabold"} fontSize="12px">Admin</Text>:""}
        </VStack>
        </HStack>
    </Box>
    </HStack>






        
        </Box>
    

      
   
    </ModalBody>
    <ModalFooter>
     
    
    </ModalFooter>
  </ModalContent>
</Modal>












            </>
          )
  
}

export default GroupInfomodal