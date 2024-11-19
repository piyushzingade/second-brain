
import express from 'express';
import { z } from 'zod';
import { User } from '../models/model';
import bcrypt from 'bcryptjs';

export const router = express.Router();

router.post('/signup', async (req, res) => {

  try {
    const schemaValidation = z.object({
      name: z.string().min(3).max(50),
      email: z.string().email(),
      password: z.string().min(6).max(50),
    });

    const parseData = schemaValidation.safeParse(req.body);
    if (!parseData.success) {
      res.status(411).json({ message: parseData.error.message });
      // throw new Error(parseData.error.message);
    }

    const { name, email, password } = req.body;
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      res.status(403).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password :hashedPassword });
  
    res.status(201).json({
      success: true,
      message: "User created successfully" ,
      user,
    });
  } catch (error :any) {
    res.status(411).json({ message: error });
    console.log("Error in signup", error.message);
  }


});

