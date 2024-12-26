
import jwt from "jsonwebtoken"
import { Response } from "express";
import  {AuthenticatedRequest}  from "../types/types";
import { NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();


export const  authUser = async (req:AuthenticatedRequest,res:Response,next:NextFunction):Promise<void> =>{
    try{
        const token=req.headers.token;
        // console.log("In middlwware")
        if (!token || Array.isArray(token)) {
             res.status(400).json({
              success: false,
              message: "Token is missing or invalid",
            });
            return 
          }
          const JWT_SECRET=process.env.JWT_SECRET || "secret"
          if(!JWT_SECRET) return
          const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
          // console.log(decoded)

          if (decoded) {
            req.userId = decoded.id; 
            next()
          }
         else{
            res.status(403).json({
                message: "Invalid Token"
            })
         }
      

    }catch(error){
          res.json({
            message:"Error during Token verification",
            error:error
          })
    }
}

