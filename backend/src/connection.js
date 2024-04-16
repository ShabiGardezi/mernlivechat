 const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config({path:"../.env"});

module.exports=()=>{ mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( ()=> console.log("connected to Database") )
.catch((err)=> console.log(err));

}