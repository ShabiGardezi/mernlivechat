<<<<<<< HEAD
 
=======

>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145
const express = require('express')
const router = express.Router()
const authuser = require('../../middlewares/authuser');
const User=require("../../Models/userModel")



router.post('/', authuser,  async (req, res) => {

    try {
      userId = req.user.id;
 
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

  module.exports=router;