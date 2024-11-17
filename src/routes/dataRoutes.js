import express from 'express';
import { viewDirname, rootDirname } from '../routes/index.js';
import * as postModel from '../models/postModel.js';
import multer from 'multer';
const postImg = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${rootDirname}/public/postPhotos`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: postImg });
const dataRouter = express.Router();

dataRouter.get('/posts', postModel.getAllPostData);
dataRouter.get('/posts/:postId', postModel.getSpecificPostData);
dataRouter.get('/posts/:postId/comments/:commentId', postModel.getComment);
dataRouter.get('/comments', postModel.getComments);

export default dataRouter;
