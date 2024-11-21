import env from '../../config/dotenv.js';
import fs from 'fs';
import path from 'path';

const rootDirname = env.ROOT_DIRECTORY;
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

//PATCH
export const modifyUser = async (req, res) => {
    const profileImg = req.file
        ? `/public/userPhotos/${req.file.filename}`
        : `/public/userPhoto/defaultPostImg.png`;
    const { nickname } = req.body;
    const userId = req.params.userId;

    //작성한 댓글의 유저 정보 변경
    const updateComments = await fetch(`http://localhost:3000/data/comments`)
        .then(res => {
            const data = res.json();
            if (res.ok) {
                return data;
            } else {
                throw new Error(`Can't get all comments`);
            }
        })
        .then(comments => {
            const updateComments = comments.map(comment =>
                comment.user_id === userId
                    ? {
                          ...comment,
                          profile_img: profileImg,
                          nickname: nickname,
                      }
                    : comment,
            );
            return updateComments;
        })
        .catch(err => console.err(`댓글 유저 정보 수정 오류: ${err}`));

    try {
        fs.writeFileSync(
            `${rootDirname}/public/dummyData/commentDummyData.json`,
            JSON.stringify(updateComments),
            'utf8',
        );
    } catch (err) {
        console.error(err.message);
    }

    //작성한 게시글의 유저 정보 변경
    const updatePosts = await fetch(`http://localhost:3000/data/posts`)
        .then(res => {
            const data = res.json();
            if (res.ok) {
                return data;
            } else {
                throw new Error(`Can't get all posts`);
            }
        })
        .then(posts => {
            const updatePosts = posts.map(post =>
                post.user_id === userId
                    ? {
                          ...post,
                          profile_img: profileImg,
                          nickname: nickname,
                      }
                    : post,
            );
            return updatePosts;
        })
        .catch(err => console.err(`게시글 유저 정보 수정 오류: ${err}`));

    try {
        fs.writeFileSync(
            `${rootDirname}/public/dummyData/postDummyData.json`,
            JSON.stringify(updatePosts),
            'utf8',
        );
    } catch (err) {
        console.error(err.message);
    }

    //유저 정보 변경
    const updateUsers = await fetch(`http://localhost:3000/data/users`)
        .then(res => {
            const data = res.json();
            if (res.ok) {
                return data;
            } else {
                throw new Error(`Can't get all users`);
            }
        })
        .then(users => {
            const updateUsers = users.map(user =>
                user.user_id === userId
                    ? {
                          ...user,
                          profile_img: profileImg,
                          nickname: nickname,
                      }
                    : user,
            );
            return updateUsers;
        })
        .catch(err => console.err(`유저 정보 수정 오류: ${err}`));

    try {
        fs.writeFileSync(
            `${rootDirname}/public/dummyData/userDummyData.json`,
            JSON.stringify(updateUsers),
            'utf8',
        );
    } catch (err) {
        console.error(err.message);
    }
    res.status(200).json({ message: 'modify_user_info_success', data: null });
};
export const modifyUserPasswd = async (req, res) => {
    const userId = req.params.userId;
    const textData = req.body;
    const passwd = textData.modifyPassword;
    try {
        const getUserData = await fetch('http://localhost:3000/data/users');
        const userData = await getUserData.json();
        const updateUsers = userData.map(user =>
            user.user_id === userId ? { ...user, passwd: passwd } : user,
        );

        try {
            fs.writeFileSync(
                `${rootDirname}/public/dummyData/userDummyData.json`,
                JSON.stringify(updateUsers),
                'utf8',
            );
            res.status(200).json({
                message: 'modify_passwd_success',
                data: null,
            });
        } catch (error) {
            res.status(404).json({
                message: 'write file err',
                data: error.message,
            });
        }
    } catch (err) {
        res.status(404).json({
            message: 'modify passwd failed',
            data: err.message,
        });
    }
};

//DELETE
export const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    const comments = await fetch('http://localhost:3000/data/comments')
        .then(res => res.json())
        .catch(error => console.error(error));
    const deleteComments = comments.filter(
        comment => comment.user_id != userId,
    );
    try {
        fs.writeFileSync(
            `${rootDirname}/public/dummyData/commentDummyData.json`,
            JSON.stringify(deleteComments),
            'utf8',
        );
    } catch (err) {
        res.status(404).json({
            result: '사용자 삭제 실패: 댓글 삭제 실패',
            message: err.message,
        });
    }

    const posts = await fetch('http://localhost:3000/data/posts')
        .then(res => res.json())
        .catch(error => console.error(error));
    const deletePosts = posts.filter(post => post.user_id != userId);
    try {
        fs.writeFileSync(
            `${rootDirname}/public/dummyData/postDummyData.json`,
            JSON.stringify(deletePosts),
            'utf8',
        );
    } catch (err) {
        res.status(404).json({
            result: '사용자 삭제 실패: 게시글 삭제 실패',
            message: err.message,
        });
    }

    const users = await fetch('http://localhost:3000/data/users')
        .then(res => res.json())
        .catch(error => console.error(error));
    const deleteUser = users.filter(user => user.user_id != userId);

    try {
        fs.writeFileSync(
            `${rootDirname}/public/dummyData/userDummyData.json`,
            JSON.stringify(deleteUser),
            'utf8',
        );
    } catch (err) {
        res.status(404).json({
            result: '사용자 삭제 실패: 사용자 삭제 실패',
            message: err.message,
        });
    }

    res.status(200).json({ result: '사용자 삭제 성공', message: null });
};
