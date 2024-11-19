import { model, Schema, Types } from "mongoose";


export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: Date,
  updatedAt: Date,
});

export const User = model("User", UserSchema);

// Content Schema

const contentTypes = ["image", "video", "article", "audio"]; // Extend as needed

const contentSchema = new Schema({
  link: {
    type: String,
    required: true,
  },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: Types.ObjectId, ref: "Tag" }],
  userId: { type: Types.ObjectId, ref: "User", required: true },
});

export const Content = model("Content", contentSchema);

// Tags Schema

export const TagSchema = new Schema({
  title: { type: String, required: true },
});

export const Tag = model("Tag", TagSchema);

// Link Schema

export const LinkSchema = new Schema({
    hash : {
        type : String,
        required : true
    },
    userId : {
        type : Types.ObjectId,
        ref : "User",
        required : true
    },
})

export const Link = model("Link", LinkSchema);