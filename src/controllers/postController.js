import env from '../../config/dotenv.js';
import fs from 'fs';
import path from 'path';

const rootDirname = env.ROOT_DIRECTORY;
const viewDirname = `${rootDirname}/src/views`;

const postFilePath = 'http://localhost:3000/data/posts';

//timestamp
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
//GET
export const viewPostPage = async (req, res) => {
    res.sendFile(`${viewDirname}/Posts.html`);
};

export const viewCreatePost = async (req, res) => {
    res.sendFile(`${viewDirname}/createPost.html`);
};

export const viewPostInfo = async (req, res) => {
    res.sendFile(`${viewDirname}/postInfo.html`);
};

export const viewModifyPost = async (req, res) => {
    res.sendFile(`${viewDirname}/modifyPost.html`);
};

export const resPostData = async (req, res) => {
    const postId = req.params.postId;

    console.log(postId);
    const postData = await fetch(postFilePath)
        .then(res => res.json())
        .then(getAllPost => {
            return getAllPost.find(post => post.post_id == postId);
        })
        .catch(error => console.error(error));

    res.status(200).json(postData);
};

export const getComments = async (req, res) => {
    let comments = [];
    const postId = req.params.postId;
    const postComments = await fetch(
        'http://localhost:3000/public/dummyData/commentDummyData.json',
    )
        .then(res => res.json())
        .then(allComments => {
            allComments.forEach(comment => {
                if (comment.post_id === postId) {
                    comments.push(comment);
                }
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({
                message: 'internal_server_error',
                data: null,
            });
        });

    res.status(200).json(comments);
};

export const getCommentData = async (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const response = await fetch(
        `http://localhost:3000/data/posts/${postId}/comments/${commentId}`,
    ).catch(error => res.json({ result: 'error occurred' }));
    const commentData = await response.json();

    res.json(commentData);
};

//POST
export const getPostList = async (req, res) => {
    const offset = req.body.offset;
    let postArr = [];
    const postList = await fetch(postFilePath)
        .then(res => res.json())
        .then(postList => {
            for (let i = 0; i < 10; i++) {
                if (offset + i > postList.length) {
                    return;
                }
                postArr.push(postList[offset + i]);
            }
        })
        .catch(error => res.status(500).json({ message: '데이터 전송 실패' }));

    res.status(200).json(postArr);
};

export const editPost = async (req, res) => {
    let fileData = req.file;
    const postData = req.body;
    const time = Date.now();
    const timestamp = formatTimestamp(time);
    if (!fileData) {
        fileData = '/public/userPhotos/defaultPostImg.png';
    } else {
        const filePath = `/public/userPhotos/${req.file.filename}`;
        fileData = filePath;
    }

    const getUserData = await fetch(
        'http://localhost:3000/public/dummyData/userDummyData.json',
    ).then(res => res.json());

    const user = getUserData.find(
        findUser => findUser.user_id == postData.userId,
    );
    const postObj = {
        user_id: postData.userId,
        post_id: Date.now().toString(),
        profile_img: user.profile_img,
        nickname: user.nickname,
        title: postData.title,
        content: postData.content,
        image: fileData,
        timestamp: timestamp,
        like: 0,
        view: 0,
        comment_count: 0,
    };
    let originPostFile = await fetch(
        'http://localhost:3000/public/dummyData/postDummyData.json',
    )
        .then(res => res.json())
        .catch(error => console.error(`데이터 가져오기 실패: ${error}`));

    originPostFile.push(postObj);
    try {
        fs.writeFileSync(
            `${rootDirname}/public/dummyData/postDummyData.json`,
            JSON.stringify(originPostFile),
        );
        res.status(200).send('데이터 추가 완료');
    } catch (error) {
        res.status(500).send('데이터 추가 실패');
    }
};

export const editComment = async (req, res) => {
    const userId = req.body.userId;
    const comment = req.body.comment;
    const postId = req.params.postId;
    const user = await fetch(
        'http://localhost:3000/public/dummyData/userDummyData.json',
    )
        .then(res => res.json())
        .then(users => {
            const user = users.find(user => user.user_id === userId);
            return user;
        })
        .catch(error => console.error(`데이터 가져오기 에러${error}`));
    const newComment = {
        user_id: userId,
        profile_img: user.profile_img,
        nickname: user.nickname,
        post_id: postId,
        comment_id: Date.now().toString(),
        timestamp: formatTimestamp(Date.now()),
        comment_content: comment,
    };
    let originCommentFile = await fetch(
        'http://localhost:3000/public/dummyData/commentDummyData.json',
    )
        .then(res => res.json())
        .catch(error => console.error(`데이터 가져오기 실패: ${error}`));

    originCommentFile.push(newComment);
    try {
        fs.writeFileSync(
            `${rootDirname}/public/dummyData/commentDummyData.json`,
            JSON.stringify(originCommentFile),
        );
        //댓글 개수 증가
        await fetch(`http://localhost:3000/posts/${postId}/comment`, {
            method: 'PATCH',
            body: JSON.stringify({ addOrReduce: 'add' }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(async res => {
                const statusCode = res.status;
                const resData = await res.json();
                if (res.ok) {
                    console.log(`status code: ${statusCode}, data: ${resData}`);
                } else {
                    console.error(
                        `status code: ${statusCode}, data: ${resData}`,
                    );
                }
            })
            .catch(err => console.error(err));
        res.status(200).json({
            message: 'Data add complete',
            data: newComment,
        });
    } catch (error) {
        res.status(500).send('데이터 추가 실패');
    }
};

//PATCH
export const modifyPost = async (req, res) => {
    const postId = req.params.postId;
    const reqPostData = req.body;
    let postImg = req.file;

    if (!postImg) {
        postImg = '/public/postPhotos/defaultPostImg.png';
    } else {
        const filePath = `/public/postPhoto/${req.file.filename}`;
        postImg = filePath;
    }

    let posts = [];
    try {
        const reqData = await fetch(`http://localhost:3000/data/posts`);
        posts = await reqData.json();
    } catch (err) {
        console.error(`데이터 가져오기 실패, 에러메시지 : ${err}`);
    }
    try {
        const updatePosts = posts.map(post =>
            post.post_id === postId
                ? {
                      ...post,
                      title: reqPostData.title,
                      content: reqPostData.content,
                      image: postImg,
                  }
                : post,
        );

        fs.writeFileSync(
            `${rootDirname}/public/dummyData/postDummyData.json`,
            JSON.stringify(updatePosts, null, 2),
            'utf8',
        );
        res.status(200).json({
            message: 'Data modify complete',
            data: req.body,
        });
    } catch (err) {
        console.error(err);
        res.status(404).json({ result: '게시글 수정 실패', message: err });
    }
};

export const modifyComment = async (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const commentData = await fetch(
        `http://localhost:3000/data/comments`,
    ).catch(error => console.error(error));
    const comments = await commentData.json();
    const updateComments = comments.map(comment =>
        comment.post_id === postId && comment.comment_id === commentId
            ? { ...comment, comment_content: req.body.comment_content }
            : comment,
    );
    try {
        fs.writeFileSync(
            `${rootDirname}/public/dummyData/commentDummyData.json`,
            JSON.stringify(updateComments),
            'utf8',
        );
        res.status(200).json({
            message: 'Data modify complete',
            data: req.body,
        });
    } catch (error) {
        res.status(500).json({ message: 'data modify Failed...' });
    }
};

export const updateView = async (req, res) => {
    const postId = req.params.postId;
    let error = '';
    try {
        const updatePosts = await fetch(`http://localhost:3000/data/posts`)
            .then(res => res.json())
            .then(posts => {
                const modifyPosts = posts.map(post =>
                    post.post_id === postId
                        ? { ...post, view: ++post.view }
                        : post,
                );

                return modifyPosts;
            })
            .catch(err => {
                console.error(err);
                error = {
                    result: 'Get all post failed..',
                    message: err.message,
                };
            });

        try {
            fs.writeFileSync(
                `${rootDirname}/public/dummyData/postDummyData.json`,
                JSON.stringify(updatePosts),
                'utf8',
            );
        } catch (err) {
            throw new Error(`File write err: ${err.message}`);
        }

        res.status(200).json({ result: 'Update view complete', message: null });
    } catch (err) {
        res.status(404).json({
            result: 'Update view failed..',
            message: err.message,
        });
    }
};

export const updateCommentCount = async (req, res) => {
    const postId = req.params.postId;
    const { addOrReduce } = req.body;
    const posts = await fetch('http://localhost:3000/data/posts')
        .then(async res => {
            const data = await res.json();
            let updateCommentCounts;
            if (res.ok) {
                switch (addOrReduce) {
                    case 'add':
                        updateCommentCounts = data.map(post =>
                            post.post_id === postId
                                ? {
                                      ...post,
                                      comment_count: ++post.comment_count,
                                  }
                                : post,
                        );
                        break;
                    case 'reduce':
                        updateCommentCounts = data.map(post =>
                            post.post_id === postId
                                ? {
                                      ...post,
                                      comment_count: --post.comment_count,
                                  }
                                : post,
                        );
                        break;
                    default:
                        res.status(404).json({
                            result: 'update comment count failed..',
                            message: 'add or reduce failed..',
                        });
                        break;
                }
                return updateCommentCounts;
            }
        })
        .catch(error => console.error(error));

    try {
        fs.writeFileSync(
            `${rootDirname}/public/dummyData/postDummyData.json`,
            JSON.stringify(posts),
            'utf8',
        );
        res.status(200).json({
            result: 'update comment count success',
            message: null,
        });
    } catch (err) {
        res.status(404).json({
            result: 'update comment count failed..',
            message: err,
        });
    }
};

export const updateLike = async (req, res) => {
    const postId = req.params.postId;
    try {
        const updatePosts = await fetch(`http://localhost:3000/data/posts`)
            .then(res => res.json())
            .then(posts => {
                const modifyPosts = posts.map(post =>
                    post.post_id === postId
                        ? { ...post, like: ++post.like }
                        : post,
                );

                return modifyPosts;
            })
            .catch(err => {
                console.error(err);
                error = {
                    result: 'Get all post failed..',
                    message: err.message,
                };
            });

        try {
            fs.writeFileSync(
                `${rootDirname}/public/dummyData/postDummyData.json`,
                JSON.stringify(updatePosts),
                'utf8',
            );
        } catch (err) {
            throw new Error(`File write err: ${err.message}`);
        }

        res.status(200).json({ result: 'Update view complete', message: null });
    } catch (err) {
        res.status(404).json({
            result: 'Update view failed..',
            message: err.message,
        });
    }
};

//DELETE
export const deletePost = async (req, res) => {
    const postId = req.params.postId;
    const posts = await fetch('http://localhost:3000/data/posts')
        .then(res => res.json())
        .catch(error => console.error(error));
    const deletePosts = posts.filter(post => post.post_id != postId);

    try {
        fs.writeFileSync(
            `${rootDirname}/public/dummyData/postDummyData.json`,
            JSON.stringify(deletePosts),
            'utf8',
        );
        res.status(200).json({ result: '게시물 삭제 성공', message: null });
    } catch (error) {
        res.status(404).json({ result: '게시물 삭제 실패', message: error });
    }
};

export const deleteComment = async (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const commentData = await fetch(
        'http://localhost:3000/data/comments',
    ).catch(error => console.error(error));
    const comments = await commentData.json();
    const deleteComments = comments.filter(
        comment => comment.comment_id != commentId || comment.post_id != postId,
    );
    try {
        fs.writeFileSync(
            `${rootDirname}/public/dummyData/commentDummyData.json`,
            JSON.stringify(deleteComments),
        );
        //댓글 개수 감소
        await fetch(`http://localhost:3000/posts/${postId}/comment`, {
            method: 'PATCH',
            body: JSON.stringify({ addOrReduce: 'reduce' }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(async res => {
                const statusCode = res.status;
                const resData = await res.json();
                if (res.ok) {
                    console.log(`status code: ${statusCode}, data: ${resData}`);
                } else {
                    console.error(
                        `status code: ${statusCode}, data: ${resData}`,
                    );
                }
            })
            .catch(err => console.error(err));
        res.status(200).json({
            message: 'Data delete complete',
            data: req.body,
        });
    } catch (error) {
        res.status(500).json({ message: 'data delete Failed...' });
    }
};
