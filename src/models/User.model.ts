import mongoose from "mongoose";



const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        
    }
})

// module.exports=mongoose.model("User",UserSchema)

 const User=mongoose.model("User",UserSchema)

 export default User