import express from 'express';
import * as viewControllers from '../controllers/viewController.js';
import * as userController from '../controllers/userController.js';
import multer from 'multer';
import userRouter from './userRoutes.js';
const upload = multer();

let router = express.Router();

router.use('/user', userRouter);

router.get('/post', viewControllers.viewPostPage);

router.get('/post/create-post', viewControllers.viewCreatePost);
router.get('/post/modify-post', viewControllers.viewModifyPost);
router.get('/post/post-info', viewControllers.viewPostInfo);
router.get('/account/modify-user-info', viewControllers.viewModifyUserInfo);

export default router;
