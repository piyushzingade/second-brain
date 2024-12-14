import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["image", "video", "article", "music","youtube","twitter","link"],
      required: true,
    },
    description:{
       type:String
    },
    tags: [
     { type: mongoose.Types.ObjectId,
      ref: "Tag",}
    ],
    link: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required:true
    },
  },
  { timestamps: true }
);



export const Content=mongoose.model("Content",ContentSchema);