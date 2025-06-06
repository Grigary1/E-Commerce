import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';

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
app.use('/api',cartRouter)
app.use('/api/orders',orderRouter);
//api endpoints
app.get('/',(req,res)=>{
    res.send("API WORKING");
})



app.listen(PORT,()=>{
    console.log(`Running on port ${PORT}`);
})