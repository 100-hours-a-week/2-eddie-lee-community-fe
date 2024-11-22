import config from '../../public/config.js';

const rootDirname = config.ROOT_DIRECTORY;
const viewDirname = `${rootDirname}/src/views`;
const backURL = config.BASE_URL;

//GET
export const viewLogin = async (req, res) => {
    res.sendFile(`${viewDirname}/login.html`);
};

export const viewSignup = async (req, res) => {
    res.sendFile(`${viewDirname}/signUp.html`);
};
