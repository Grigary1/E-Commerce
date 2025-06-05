import express from 'express';
import { userAuth } from '../middleware/userAuth.js';
import { addToCart, updateCart, viewCart } from '../controllers/cartController.js';

const cartRouter=express.Router();
cartRouter.post('/cart/add',userAuth,addToCart);
cartRouter.get('/cart',userAuth,viewCart);
cartRouter.patch('/cart/update',userAuth,updateCart);


export default cartRouter;