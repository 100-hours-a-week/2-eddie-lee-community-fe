import { viewDirname, rootDirname } from '../routes/index.js';
import fs from 'fs';

const postFilePath =
    'http://localhost:3000/public/dummyData/postDummyData.json';

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

export const viewModifyPost = async (req, res) => {
    res.sendFile(`${viewDirname}/modifyPost.html`);
};

//POST
export const getPostList = async (req, res) => {
    const offset = req.body.offset;
    console.log(offset);
    let postArr = [];
    const postList = await fetch(postFilePath)
        .then(res => res.json())
        .then(postList => {
            for (let i = 0; i < 10; i++) {
                postArr.push(postList[offset + i]);
            }
        })
        .catch(error => res.status(500).json({ message: '데이터 전송 실패' }));

    res.status(200).json(postArr);
};

export const editPost = async (req, res) => {
    const fileData = req.file;
    const postData = req.body;
    if (!fileData) {
        fileData = '';
    }
    const postObj = {
        //HACK
        user_id: 1,
        post_id: Date.now(),
        title: postData.title,
        content: postData.content,
        image: fileData,
        //HACK
        timeStamp: '2024-11-11 11:11:11',
        like: 0,
        view: 0,
        countComment: 0,
    };
    let originPostFile = await fetch(
        'http://localhost:3000/public/dummyData/postDummyData.json',
    )
        .then(res => res.json())
        .catch(error => console.error(`데이터 가져오기 실패: ${error}`));

    originPostFile.push(postObj);
    console.log(postObj);
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

//PATCH
export const modifyPost = async (req, res) => {
    res.json(req.body);
};
