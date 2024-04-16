<<<<<<< HEAD
 const express = require('express')
=======
const express = require('express')
>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145
const router = express.Router({mergeParams: true})
const authuser = require('../../middlewares/authuser');
const Message = require("../../Models/messageModel")
const Chat = require("../../Models/chatModel")


module.exports = router;

router.get("/", authuser, async (req, res) => {

    if (req.user) {
        
        const { chat_id } = req.params;
        try {
          
            const messages=await Message.find({chat:chat_id})
            .populate("sender","name profileImage")
            .sort({createdAt:1});
            res.send({success: true, payload:messages})

        } catch (error) {
            res.send({ success: false, payload:error })
        }



    }
    else {
        res.send({ success: false, payload: "Authentication Error" })
    }


})