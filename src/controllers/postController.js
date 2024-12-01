import { __dirname } from '../../app.js';

//GET
export const viewPostPage = async (req, res) => {
    res.sendFile(`${__dirname}/src/views/Posts.html`);
};

export const viewCreatePost = async (req, res) => {
    res.sendFile(`${__dirname}/src/views/createPost.html`);
};

export const viewPostInfo = async (req, res) => {
    res.sendFile(`${__dirname}/src/views/postInfo.html`);
};

export const viewModifyPost = async (req, res) => {
    res.sendFile(`${__dirname}/src/views/modifyPost.html`);
};
