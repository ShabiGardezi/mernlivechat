import React from 'react'
import {
   
    Flex,
    Heading,
   Avatar,
    Stack,
    useColorModeValue,
  } from '@chakra-ui/react'
 
  

function Gprofile({name,img,_id,handleAddtogroup}) {
  
  


  return (
    <Stack 
    onClick={()=>handleAddtogroup(_id)}
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

export default Gprofile