import express from 'express';
import * as postController from '../controllers/postController.js';
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

const postRouter = express.Router();
//GET
postRouter.get('/', postController.viewPostPage);
postRouter.get('/edit', postController.viewCreatePost);
postRouter.get('/:postId/info', postController.viewPostInfo);
postRouter.get('/:postId', postController.viewModifyPost);

export default postRouter;
