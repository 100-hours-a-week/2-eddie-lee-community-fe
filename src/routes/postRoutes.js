import express from 'express';
import * as postController from '../controllers/postController.js';
import multer from 'multer';
const upload = multer();

let postRouter = express.Router();

postRouter.get('/', postController.viewPostPage);
postRouter.get('/edit', postController.viewCreatePost);

export default postRouter;
