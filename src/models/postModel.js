const pathToComments =
    'http://localhost:3000/public/dummyData/commentDummyData.json';
const pathToPosts = 'http://localhost:3000/public/dummyData/postDummyData.json';

export const getPostData = async () => {};

export const getComment = async (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    console.log(`${postId}, ${commentId}`);
    const commentData = await fetch(pathToComments);
    const comments = await commentData.json();
    const comment = comments.find(
        comment => comment.comment_id == commentId && comment.post_id == postId,
    );
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).json({
            result: 'Not Found',
            message: 'Comment not found',
        });
    }
};

export const getComments = async (req, res) => {
    const commentData = await fetch(pathToComments);
    const comments = await commentData.json();

    if (comments) {
        res.status(200).json(comments);
    } else {
        res.status(404).json({
            result: 'Not Found',
            message: "Can't get comments",
        });
    }
};
