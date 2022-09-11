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

const cors = require("cors");
const port = 5000

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

//api endpoint routes for messages
app.use("/api/sendmsg",sendmsg);
app.use("/api/fetchmessages/:chat_id",fetchmessages);

app.listen(port, () => {
  console.log(`Chat app listening on port ${port}`)
})