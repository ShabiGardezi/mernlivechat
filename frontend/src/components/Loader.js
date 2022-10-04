import { Flex, Progress} from '@chakra-ui/react'
import React from 'react'
import css from "../loader.css"
function Loader() {
  return (
    <>
<Flex h="100vh" w="100vw" align={"center"} justifyContent="center" >
    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    <Progress value={20} size='xs' colorScheme="messenger" />
    </Flex>
    </>
  )
}

export default Loader