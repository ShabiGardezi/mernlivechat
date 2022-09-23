
import { React } from 'react'
import ChatPage from "./ChatPage"
import Navbar from "./Navbar"
import {ChatState} from "../context/chatsState"
function Home(props) {
// console.log("home renderd")



  return (
    <>
<ChatState>
    <Navbar/>
      <ChatPage/>
      </ChatState>
</>
  )
}

export default Home