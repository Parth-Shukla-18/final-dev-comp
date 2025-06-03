import express from "express";
import dotenv from 'dotenv';
import connectDB from "./DataBase/db.js";
import cookieParser from "cookie-parser";
import userRoute from "./FormRoutes/userRoute.js";
import postRoute from "./FormRoutes/postRoute.js"
import cors from "cors"

dotenv.config({});
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/pp/devcomp", userRoute);
app.use("/pp/devcomp/post", postRoute);

export default app;