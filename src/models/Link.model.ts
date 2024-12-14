import mongoose from "mongoose";



const LinkSchema=new mongoose.Schema({
    hash:{
        type:String,
        required:true
    },

    userId:{
     
            type: mongoose.Types.ObjectId,
            ref: "User",
            required:true,
            unique:true
          
    },
    live:{
       type: String,
       default:"false"
    }
})

export const Link=mongoose.model("Link",LinkSchema);