import express from "express"
import { createContent, deleteContent, editContent, getAllContent } from "../controllers/Content";

const router=express.Router();


router.post("/content",createContent)
router.get("/content",getAllContent)
router.delete("/content",deleteContent)
router.put("/content",editContent)

export default router;