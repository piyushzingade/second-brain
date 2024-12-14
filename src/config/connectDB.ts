import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.MONGODB_URL || "mongodb://localhost:27017/brainly";

if (!URL) {
  throw new Error("MONGODB_URL is undefined. Please check your .env file.");
}

const connectDb = async (): Promise<void> => {
  await mongoose
    .connect(URL)
    .then(() => {
      console.log("Connection Established");
    })
    .catch((e) => {
      console.log("COnnection Failed", e);
    });
};

export default connectDb;
