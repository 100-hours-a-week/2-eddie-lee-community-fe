import config from '../../public/config.js';
import fs from 'fs';

const rootDirname = config.ROOT_DIRECTORY;
const viewDirname = `${rootDirname}/src/views`;

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
