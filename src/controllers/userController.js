import { __dirname } from '../../app.js';
//GET
export const viewModifyUser = async (req, res) => {
    res.sendFile(`${__dirname}/src/views/profileModify.html`);
};

export const viewUserPasswd = async (req, res) => {
    res.sendFile(`${__dirname}/src/views/passwdModify.html`);
};
