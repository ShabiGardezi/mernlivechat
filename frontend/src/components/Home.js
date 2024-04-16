 
import { React,useContext } from 'react'
import ChatPage from "./ChatPage"
import Navbar from "./Navbar"
import {ChatState} from "../context/chatsState"
import { Box, Container, Progress, Text } from '@chakra-ui/react'
import { userContext } from "../context/userState"
import LoadingScreen from './LoadingScreen'

function Home(props) {
// console.log("home renderd")
const { loadingscreen, setloadingscreen } = useContext(userContext);


  return (
    <>
<ChatState>

 
   {loadingscreen? <LoadingScreen/>
   : <> <Container maxW='1230px' > <Navbar/></Container>
      <ChatPage/>
      
      </>}
      
      
      


      </ChatState>
</>
  )
}

export default Home