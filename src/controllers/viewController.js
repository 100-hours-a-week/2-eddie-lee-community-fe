import { viewDirname } from '../routes/index.js';

export const viewModifyPost = async (req, res) => {
    res.sendFile(path.join(viewDirname, '/modifyPost.html'));
};

export const viewPostInfo = async (req, res) => {
    res.sendFile(path.join(viewDirname, '/postInfo.html'));
};

export const viewModifyUserInfo = async (req, res) => {
    res.sendFile(path.join(viewDirname, '/profileModify.html'));
};
