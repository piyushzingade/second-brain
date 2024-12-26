import { AuthenticatedRequest } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { Response } from "express";
import { Link } from "../models/Link.model";
import { Content } from "../models/Content.model";


export const createLink = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const existingLink = await Link.findOne({
      userId: req.userId,
    });

    if (existingLink) {
      res.json({
        hash: existingLink.hash,
      });
      return;
    }
    const randomUUID = uuidv4();
    console.log(randomUUID);

    await Link.create({
      hash: randomUUID,
      userId: req.userId,
      live: "true",
    });

    res.json({
      hash: randomUUID,
      user: req.userId,
    });
  } catch (err) {}
};

export const shareLink = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    console.log(req.params);

    const hash = req.params.shareLink;
    console.log("hash", hash);

    const link = await Link.findOne({ hash: hash });
    console.log("Link", link);
    if (!link) {
      res.status(411).json({
        message: "Sorry incorrect input",
      });
      return;
    }

    const content = await Content.find({
      userId: link?.userId,
    }).populate("userId","email").populate("tags");

    res.json({
      content,
      
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
};

export const checkStatus = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;

    console.log("From Chechk status");

    if (req.body.unLive) {
      const link = await Link.findOneAndDelete(
        { userId: userId },       
                
      );

      res.json({
        link
      })
      return 
    }else{
    const link = await Link.find({
      userId: userId,
    });

    if (!link) {
      res.json({
        message: "link not found",
      });
      return;
    }

    res.json({
      message: "link found",
      link,
    });
  }

    return;
   
  } catch (err) {
    res.json({
      message: err,
    });
  }
};
