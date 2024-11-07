import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viewDirname = path.join(__dirname, '../views');

export const viewPostPage = async (req, res) => {
    res.sendFile(path.join(viewDirname, '/Posts.html'));
};

export const viewCreatePost = async (req, res) => {
    res.sendFile(path.join(viewDirname, '/createPost.html'));
};

export const viewModifyPost = async (req, res) => {
    res.sendFile(path.join(viewDirname, '/modifyPost.html'));
};

export const viewPostInfo = async (req, res) => {
    res.sendFile(path.join(viewDirname, '/postInfo.html'));
};

export const viewModifyUserInfo = async (req, res) => {
    res.sendFile(path.join(viewDirname, '/profileModify.html'));
};
