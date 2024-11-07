import { viewDirname } from '../routes/index.js';

//GET
export const viewLogin = async (req, res) => {
    res.sendFile(`${viewDirname}/login.html`);
};
export const viewSignup = async (req, res) => {
    res.sendFile(`${viewDirname}/signUp.html`);
};

//POST
export const login = async (req, res) => {
    res.json(req.body);
};
export const signup = async (req, res) => {
    const textData = req.body;
    const fileData = req.file; // 파일이 없으면 undefined가 됩니다.

    console.log('텍스트 데이터:', textData);
    console.log('파일 데이터:', fileData);

    res.json({
        status: 'success',
        received_data: textData,
        received_file: fileData ? fileData : 'No file uploaded',
    });
};
