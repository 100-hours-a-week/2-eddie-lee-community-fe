import fs from 'fs';
import config from '../../public/config.js';

const rootDirname = config.ROOT_DIRECTORY;
const viewDirname = `${rootDirname}/src/views`;
//GET
export const viewModifyUser = async (req, res) => {
    res.sendFile(`${viewDirname}/profileModify.html`);
};

export const viewUserPasswd = async (req, res) => {
    res.sendFile(`${viewDirname}/passwdModify.html`);
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
