import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import  socialRoute from "./routes/social.route.js"
import cookieParser from "cookie-parser";
import path from "path";
const __dirname=path.resolve();

const app=express();
dotenv.config({});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/social", socialRoute);

app.use(express.static(path.join(__dirname,"/frontend/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
})
const PORT=3000;
app.listen(PORT,()=>{
    connectDB();
     console.log("Server is running");
});