<<<<<<< HEAD
 const mongoose = require('mongoose');
=======
const mongoose = require('mongoose');
>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },

  password: {
    type: String,
    required: true
  },

  profileImage: {
    type: String,
    // default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  },
  isAdmin: {
    type: String,
    required: true,
    default: false
  },

  

} ,{ timestaps: true });

module.exports = mongoose.model("user", userSchema);