import express from "express";
import dotenv from 'dotenv';
dotenv.config({});
import connectDB from "./DataBase/db.js";
import cookieParser from "cookie-parser";
import userRoute from "./FormRoutes/userRoute.js";
import postRoute from "./FormRoutes/postRoute.js"
import cors from "cors"


const app = express();
const port = process.env.PORT || 8000;
const URI = process.env.MONGO_URL;

// middleware
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.use(cookieParser()); 
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


app.use("/pp/devcomp", userRoute); 
app.use("/pp/devcomp/post" , postRoute)

app.listen(port , (req , res)=>{      
    console.log('App is running at port', port);
    connectDB();
    
})