import { viewDirname, rootDirname } from '../routes/index.js';
import fs from 'fs';

//GET
export const viewLogin = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error destroying session');
        }
        res.clearCookie('connect.sid');
        res.sendFile(`${viewDirname}/login.html`);
    });
    //res.sendFile(`${viewDirname}/login.html`);
};
export const viewSignup = async (req, res) => {
    res.sendFile(`${viewDirname}/signUp.html`);
};

//POST
export const login = async (req, res) => {
    const loginInfo = req.body;
    const email = loginInfo.email;
    const passwd = loginInfo.passwd;

    const users = await fetch(
        `http://localhost:3000/public/dummyData/userDummyData.json`,
    )
        .then(res => res.json())
        .catch(error => console.error(error));

    const user = users.find(
        findUser => findUser.email === email && findUser.passwd === passwd,
    );
    if (!user) {
        console.log('login failed');
        res.status(404).json({
            message: 'no user exist.',
            login_result: 'failed',
        });
    } else {
        console.log('login success');
        req.session.user = {
            userId: user.user_id,
            userNickname: user.nickname,
            userProfileImg: user.profile_img,
            userEmail: user.email,
        };
        res.status(200).json({
            message: 'Login success',
            user: req.session.user,
        });
    }
};

export const signup = async (req, res) => {
    const textData = req.body;
    let fileData = req.file; // 파일이 없으면 undefined가 됩니다

    if (!fileData) {
        fileData = '/public/images/profile_img.webp';
    } else {
        const filePath = `/public/userPhotos/${req.file.filename}`;
        fileData = filePath;
    }

    const addUserData = {
        user_id: Date.now().toString(),
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
