import express from 'express'
import { userAuth } from '../middleware/userAuth.js';
import { placeOrder, viewOrder } from '../controllers/orderRouter.js';

const orderRouter=express.Router();
orderRouter.post('/place',userAuth,placeOrder);
orderRouter.get('/view',userAuth,viewOrder);

export default orderRouter;