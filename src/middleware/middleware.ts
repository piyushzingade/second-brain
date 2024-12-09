import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../models/model";

const USER_JWT_SECRET = process.env.USER_JWT_SECRET; 

interface CustomRequest extends Request {
  user?: any; // Replace `any` with your User type
}

export const  userMiddleware = async(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) =>{
  try {
    const token = req.headers.token; // "Bearer <token>"
    console.log("token", token);
    if (!token) {
      res.status(401).json({
        msg: "No token provided, authorization denied",
      });
      return;
    }

    const decoded = jwt.verify(token as string, USER_JWT_SECRET as string) as JwtPayload;
    console.log(decoded);

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      res.status(404).json({
        msg: "User not found",
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    // console.log(error);
    res.status(401).json({
      msg: "Token is not valid",
    });
    return;
  }
}


