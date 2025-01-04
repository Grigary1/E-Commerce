import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

//App config
const app=express();
const PORT=process.env.PORT||3000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.get('/',(req,res)=>{
    res.send("API WORKING");
})



app.listen(PORT,()=>{
    console.log(`Running on port ${PORT}`);
})