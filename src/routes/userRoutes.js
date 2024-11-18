import express from 'express';
import { rootDirname } from '../routes/index.js';
import * as userController from '../controllers/userController.js';
import multer from 'multer';
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
userRouter.get('/:userId/user', userController.viewModifyUser);
userRouter.get('/:userId/passwd', userController.viewUserPasswd);
userRouter.get('/data', userController.getUserData);

//PATCH
userRouter.patch(
    '/:userId/user',
    upload.single('profileImg'),
    userController.modifyUser,
);
userRouter.patch('/:userId/passwd', userController.modifyUserPasswd);

//DELETE
userRouter.delete('/:userId/user', userController.deleteUser);

export default userRouter;
