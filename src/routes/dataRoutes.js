import express from 'express';
import { viewDirname, rootDirname } from '../routes/index.js';
import * as postModel from '../models/postModel.js';
import multer from 'multer';
const userProfileImg = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${rootDirname}/public/userPhotos`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const dataRouter = express.Router();

dataRouter.get('/users', postModel.getPostData);
dataRouter.get('/posts/:postId/comments/:commentId', postModel.getComment);
dataRouter.get('/comments', postModel.getComments);

export default dataRouter;
