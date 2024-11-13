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

export const getUserData = async (req, res) => {
    if (req.session.user) {
        res.json({
            user: req.session.user,
        });
    } else {
        res.status(401).json({
            message: 'User not logged in',
        });
    }
};

//PATCH
export const modifyUserInfo = async (req, res) => {};
export const modifyUserPasswd = async (req, res) => {};

//DELETE
export const deleteUser = async (req, res) => {};
