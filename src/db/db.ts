import mongoose, { model, Schema } from "mongoose";


export async function connectDB() {
   await mongoose.connect("mongodb://localhost:27017/brainly");
   console.log("DB connected")
}

