import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as guestController from '../controllers/guestController.js';
import multer from 'multer';
import userRouter from './userRoutes.js';
import postRouter from './postRoutes.js';

const upload = multer();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const viewDirname = path.join(__dirname, '../views');

let router = express.Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);

//GET
router.get('/', guestController.viewLogin);
router.get('/signup', guestController.viewSignup);

//POST
router.post('/login', upload.none(), guestController.login);
router.post('/signup', upload.single('profilePhoto'), guestController.signup);

export default router;
