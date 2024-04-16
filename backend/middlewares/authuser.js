<<<<<<< HEAD
 
=======

>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145
const jwt = require('jsonwebtoken');

const privateKey="shabigardezi51214";
module.exports=(req,res,next)=>{

    const token=req.headers.token;
    
    if(!token){
        res.send({success:false,payload:"Token not found"});
    }
    try {
        const decoded = jwt.verify(token, privateKey);
        
        req.user=decoded;
        next();
    } catch (error) {
        res.send({success:false,payload:error});
    }


}