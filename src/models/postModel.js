const pathToComments =
    'http://localhost:3000/public/dummyData/commentDummyData.json';
const pathToPosts = 'http://localhost:3000/public/dummyData/postDummyData.json';
//GET
export const getAllPostData = async (req, res) => {
    {
        try {
            const postsRes = await fetch(pathToPosts);
            const posts = await postsRes.json();
            res.status(200).json(posts);
        } catch (e) {
            res.status(404).json({
                result: '전체 게시글 데이터 가져오기 실패',
                message: e,
            });
        }
    }
};

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

export const getSpecificPostData = async (req, res) => {
    try {
        const postId = req.params.postId;
        const getPostData = await fetch(`http://localhost:3000/data/posts`);
        const postData = await getPostData.json();
        const specificPost = postData.find(post => post.post_id === postId);
        res.json(specificPost);
    } catch (e) {
        res.status(404).json({
            result: '게시물 정보 가져오기 실패',
            message: e,
        });
    }
};
