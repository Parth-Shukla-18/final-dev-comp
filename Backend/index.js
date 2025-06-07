import express from "express";
import dotenv from "dotenv";
dotenv.config({});
import connectDB from "./DataBase/db.js";
import cookieParser from "cookie-parser";
import userRoute from "./FormRoutes/userRoute.js";
import postRoute from "./FormRoutes/postRoute.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000;
const URI = process.env.MONGO_URL;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://devcomponent-flame.vercel.app",
      "http://localhost:5173"
    ],
    credentials: true,
  })
);

app.use("/pp/devcomp", userRoute);
app.use("/pp/devcomp/post", postRoute);

// Add GET handler for /pp/devcomp/login to clarify usage
app.get('/pp/devcomp/login', (req, res) => {
  res.status(405).send('Use POST method to login.');
});

// Add root and favicon routes to prevent 404s on backend
app.get('/', (req, res) => {
  res.send('Backend API is running');
});

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

app.listen(port, (req, res) => {
  console.log("App is running at port", port);
  connectDB();
});