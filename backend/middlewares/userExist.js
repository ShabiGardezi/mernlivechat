<<<<<<< HEAD
 const User =require("../Models/userModel");
=======
const User =require("../Models/userModel");
>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145

module.exports=async(req,res,next)=>{

const {email}=req.body;

const user=await User.findOne({email});

if(!user){
    
    req.success=false;
    next();
}
else{
    req.user=user;
    req.success=true;
    
    next();
}


}