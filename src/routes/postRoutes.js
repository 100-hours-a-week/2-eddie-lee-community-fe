import express from 'express';
import * as postController from '../controllers/postController.js';
import multer from 'multer';
const upload = multer();

let postRouter = express.Router();
//GET
postRouter.get('/', postController.viewPostPage);
postRouter.get('/edit', postController.viewCreatePost);
postRouter.get('/:postId/info', postController.viewPostInfo);
postRouter.get('/:postId', postController.viewModifyPost);

//POST

postRouter.post('/', postController.getPostList);

//PATCH
postRouter.patch(
    '/:postId',
    upload.single('inputImg'),
    postController.modifyPost,
);

export default postRouter;
