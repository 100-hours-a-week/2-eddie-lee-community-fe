import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import userRouter from './userRoutes.js';
import postRouter from './postRoutes.js';
import authRouter from './authRoutes.js';
import dataRouter from './dataRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const viewDirname = path.join(__dirname, '../views');
export const rootDirname = path.join(__dirname, '../../');

let router = express.Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/auth', authRouter);
router.use('/data', dataRouter);

export default router;
