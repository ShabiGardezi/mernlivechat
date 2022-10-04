import React,{useContext,useState,useEffect} from 'react'
import { Box, Text, Divider, Icon, HStack, Badge, Avatar } from '@chakra-ui/react'
import { chatContext } from "../context/chatsState"
import { userContext } from "../context/userState"


function MyChats({ chat,index }) {
 
  const { onlineUsers,selectedChat,_setselectedChat } = useContext(chatContext);
  const { user } = useContext(userContext);
  const [onlineStatus, setonlineStatus] = useState("Offline")
  

  useEffect(() => {
  
    const showStatus=()=>{
      if(!chat.isGroupChat)
       { const foundOnline=onlineUsers.includes(chat.users[0]._id);
      
        if(foundOnline) {setonlineStatus("Online");}
        else setonlineStatus("Offline")
      }
    }

    showStatus();


  }, [onlineUsers,chat])
  
  const sliceLatestmsg=(msg)=>{
         return  msg.slice(0,24)
  }


    const date = "2/08/22"
    const CircleIcon = (props) => (
        <Icon viewBox='0 0 200 200' {...props}>
          <path
            fill='currentColor'
            d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
          />
        </Icon>
      )


      function tConvert(time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }
    const gettime = (time) => {
        let t = tConvert(new Date(time).toLocaleTimeString())
        let [h, m, s] = t.split(":")
        let [se, p] = s.split(" ")
        let ti = h + ":" + m + " " + p;
        return ti;
    }


    return (
        <>
           
            
              <Box  cursor={"pointer"}  onClick={() => _setselectedChat(chat._id)}
               backgroundColor={selectedChat===chat._id? "#0078FF":""}
               color={selectedChat===chat._id?"white":""}
                _hover={{
                  // bgColor:selectedChat===chat._id?"":"blue.100",
                  boxShadow:"0px 0px 10px 0px #888888",
                 
                  
                }}
                transition="background-color 0.2s,color 0.2s,box-shadow 0.3s"
                borderRadius="8px"
                justifyContent={"center"}
                alignItems={"center"} w={"100%"} h={"80px"} display={"flex"}>

                <Box w={"19%"}>
                  {/* image box */}

                  <Avatar name={chat.isGroupChat? chat.chatName:chat.users[0].name} size={"md"} src={!chat.isGroupChat?chat.users[0].profileImage:""}></Avatar>
                </Box>
                <Box w={"79%"} >
                  <Box>
                    {/* date */}
                    <Text fontSize={"14px"} textAlign={"right"}>{
                    chat.latestMessage?
                    gettime(chat.latestMessage.createdAt):<Text visibility={"hidden"}>6:20 pm</Text>}</Text>


                    
                  </Box>
                  <Box>
                    
                    <HStack spacing={19}>
                      <Box w="220px"> <Text fontSize={"20px"}>  {chat.isGroupChat? chat.chatName:chat.users[0].name}</Text></Box>
                      <Box   ><Badge px={"10px"} textAlign={"center"} borderRadius={"7px"} colorScheme='red'>{chat.unReadmessages>0?chat.unReadmessages:""}</Badge></Box>


                    </HStack>
                   
                  </Box>
                  <Box>
                    <HStack mt={"5px"} spacing="1">
                    <Box w="220px" > <Text  fontStyle={"italic"}>
                      {chat.latestMessage ? sliceLatestmsg(chat.latestMessage.messege) : "Start a conversion..."}
                    </Text></Box>
                     {!chat.isGroupChat? <><CircleIcon boxSize="10px" color={onlineStatus==="Online"?'green.500':'red.500'} />
                      <Text fontSize={"12px"}>{onlineStatus}</Text></>:""}
                    </HStack>
                  </Box>

                </Box>

              </Box>
              
        </>
    )
}

export default MyChats