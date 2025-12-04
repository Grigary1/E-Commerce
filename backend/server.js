import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';
import { downloadInvoice } from './controllers/productController.js';

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
// app.get('/api/invoices/download',downloadInvoice);
//api endpoints
app.get('/',(req,res)=>{
    res.send("API WORKING");
})



app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Backend on 192.168.1.4:${PORT}`);
})