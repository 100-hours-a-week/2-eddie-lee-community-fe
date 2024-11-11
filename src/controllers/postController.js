import { viewDirname, rootDirname } from '../routes/index.js';

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

//PATCH
export const modifyPost = async (req, res) => {
    res.json(req.body);
};
