import express from 'express';
import * as postController from '../controllers/postController.js';
import multer from 'multer';
import env from '../../config/dotenv.js';
import fs from 'fs';
import path from 'path';

const rootDirname = env.ROOT_DIRECTORY;
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

let postRouter = express.Router();
//GET
postRouter.get('/', postController.viewPostPage);
postRouter.get('/edit', postController.viewCreatePost);
postRouter.get('/:postId/info', postController.viewPostInfo);
postRouter.get('/:postId/data', postController.resPostData);
postRouter.get('/:postId/comments', postController.getComments);
postRouter.get('/:postId', postController.viewModifyPost);
postRouter.get('/:postId/comments/:commentId', postController.getCommentData);

//POST

postRouter.post('/', postController.getPostList);
postRouter.post('/edit', upload.single('inputImg'), postController.editPost);
postRouter.post('/:postId/comment', postController.editComment);

//PATCH
postRouter.patch(
    '/:postId',
    upload.single('inputImg'),
    postController.modifyPost,
);
postRouter.patch('/:postId/comments/:commentId', postController.modifyComment);
postRouter.patch('/:postId/view', postController.updateView);
postRouter.patch('/:postId/comment', postController.updateCommentCount);
postRouter.patch('/:postId/like', postController.updateLike);

//DELETE
postRouter.delete('/:postId', postController.deletePost);
postRouter.delete('/:postId/comments/:commentId', postController.deleteComment);
export default postRouter;
