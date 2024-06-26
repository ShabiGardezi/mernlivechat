<<<<<<< HEAD
 import { Flex ,Progress,Text, VStack } from '@chakra-ui/react'
=======
import { Flex ,Progress,Text, VStack } from '@chakra-ui/react'
>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145
import React,{useContext} from 'react'
import { chatContext } from "../context/chatsState"
function LoadingScreen() {
  const { progress } = useContext(chatContext);
  return (
    <Flex align={"center"} justifyContent="center" height={"100vh"} w="100vw" direction={"column"}>
<VStack>
<Text>Getting things ready...</Text>
<Progress value={progress} size='xs' colorScheme={"messenger"} w="500px"/>
<Text colorScheme={"messenger"} color="#0078FF" fontWeight={"bold"}>{progress}%</Text>
</VStack>
    </Flex>
  )
}

export default LoadingScreen