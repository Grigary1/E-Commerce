import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';

//App config
const app=express();
const PORT=process.env.PORT||3000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user',userRouter);
app.use('/api/product',productRouter);

//api endpoints
app.get('/',(req,res)=>{
    res.send("API WORKING");
})



app.listen(PORT,()=>{
    console.log(`Running on port ${PORT}`);
})