 const express = require('express')

const Chat = require("../../Models/chatModel")
const authuser = require('../../middlewares/authuser');
const Message = require("../../Models/messageModel")
const router = express.Router()

module.exports = router;

router.get("/", authuser, async(req, res) => {
if(req.user)
  {  
    try {
      
      const user_id = req.user._id;
   
  
      const chats=await Chat.find({users:user_id}).populate("latestMessage") .populate({
        path:"users",
        match:{_id:{$ne:user_id}}
      }).sort({createdAt:-1});
  
      res.send({success:true,payload:chats})
    } catch (error) {
      console.log(error);
      res.send({success:false,payload:error})
    }
}
else{
    res.send({success:false,payload:"User authentication error"});
}



});
