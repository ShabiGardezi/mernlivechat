import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex, Input, useToast,InputGroup,InputLeftElement,Text

} from '@chakra-ui/react'
import axios from 'axios';
import Loader from "./Loader"
import { SearchIcon } from "@chakra-ui/icons"
import SUprofile from './SUprofile';

function SUModal({ isOpen, onOpen, onClose }) {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchUsers, setsearchUsers] = useState([])
  const [showloading, setshowloading] = useState(false)
  const [noResultsFound, setnoResultsFound] = useState(false)
  const toast = useToast();

  const handlechange = (e) => {
    const searchtext = e.target.value;
    if (!searchtext) {
      setsearchUsers([])
      setnoResultsFound(false)
    }
    else {
      setnoResultsFound(false)
      setshowloading(true);
      // axios.get(`http://localhost:5000/api/searchuser?search=${searchtext}`, { headers: { token: JSON.parse(localStorage.getItem("token")) } })
      axios.get(`/api/searchuser?search=${searchtext}`, { headers: { token: JSON.parse(localStorage.getItem("token")) } })
        .then(res => {
          // console.log(res.data);
          if (res.data.success)
           { setsearchUsers(res.data.payload);
            setnoResultsFound(true);
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
          setshowloading(false);
        }
        
        ).catch(function (error) {
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

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='scale'
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search Users</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Input variant='flushed' flexBasis={"85%"} placeholder="Search here" autoComplete="off" onChange={handlechange} id="search" /> */}


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
            
            :<Flex mt="10px" maxH={"240px"} overflowY="auto" flexWrap={"wrap"}     align="center" justifyContent={"center"}>  
              {searchUsers.length > 0 ? searchUsers.map((element, index) => {
                return <SUprofile onClose={onClose} key={index} name={element.name} img={element.profileImage} _id={element._id} />
              }

              ) : noResultsFound? <Text mt="10px">No Results Found</Text>:""}
            </Flex>}

          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SUModal