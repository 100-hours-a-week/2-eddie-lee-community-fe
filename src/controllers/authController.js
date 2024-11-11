import { viewDirname, rootDirname } from '../routes/index.js';
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

    const addUserData = {
        user_id: Date.now(),
        profile_img: fileData,
        email: textData.email,
        passwd: textData.passwd,
        nickname: textData.nickname,
    };
    const originData = await fetch(
        'http://localhost:3000/public/dummyData/userDummyData.json',
    )
        .then(res => res.json())
        .catch(error => console.error(`데이터 가져오기 실패: ${error}`));
    originData.push(addUserData);
    console.log(originData);
    try {
        fs.writeFileSync(
            `${rootDirname}/public/dummyData/userDummyData.json`,
            JSON.stringify(originData, null, 2),
        );
        res.status(200).send('데이터 추가 완료');
    } catch (error) {
        res.status(500).send('데이터 추가 실패');
    }
};
