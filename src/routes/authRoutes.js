import express from 'express';
import * as authController from '../controllers/authController.js';

const authRouter = express.Router();

//GET
authRouter.get('/login', authController.viewLogin);
authRouter.get('/signup', authController.viewSignup);

export default authRouter;
