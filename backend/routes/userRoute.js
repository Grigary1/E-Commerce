import express from 'express';

import {adminLogin,loginUser,registerUser} from './../controllers/userController'

const userRouter=express.Router();