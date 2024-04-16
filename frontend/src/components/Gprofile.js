 import React from 'react'
import {
   
    Flex,
    Heading,
   Avatar,
    Stack,
    useColorModeValue,Text,Box
  } from '@chakra-ui/react'
 
  

function Gprofile({name,img,_id,handleAddtogroup}) {
  
  


  return (
  //   <Stack 
  //   onClick={()=>handleAddtogroup(_id)}
  //   mt={3}
  //   borderWidth="1px"
  //   borderRadius="lg"
  //   w={{ sm: '100%', md: '100%' }}
    
  //   direction={{ base: 'column', md: 'row' }}
  //   bg={useColorModeValue('white', 'gray.900')}
  //   boxShadow={'md'}
  //   padding={4}>
  //   <Flex flex={1} alignItems='center'>
  //   <Avatar bg='teal.500' />
  //      <Heading pl={2} fontSize={'1rem'} fontFamily={'body'}>
  //    {name}
  //     </Heading>
  //   </Flex>
  
  // </Stack>







<Box   onClick={()=>handleAddtogroup({_id,name,img})} borderRadius={"8px"} px="2" py={"1"} cursor={"pointer"} _hover={{backgroundColor:"blue.100"}} textAlign={"center"}>
<Avatar name= {name} src={img}></Avatar>
<Text>  {name}</Text>
</Box>
  )
}

export default Gprofile