import { viewDirname } from '../routes/index.js';

//GET
export const viewUserInfo = async (req, res) => {
    res.sendFile(`${viewDirname}/profileModify.html`);
};
export const viewUserPasswd = async (req, res) => {
    res.sendFile(`${viewDirname}/passwdModify.html`);
};

export const viewModifyUser = async (req, res) => {
    res.sendfile(`${viewDirname}/profileModify.html`);
};

//PATCH
export const modifyUserInfo = async (req, res) => {};
export const modifyUserPasswd = async (req, res) => {};

//DELETE
export const deleteUser = async (req, res) => {};
