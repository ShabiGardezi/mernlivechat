const mongoose = require('mongoose');


module.exports=()=>{ mongoose.connect('mongodb://localhost:27017/Chat-app').then( ()=> console.log("connected to Database") ).catch((err)=> console.log(err));}