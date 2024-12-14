import express from "express";
import { createLink, shareLink } from "../controllers/Link";


const router=express.Router();;


router.get("/:shareLink",shareLink)
router.post("/share",createLink)
// router.get("/:shareLink",shareLink)


export default router;