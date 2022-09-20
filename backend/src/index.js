const express = require('express');
const app = express();
const createuser=require("./routes/createuser");
const loginuser=require("./routes/loginuser");
const getuser=require("./routes/getuser");
const sendmsg=require("./routes/sendmsg");
const fetchmessages=require("./routes/fetchmessages");
const connectTodatabase=require("./connection");
const getallchats=require("./routes/getallchats");
const accessChat=require("./routes/accessChat");
const searchuser=require("./routes/searchuser");
const creategroupchat=require("./routes/creategroupchat");
const Chat=require("../Models/chatModel")
const cors = require("cors");

const port = 5000 || process.env.port;

connectTodatabase(); //connection to database

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// api endpoint routes for User
app.use("/api/createuser",createuser);
app.use("/api/loginuser",loginuser);
app.use("/api/getuser",getuser);

//api endpoint routes for Chat
app.use("/api/getallchats",getallchats);
app.use("/api/accessChat",accessChat);
app.use("/api/searchuser",searchuser);
app.use("/api/creategroupchat",creategroupchat);

//api endpoint routes for messages
app.use("/api/sendmsg",sendmsg);
app.use("/api/fetchmessages/:chat_id",fetchmessages);

const server=app.listen(port, () => {
  console.log(`Chat app listening on port ${port}`)
});

const io= require("socket.io")(server,{
  cors:{
    origin:"http://localhost:3000"
  }
})

io.on("connection" ,(socket)=>{

//   socket.use(async([event,...args],next)=>{
// if(event ==="new message"){
//     const chat_id=args[0];
//   const result= await Chat.findById(chat_id).populate("users","_id");
//   socket.users=result.users;

// }
// next();
//   });
  
  socket.on("setup",(user_id)=>{
    socket.join(user_id);
    socket.emit("user joined the room",user_id);
    
  });

  socket.on("new message",(message)=>{
     
const chat=message.chat;
      chat.users.forEach((user)=>{
        if(message.sender._id===user._id) return;
         socket.to(user._id).emit("message received",message);
      })

  });

socket.on("disconnect",(reason)=>{
  console.log(reason)
})


})
