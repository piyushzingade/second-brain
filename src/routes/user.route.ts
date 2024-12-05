import express from 'express' ;
import { UserModel } from '../models/model';
import { JWT_PASSWORD } from '../config';
import jwt from 'jsonwebtoken'
export const userRouter = express.Router()
import z from "zod"
import bcrypt from 'bcryptjs'

userRouter.post("/signup", async (req, res) => {

  // TODO: zod validation , hash the password

    try {   
        const schemaValidation = z.object({
            username : z.string().min(3).max(20),
            password : z.string().min(6).max(20)
        })

        const paresData = schemaValidation.safeParse(req.body);
        if(!paresData.success) {
            res.json({
                message : "Error in " + paresData.error
            })
        }
        const username = req.body.username;
        const password = req.body.password;

        const alreadyUser = await UserModel.findOne({username})
        if(alreadyUser){
            res.json({message : "User already exits"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password , salt)
        await UserModel.create({
            username: username,
            password: hashPassword,
        });

        res.json({
            success : true,
            message: "User signed up",
        });
    } catch (e) {
        res.status(411).json({
        message: "User already exists",
        });
    }
});

userRouter.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await UserModel.findOne({
    username,
    password,
  });
  if (existingUser) {
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      JWT_PASSWORD
    );

    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrrect credentials",
    });
  }
});

userRouter.post("/login" , async (req ,  res)=>{
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error: any) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }

} )