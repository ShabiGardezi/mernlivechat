<<<<<<< HEAD
 const mongoose = require('mongoose');
=======
const mongoose = require('mongoose');
>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145
const { Schema } = mongoose;

const chatSchema = new Schema({


    chatName: { type: String, trim: true, default:"private" },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message",
    },
    unReadmessages:{
        type:Number,
        default:0
        
    }
    ,
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "user" },







}
    , { timestamps: true });

module.exports = mongoose.model("chat", chatSchema);