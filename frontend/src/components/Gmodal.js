import {React,useState,useContext} from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,Text,Flex,Input,IconButton, Box, Avatar,Divider,useToast
 
} from '@chakra-ui/react'
import {AddIcon} from "@chakra-ui/icons"
  import axios from 'axios';
  import Gprofile from "./Gprofile"
  import {chatContext} from "../context/chatsState"
function Gmodal() {
  // console.log("render")
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [searchUsers, setsearchUsers] = useState([])
    const [groupMembers, setgroupMembers] = useState([]);
    const toast = useToast();
    const context=useContext(chatContext);
const handleAddtogroup=({name,_id,img})=>{
  if(groupMembers.some(member=>member._id===_id))
  {
    toast({
      description: "Already selected",
      status: 'warning',
      duration: 5000,
      isClosable: true,
    })  
  }
  else{
    setgroupMembers([...groupMembers,{_id,name,img}]);
  }

};
// useEffect(() => {
//   // console.log("useffect")
//   console.log(groupMembers)

  
// }, )


const handlesubmit=()=>{
    axios.post(`http://localhost:5000/api/creategroupchat`, {users:groupMembers,chatName:"Friends"},{ headers: { token: JSON.parse(localStorage.getItem("token")) } })
  .then(res => {
    console.log(res.data);
    if(res.data.success)
    context.updateChats([res.data.payload,...context.chats])
 onClose();

  })
}


    const handlechange = (e) => {
      const searchtext = e.target.value;
      if (!searchtext) {
        setsearchUsers([])
      }
      else {
        axios.get(`http://localhost:5000/api/searchuser?search=${searchtext}`, { headers: { token: JSON.parse(localStorage.getItem("token")) } })
          .then(res => {
            // console.log(res.data);
            setsearchUsers(res.data.payload);
          })
      }
    }
        
          return (
            <>
        <Button onClick={onOpen} borderRadius={"8px"} rightIcon={<AddIcon />} w="80%" h={"40px"} colorScheme="messenger">Create Group</Button>
<Modal
  isCentered
  onClose={()=>{setgroupMembers([]);onClose()}}
  isOpen={isOpen}
  motionPreset='scale'
  size={"xl"}
>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Search Users</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Input autoComplete="off" type={"search"} onChange={handlechange} id="search" variant='flushed' flexBasis={"85%"} placeholder="Search here" />

       <Flex maxH={"240px"} overflowY="auto" flexWrap={"wrap"} mt="6px"  align="center" justifyContent={"center"}>
       {searchUsers.length > 0 ? searchUsers.map((element, index) => {
                return <Gprofile handlesubmit={handlesubmit} handleAddtogroup={handleAddtogroup}  key={index} name={element.name} img={element.profileImage} _id={element._id}  />
              }
  
              ) : ""}

      


        </Flex> 
        <Divider borderBottomWidth="3px" color="black" mt="5" />
        <Text>Selected Users</Text>
        <Flex borderRadius={"8px"}  maxH={"240px"} overflowY="auto" flexWrap={"wrap"} mt="6px"  align="center">
          {groupMembers?groupMembers.map((e,i)=>{
            return (<Box key={i} borderRadius={"8px"} px="2" py={"1"} cursor={"pointer"} _hover={{backgroundColor:"blue.100"}} textAlign={"center"}>
            <Avatar name= {e.name}></Avatar>
            <Text>  {e.name}</Text>
        </Box> )
          }):""}
       
        </Flex> 

      
   
    </ModalBody>
    <ModalFooter>
     <Button  onClick={handlesubmit} colorScheme={"messenger"}>Create Group</Button>
    
    </ModalFooter>
  </ModalContent>
</Modal>












            </>
          )
  
}

export default Gmodal