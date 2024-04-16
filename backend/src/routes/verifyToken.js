const express = require('express')
const router = express.Router()
const userExist = require("../../middlewares/userExist")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authuser = require('../../middlewares/authuser');
const User =require("../../Models/userModel");

const privateKey = "shabigardezi51214";

router.get("/", authuser, async (req, res) => {
    if (req.user) {
       
        const email=req.user.email;

        const user=await User.findOne({email});
         if(user){
            res.send({success:true,payload:user});
         }
         else
         res.send({success:false,payload:"user not found"});

    }
    else{
        res.send({success:false,payload:"Authentication Error"});
    }


});

module.exports = router;