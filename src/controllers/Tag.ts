import Tag from "../models/Tag.model";
import { AuthenticatedRequest } from "../types/types";
import { Response,Request } from "express";



export  const createTag=async(req:AuthenticatedRequest,res:Response):Promise<void>=>{

    try{

        const {title}=req.body;
       const tag= await Tag.create({title});


      res.json({
        success:true,
        message:"Tag created",
        data:tag
      });

    }catch(err){

    }

}

export const getAllTag=async(req:Request,res:Response):Promise<void>=>{
    try{



        const tags=await Tag.find({});

        res.json({
            success:true,
            tags:tags
        })
    }catch(err){

    }
}