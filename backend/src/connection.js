<<<<<<< HEAD
 const mongoose = require('mongoose');
=======
const mongoose = require('mongoose');
>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145
const dotenv = require("dotenv");

dotenv.config({path:"../.env"});

module.exports=()=>{ mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( ()=> console.log("connected to Database") )
.catch((err)=> console.log(err));

}