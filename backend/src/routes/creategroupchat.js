<<<<<<< HEAD
 const express = require('express')
=======
const express = require('express')
>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145
const router = express.Router()
const authuser = require('../../middlewares/authuser');
const User = require("../../Models/userModel")
const Chat = require("../../Models/chatModel")

module.exports = router;

router.post("/", authuser, async (req, res) => {// send existing chat if available or craete new one
  if (req.user) {
    const users = req.body.users;
    const chatName=req.body.chatName;
    // console.log(req.body)
    if (users.length >= 2) {
      try {
          users.push(req.user._id);
        const newChat = new Chat({
          users: users,
          chatName,
          isGroupChat:true,
          groupAdmin:req.user._id
        });
        const savedChat = await newChat.save();
       
        const response=await Chat.findById(savedChat._id)
        .populate({
          path:"users",
          match:{_id:{$ne:req.user._id}}
        })
      

        res.send({ success: true, payload: response });
      }
      catch (error) {
        console.log("first")
        res.send({ success: false, payload: error });
      }

    }
    else {
      res.send({ success: false, payload: "Group must contain 2 members" });

    }
  }
  else {
    res.send({ success: false, payload: "User authentication error" });
  }



});
