import {z} from "zod"
import { Request,Response } from "express"
import bcrypt from "bcrypt"
import User from "../models/User.model"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();



const reqbody=z.object({
   email:z.string(),
   password:z.string().min(6, { message: "Password must be at least 8 characters long." })
   .max(32, { message: "Password must not exceed 32 characters." })
   .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
   .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
   .regex(/[0-9]/, { message: "Password must contain at least one number." })
   .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character." })
 
})
   

export const signUp = async(req:Request,res:Response):Promise<void>=>{
     try{
      
         const parseData=reqbody.safeParse(req.body)
         // console.log("zod verification ",parseData)
         if(!parseData.success){
          
            res.status(400).json({
               success:false,
                message:parseData.error.errors[0].message
            })
            return
        }
         

      
         const {email,password}=req.body;
       

         const existingUser=await User.findOne({email});
         // console.log(existingUser)
         if(existingUser){
           res.status(400).json({
               success:false,
               message:"User already Exist "
            })
            return
         }
         const hashedPassword=await bcrypt.hash(password,5);
         const user=await User.create({email,password:hashedPassword})

          res.status(200).json({
            success:true,
            user,
            message:"User Registered"
          })
      

     }catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "User cannot be registered. Please try again.",
          error:error
        });
      }
}


export const sigin=async(req:Request,res:Response):Promise<void>=>{
   try{
      const {email,password}=req.body;
      const existingUser=await User.findOne({email});

      if(!existingUser){
        res.status(400).json({
            success:false,
            message:"User does not exist ,Sign up to continue "
         })
         return
      }

      const parseData=reqbody.safeParse(req.body)

      if(!parseData.success)
      {
         res.status(400).json({
             success:false,
             errors:parseData.error.errors[0].message
         })

         return 
      }


      if (!existingUser.password) {
          res.status(400).json({
           success: false,
           message: "Password is not set for this user.",
         });

         return
       }
    

      const isCorrect=await bcrypt.compare(password,existingUser.password);

      if(!isCorrect){
         res.status(400).json({
            success:false,
            message:"Incorrect Password"
         })
         return
      }
    const JWT_SECRET=process.env.JWT_SECRET || "secret"
    if(!JWT_SECRET) return
    const token= jwt.sign({id:existingUser._id.toString()},JWT_SECRET);
  
    res.status(200).json({
      success:true,
      message:"User logged in",
      token:token
    })
   }catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
       
        error:error
      });
    }
}