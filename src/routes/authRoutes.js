import express from 'express';
import * as authController from '../controllers/authController.js';
import multer from 'multer';

let upload = multer();

let authRouter = express.Router();

//GET
authRouter.get('/login', authController.viewLogin);
authRouter.get('/signup', authController.viewSignup);

//POST
authRouter.post('/login', upload.none(), authController.login);
authRouter.post(
    '/signup',
    upload.single('profilePhoto'),
    authController.signup,
);

export default authRouter;
