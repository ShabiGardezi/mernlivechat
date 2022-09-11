import SearchDrawer from "./SearchDrawer"
import { React } from 'react'
import ChatPage from "./ChatPage"

function Home(props) {
// console.log("home renderd")



  return (
    <>
    
      <SearchDrawer />
      <ChatPage/>
</>
  )
}

export default Home