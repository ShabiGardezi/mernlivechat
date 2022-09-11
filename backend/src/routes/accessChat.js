const express = require('express')
const router = express.Router()
const authuser = require('../../middlewares/authuser');
const User = require("../../Models/userModel")
const Chat = require("../../Models/chatModel")

module.exports = router;

router.post("/", authuser, async (req, res) => {// send existing chat if available or craete new one
  if (req.user) {
    const user_id = req.body.user_id;
    // console.log(req.body)
    if (user_id) {
      try {

        const newChat = new Chat({
          users: [req.user._id, user_id]
        });
        const savedChat = await newChat.save();
        // Chat.populate(savedChat,{path:"users",match:{_id:{$ne:user_id}},function(err,savedChat){
        //   console.log("dasdadsasdasd")
        //   res.send({ success: true, payload: savedChat })
        // }})
        // await savedChat.populate("users").execPopulate();
        const response=await Chat.findById(savedChat._id).populate({
          path:"users",
          match:{_id:{$eq:user_id}}
        });

        res.send({ success: true, payload: response });
      }
      catch (error) {
        console.log("first")
        res.send({ success: false, payload: error });
      }

    }
    else {
      res.send({ success: false, payload: "User_id not Found in body" });

    }
  }
  else {
    res.send({ success: false, payload: "User authentication error" });
  }



});
