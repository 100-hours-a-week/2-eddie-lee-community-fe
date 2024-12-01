import { __dirname } from '../../app.js';
//GET
export const viewLogin = async (req, res) => {
    res.sendFile(`${__dirname}/src/views/login.html`);
};

export const viewSignup = async (req, res) => {
    res.sendFile(`${__dirname}/src/views/signUp.html`);
};
