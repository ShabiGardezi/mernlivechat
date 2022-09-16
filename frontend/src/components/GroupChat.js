import {React,useState} from 'react'
import {Drawer,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,Button,Input,useDisclosure} from '@chakra-ui/react'
  import axios from 'axios';
  import Gprofile from "./Gprofile"

function GroupChat() {
  // console.log("render")
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [searchUsers, setsearchUsers] = useState([])
    const [groupMembers, setgroupMembers] = useState([]);
    

const handleAddtogroup=(user_id)=>{
 setgroupMembers([...groupMembers,user_id]);

};
// useEffect(() => {
//   console.log(groupMembers)

  
// }, )


const handlesubmit=()=>{
    axios.post(`http://localhost:5000/api/creategroupchat`, {users:groupMembers,chatName:"Friends"},{ headers: { token: JSON.parse(localStorage.getItem("token")) } })
  .then(res => {
    console.log(res.data);
    // context.updateChats([...context.chats,res.data.payload])
 

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
             <Button colorScheme='teal' onClick={onOpen}>
          create group
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
  
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader mt={10}>
              <Input autoComplete="off" type={"search"} onChange={handlechange} id="search" placeholder='Type here...' />
            </DrawerHeader>
  
            <DrawerBody>
  
              {searchUsers.length > 0 ? searchUsers.map((element, index) => {
                return <Gprofile handlesubmit={handlesubmit} handleAddtogroup={handleAddtogroup}  key={index} name={element.name} img={element.profileImage} _id={element._id}  />
              }
  
              ) : "Type to search"}
            </DrawerBody>
  
            <DrawerFooter>
              <Button onClick={handlesubmit} colorScheme='blue'>create group</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
            </>
          )
  
}

export default GroupChat