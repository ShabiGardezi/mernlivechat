const mongoose = require('mongoose');


module.exports=()=>{ mongoose.connect('mongodb+srv://hunfa:123@cluster0.z2kbwem.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( ()=> console.log("connected to Database") )
.catch((err)=> console.log(err));

}