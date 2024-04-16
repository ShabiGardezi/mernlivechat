<<<<<<< HEAD
 const mongoose = require('mongoose');
=======
const mongoose = require('mongoose');
>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145
const { Schema } = mongoose;

const messageSchema = new Schema({
  messege: { type: String, required: true },

  sender: { type: Schema.Types.ObjectId, required: true, ref: "user" },

  // receiver: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  chat: { type: Schema.Types.ObjectId, ref: "chat" },
  readBy: [{ type: Schema.Types.ObjectId, ref: "user" }],
  // creationDate:{
  //   type:Date,
  //   default:Date.now
  // }

},
  { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);