import express from 'express';
import * as userController from '../controllers/userController.js';
import multer from 'multer';
import env from '../../config/dotenv.js';
import fs from 'fs';
import path from 'path';

const rootDirname = env.ROOT_DIRECTORY;
const userProfileImg = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${rootDirname}/public/userPhotos`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: userProfileImg });

const userRouter = express.Router();

//GET
userRouter.get('/', userController.viewModifyUser);
userRouter.get('/passwd', userController.viewUserPasswd);
userRouter.get('/data', userController.getUserData);

//PATCH
userRouter.patch(
    '/user',
    upload.single('profileImg'),
    userController.modifyUser,
);
userRouter.patch('/passwd', upload.none(), userController.modifyUserPasswd);

//DELETE
userRouter.delete('/user', userController.deleteUser);

export default userRouter;
