const express = require('express')
const router = express.Router()
const authuser = require('../../middlewares/authuser');
const User = require("../../Models/userModel")
const Chat = require("../../Models/chatModel")

module.exports = router;

router.get("/",authuser, async(req, res) => {
    
if(req.user) // bug: if a empty string come all users are returned
  {  
    let tofind= req.query;
  
    if(!tofind){
        res.send({success:false,payload:"Nothing found in params"});
    }
    try {
        
      
   
       
        const users=await User.find({name: {$regex: tofind.search, $options: 'i'},_id:{$ne:req.user._id}}).select("_id profileImage name ");
        
        res.send({success:true,payload:users});
    } catch (error) {
        res.send({success:false,payload:error});
    }
}
else{
    res.send({success:false,payload:"User authentication error"});
}


});
