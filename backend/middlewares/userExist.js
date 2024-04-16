 const User =require("../Models/userModel");

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