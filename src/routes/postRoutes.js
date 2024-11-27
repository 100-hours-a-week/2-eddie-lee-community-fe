import express from 'express';
import * as postController from '../controllers/postController.js';

const postRouter = express.Router();
//GET
postRouter.get('/', postController.viewPostPage);
postRouter.get('/edit', postController.viewCreatePost);
postRouter.get('/:postId/info', postController.viewPostInfo);
postRouter.get('/:postId', postController.viewModifyPost);

export default postRouter;
