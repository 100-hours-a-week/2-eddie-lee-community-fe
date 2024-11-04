import express from 'express';
import * as userController from '../controllers/userController.js';
import * as viewControllers from '../controllers/viewController.js';

let userRouter = express.Router();

userRouter.post('/user/signup', userController.signup);
userRouter.get('/user/signup', viewControllers.viewSignupPage);

export default userRouter;
