
import { React } from 'react'
import ChatPage from "./ChatPage"
import Navbar from "./Navbar"
import {ChatState} from "../context/chatsState"
import { Container } from '@chakra-ui/react'
function Home(props) {
// console.log("home renderd")



  return (
    <>
<ChatState>
   <Container maxW='1230px' > <Navbar/></Container>
      <ChatPage/>
      </ChatState>
</>
  )
}

export default Home