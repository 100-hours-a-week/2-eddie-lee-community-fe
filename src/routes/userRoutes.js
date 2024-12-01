import express from 'express';
import * as userController from '../controllers/userController.js';

const userRouter = express.Router();

//GET
userRouter.get('/', userController.viewModifyUser);
userRouter.get('/passwd', userController.viewUserPasswd);

export default userRouter;
