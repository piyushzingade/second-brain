import express from 'express'
import dotenv from 'dotenv'
import { connectToDB } from './db';
import { router } from './routes/route';

dotenv.config()
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/v1" , router)


app.listen(PORT , ()=>{
    console.log('Server is running on port 3000')
    connectToDB();
})