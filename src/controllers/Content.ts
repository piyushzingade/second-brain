
import { Response } from "express";
import { AuthenticatedRequest } from "../types/types";
import { Content } from "../models/Content.model";

export const createContent = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { link, title, type,description,tags } = req.body;

    if(!link ||!type||!title||!description||!tags){
      res.status(400).json({
     success:false,
     message:"All fields are required"
      })
      return 
    }
    
    await Content.create({
      link,
      type,
      title: title,
      description,
      userId: req.userId,
      tags,
    });

    
   const content =await Content.find({userId:req.userId}).sort({ createdAt: -1 })
    res.status(200).json({
      message: "Content added",
      user: req.userId,
      userContent:content
    });
  } catch (error) {
    res.status(400).json({
      success:false,
      error:error
    })
  }
};

export const getAllContent = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;
    const content = await Content.find({
      userId: userId,
    },
    
  ).populate("userId", ["email"]).sort({ createdAt: -1 }).populate("tags");

    res.status(200).json({
      content,
    });
  } catch (err) {
    res.status(400).json({
      success:false,
    error:err
    })
  }
};

export const deleteContent = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const contentId = req.body.contentId;

    console.log({"conetentID":contentId,
        "UserID":req.userId
    });

    await Content.deleteMany({
     _id: contentId,
      userId: req.userId,
    });

    res.status(200).json({
        message: "Deleted"
    })
  } catch (err) {
    res.status(500).json({
      success:false,
      message:err
    })
  }
};



export const editContent=async(
  req:AuthenticatedRequest,
  res:Response
):Promise<void>=>{
  try{

    const {link, title, type,description,tags,id}=req.body;

    if(!link ||!type||!title||!description||!tags||!id){
      res.status(400).json({
     success:false,
     message:"All fields are required"
      })
      return 
    }
    

    const content=await Content.findOneAndUpdate({_id:id},{
      title,tags,type,description,link
    },{new:true});

    res.status(200).json({
      success:true,
      updated_Content:content
    })

  }catch(err)
  {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the content.",
      error: err,
    });
  }
}