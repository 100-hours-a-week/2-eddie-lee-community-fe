import express from 'express';
import * as postModel from '../models/postModel.js';
import * as userModel from '../models/userModel.js';
import multer from 'multer';
import config from '../../public/config.js';

const rootDirname = config.ROOT_DIRECTORY;
const viewDirname = `${rootDirname}/src/views`;
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

dataRouter.get('/users', userModel.getUsers);

export default dataRouter;
