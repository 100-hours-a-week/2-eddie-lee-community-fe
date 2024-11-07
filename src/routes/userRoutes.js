import express from 'express';
import * as userController from '../controllers/userController.js';
import multer from 'multer';
const upload = multer();

let userRouter = express.Router();

userRouter.post(
    '/signup',
    upload.single('profilePhoto'),
    userController.signup,
);
userRouter.get('/signup', userController.viewSignupPage);

export default userRouter;
