import express from 'express';
import * as postController from '../controllers/postController.js';
import { rootDirname } from '../routes/index.js';
import multer from 'multer';
const userProfileImg = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${rootDirname}/public/userPhotos`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: userProfileImg });

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

//DELETE
postRouter.delete('/:postId/comments/:commentId', postController.deleteComment);
export default postRouter;
