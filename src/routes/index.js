import express from 'express';
import * as userController from '../controllers/userController.js';
import * as viewControllers from '../controllers/viewController.js';
import multer from 'multer';
const upload = multer();

let router = express.Router();

router.get('/post', viewControllers.viewPostPage);
router.get('/user/signup', viewControllers.viewSignupPage);
router.get('/post/create_post', viewControllers.viewCreatePost);
router.post(
    '/user/signup',
    upload.single('profilePhoto'),
    userController.signup,
);
router.get('/post/modify-post', viewControllers.viewModifyPost);
router.get('/post/post-info', viewControllers.viewPostInfo);
router.get('/account/modify-user-info', viewControllers.viewModifyUserInfo);
//router.post('/user/signup', userController.signup);

export default router;
