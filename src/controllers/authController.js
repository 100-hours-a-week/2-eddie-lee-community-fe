import { viewDirname } from '../routes/index.js';
import fs from 'fs';
import multer from 'multer';
const upload = multer();

//GET
export const viewLogin = async (req, res) => {
    res.sendFile(`${viewDirname}/login.html`);
};
export const viewSignup = async (req, res) => {
    res.sendFile(`${viewDirname}/signUp.html`);
};

//POST
export const login = async (req, res) => {
    const loginInfo = req.body;
    const email = loginInfo.email;
    const passwd = loginInfo.passwd;
    let loginFlag = false;

    await fetch(`http://localhost:3000/public/dummyData/userDummyData.json`)
        .then(res => res.json())
        .then(userData => {
            userData.forEach(data => {
                if (data.email === email && data.passwd === passwd) {
                    //console.log(`${data.email} ==== ${email}`);
                    loginFlag = true;
                    console.log(loginFlag);
                }
            });
        })
        .catch(error => console.error(error));

    if (loginFlag) {
        res.status(200).json({
            message: 'login_success',
            login_result: loginFlag,
        });
    } else {
        res.status(401).json({
            message: 'login_failed',
            login_result: loginFlag,
        });
    }
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
