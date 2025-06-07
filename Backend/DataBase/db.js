import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      console.error("MONGO_URL environment variable is not set!");
      process.exit(1);
    }
    console.log("Connecting to MongoDB with URL:", process.env.MONGO_URL); // Debug log
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Database Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if DB connection fails
  }
};

export default connectDB;








// import mongoose from "mongoose";

// const connectDB = async () =>{
//     try {
//         await mongoose.connect(process.env.MONGO_URL ); 
//         console.log("Connected to Database Successfully ")
//     } 
//     catch (error) {
//         console.log(error);
        
//     }
// }

// export default connectDB;