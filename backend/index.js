import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth_routes.js'
import noteRouter from './routes/note_routes.js';

dotenv.config();

const app=express();


//To make input as json
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:["http://localhost:5173"],credentials:true}));     // or app.use(cors());

mongoose.connect(process.env.Mongo_url).then(()=>{
    console.log("Database is connected");
})
.catch((err)=>{
    console.log("Error in Databse",err);
});

const port=process.env.port || 3000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

//Import routes as middleware
app.use("/api/auth",authRouter)
app.use("/api/note",noteRouter)

//Error handling
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})