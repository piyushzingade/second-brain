import  Express  from "express";
import connectDb from "./config/connectDB"
import userRoutes from "./routes/userRoutes"
import contentRoutes from "./routes/contentRoutes"
import  {authUser} from "./middlewares/authUser"
import { checkStatus, createLink,shareLink } from "./controllers/Link"
import cors from "cors"
import { createTag, getAllTag } from "./controllers/Tag"
const app=Express();
app.use(cors())
const PORT=3000;


app.use(Express.json())

app.get("/api/v1/tag",getAllTag);
app.get("/api/v1/brain/:shareLink",shareLink)
app.use("/api/v1",userRoutes);
app.use("/api/v1/",authUser,contentRoutes)
app.post("/api/v1/auth/create-tag", authUser, createTag);
app.post("/api/v1/status",checkStatus)
app.post("/api/v1/brain/share",authUser,createLink)



app.get("/",(req,res)=>{
   res.send("Hii there")
})


app.listen(PORT,()=>{
    connectDb();
    console.log("App is up and running")
})