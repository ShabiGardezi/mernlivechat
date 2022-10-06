import { React, useState, useContext, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button, Text, Flex, Input, IconButton, Box, Avatar, Divider, useToast
  , InputGroup, InputLeftElement
} from '@chakra-ui/react'
import Loader from "./Loader"
import { AddIcon, SearchIcon } from "@chakra-ui/icons"
import axios from 'axios';
import Gprofile from "./Gprofile"
import { chatContext } from "../context/chatsState"
function Gmodal() {
  // console.log("render")

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchUsers, setsearchUsers] = useState([])
  const [groupMembers, setgroupMembers] = useState([]);
  const [showloading, setshowloading] = useState(false)
  const [noResultsFound, setnoResultsFound] = useState(false)
  const toast = useToast();
  const context = useContext(chatContext);
  const handleAddtogroup = ({ name, _id, img }) => {
    if (groupMembers.some(member => member._id === _id)) {
      toast({
        description: "Already selected",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
    }
    else {
      setgroupMembers([...groupMembers, { _id, name, img }]);
    }

  };
  // useEffect(() => {
  //   // console.log("useffect")
  //   console.log(groupMembers)


  // }, )


  const handlesubmit = () => {
    const groupName = document.getElementById("groupName").value;
    if (groupMembers.length >= 2)
      if (groupName) {
        axios.post(`http://localhost:5000/api/creategroupchat`, { users: groupMembers, chatName: groupName }, { headers: { token: JSON.parse(localStorage.getItem("token")) } })
        .then(res => {
          // console.log(res.data);
          if (res.data.success) {
            context.updateChats([res.data.payload, ...context.chats])
            setgroupMembers([]);
            setsearchUsers([])
            onClose();
          }
          else {
            toast({
              title: "ERROR OCCURED",
              description: res.data.payload,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        }).catch(function (error) {
          toast({
            title: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        })

      }
      else {
        toast({

          description: "Group name cannot be empty",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    else {
      toast({

        description: "Group must contain atleast 2 members",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }


  const handlechange = (e) => {
    const searchtext = e.target.value;
    if (!searchtext) {
      setsearchUsers([])
      setnoResultsFound(false)
    }
    else {
      setnoResultsFound(false);
      setshowloading(true);
      axios.get(`http://localhost:5000/api/searchuser?search=${searchtext}`, { headers: { token: JSON.parse(localStorage.getItem("token")) } })
        .then(res => {
          // console.log(res.data);
          if (res.data.success)
            {setsearchUsers(res.data.payload);
            if(res.data.payload.length <= 0){
                     setnoResultsFound(true);
            }
            }
          else {
            toast({
              title: "ERROR OCCURED",
              description: res.data.payload,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }setshowloading(false);
        }).catch(function (error) {
          setshowloading(false);
          toast({
            title: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        })
    }
  }

  return (
    <>
      <Button onClick={onOpen} borderRadius={"8px"} rightIcon={<AddIcon />} w="80%" h={"40px"} colorScheme="messenger">Create Group</Button>
      <Modal
        isCentered
        onClose={() => { setgroupMembers([]); setsearchUsers([]); onClose() }}
        isOpen={isOpen}
        motionPreset='scale'
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent={"center"} mb="20px">
              <Input id='groupName' autoComplete="off" type={"text"} variant='outline' w={"60%"} placeholder=" Enter Group Name" textAlign={"center"} />
            </Flex>


            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon color='gray.300' />}
              />
              <Input autoComplete="off" type={"search"} onChange={handlechange} id="search" variant='flushed' flexBasis={"100%"} placeholder='Search Users' />
            </InputGroup>


           {showloading?
            <Flex mt="10px"  alignItems="center" justifyContent={"center"}>
            <Loader/> 
            </Flex>
            :<Flex maxH={"240px"} overflowY="auto" flexWrap={"wrap"} mt="6px" align="center" justifyContent={"center"}>
              {searchUsers.length > 0 ? searchUsers.map((element, index) => {
                return <Gprofile handlesubmit={handlesubmit} handleAddtogroup={handleAddtogroup} key={index} name={element.name} img={element.profileImage} _id={element._id} />
              }

              ) : noResultsFound? <Text mt="10px">No Results Found</Text>:""}


            </Flex>}


            {groupMembers.length > 0 ? <> <Divider borderBottomWidth="3px" color="black" mt="5" />
              <Text>Selected Members</Text> </> : ""}
            <Flex borderRadius={"8px"} maxH={"240px"} overflowY="auto" flexWrap={"wrap"} mt="6px" align="center">
              {groupMembers ? groupMembers.map((e, i) => {
                return (<Box key={i} borderRadius={"8px"} px="2" py={"1"} cursor={"pointer"} _hover={{ backgroundColor: "blue.100" }} textAlign={"center"}>
                  <Avatar name={e.name} src={e.img}></Avatar>
                  <Text>  {e.name}</Text>
                </Box>)
              }) : ""}

            </Flex>



          </ModalBody>
          <ModalFooter>
            <Button onClick={handlesubmit} colorScheme={"messenger"}>Create Group</Button>

          </ModalFooter>
        </ModalContent>
      </Modal>












    </>
  )

}

export default Gmodal