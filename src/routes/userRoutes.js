import express from 'express';
import * as userController from '../controllers/userController.js';
import multer from 'multer';
const upload = multer();

let userRouter = express.Router();

//GET
userRouter.get('/:userId/user', userController.viewUserInfo);
userRouter.get('/:userId/passwd', userController.viewUserPasswd);
userRouter.get('/users/1/user', userController.viewModifyUser);

//PATCH
userRouter.patch('/:userId/info', userController.modifyUserInfo);
userRouter.patch('/:userId/passwd', userController.modifyUserPasswd);

//DELETE
userRouter.delete('/:userId/user', userController.deleteUser);

export default userRouter;
