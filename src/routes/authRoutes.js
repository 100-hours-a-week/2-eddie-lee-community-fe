import express from 'express';
import { viewDirname, rootDirname } from '../routes/index.js';
import * as authController from '../controllers/authController.js';
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
