import mongoose  from "mongoose"

const TagSchema=new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true
    }

})

const Tag=mongoose.model("Tag",TagSchema);

export default Tag;