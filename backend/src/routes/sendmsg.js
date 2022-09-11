const express = require('express')
const router = express.Router()
const authuser = require('../../middlewares/authuser');
const Message = require("../../Models/messageModel")
const Chat = require("../../Models/chatModel")


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

                const savedMessage = await newMessage.save();
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