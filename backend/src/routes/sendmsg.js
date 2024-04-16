 const express = require('express')
const router = express.Router()
const authuser = require('../../middlewares/authuser');
const Message = require("../../Models/messageModel")
const Chat = require("../../Models/chatModel")
const User = require("../../Models/userModel")


module.exports = router;

router.post("/", authuser, async (req, res) => {

    if (req.user) {
        if (req.body.chat_id && req.body.msg) {
            const sender_id = req.user._id;
            const { msg, chat_id } = req.body;

            const newMessage = new Message({
                sender: sender_id,
                chat: chat_id,
                messege: msg
            })
            try {

                var savedMessage = await newMessage.save();
                
                // savedMessage= await savedMessage.populate("chat").execPopulate();
                 savedMessage=await Chat.populate(savedMessage,{path:"chat",select:"users chatName isGroupChat groupAdmin" }
                 
                 );
                 savedMessage=await User.populate(savedMessage,{path:"chat.users", select:"name profileImage"});
                 savedMessage=await User.populate(savedMessage,{path:"sender", select:"name profileImage"});
                 savedMessage=await User.populate(savedMessage,{path:"chat.groupAdmin", select:"name"});
                 
                // savedMessage= await savedMessage.populate("sender").execPopulate();
                // console.log(savedMessage);
                await Chat.findByIdAndUpdate(chat_id, { latestMessage: savedMessage._id });
               
                res.send({ success: true, payload: savedMessage })
            } catch (error) {
                res.send({ success: false, payload: error })
            }

        }
        else {
            res.send({ success: false, payload: "Body paramerters missing" })
        }
    }
    else {
        res.send({ success: false, payload: "Authentication Error" })
    }





});