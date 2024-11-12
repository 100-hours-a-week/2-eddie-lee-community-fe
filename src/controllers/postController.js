import { viewDirname, rootDirname } from '../routes/index.js';
import fs from 'fs';

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

//POST
export const getPostList = async (req, res) => {
    const offset = req.body.offset;
    console.log(offset);
    let postArr = [];
    const postList = await fetch(
        'http://localhost:3000/public/dummyData/postDummyData.json',
    )
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
