import express from "express";
import { sigin, signUp } from "../controllers/Auth";

const router=express.Router();

router.post("/signup",signUp)
router.post("/signin",sigin)


export default router