import config from '../config.js';

const usrProfileBox = document.getElementById('usrProfileBox');
const usrProfile = document.getElementById('usrProfile');
const dropdown = document.getElementById('dropdown');
const submitBtn = document.getElementById('submitBtn');
const postForm = document.getElementById('postForm');
const inputTitle = document.getElementById('inputTitle');
const inputContent = document.getElementById('inputContent');
const inputImg = document.getElementById('inputImg');
const modifyUserInfoLink = document.getElementById('modifyUserInfoLink');
const modifyPasswdLink = document.getElementById('modifyPasswdLink');
const logoutLink = document.getElementById('logoutLink');
const goBackLink = document.getElementById('goBackLink');

const backURL = config.BASE_URL;
const frontURL = config.FRONT_URL;

document.addEventListener('DOMContentLoaded', async (req, res) => {
    //session에서 user data 받아오기
    const userData = await fetch(`${backURL}/users/session`, {
        method: 'GET',
        credentials: 'include',
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('User data not exist');
            }
            return res.json();
        })
        .catch(error => console.error(error));
    usrProfile.src = userData.profileImg
        ? `${backURL}${userData.profileImg}`
        : '/public/images/profile_img.webp';
    const userId = userData.user_id;
    const url = window.location.pathname;
    const postId = url.split('/')[2];
    goBackLink.href = `${frontURL}/posts/${postId}/info`;

    modifyUserInfoLink.href = `${frontURL}/users/${userId}/user`;
    modifyPasswdLink.href = `${frontURL}/users/${userId}/passwd`;
    logoutLink.href = `${frontURL}/auth/login`;

    try {
        const postData = await fetch(`${backURL}/posts/${postId}/data`).then(
            async res => {
                if (res.ok) {
                    return await res.json();
                } else {
                    throw new Error('get post data failed..');
                }
            },
        );
        inputTitle.value = postData.title;
        inputContent.value = postData.content;
        inputImg.src = postData.profile_img;
    } catch (err) {
        res.status(404).json({
            result: '데이터 가져오기 실패',
            message: 'post Id에 따라 post Data가져오는 부분에서 에러 발생',
        });
    }
});

usrProfileBox.onclick = function () {
    if (dropdown.style.display == 'none') {
        dropdown.style.display = 'flex';
        dropdown.style.flexDirection = 'column';
    } else {
        dropdown.style.display = 'none';
    }
};

postForm.onsubmit = async event => {
    event.preventDefault();
    const formData = new FormData(postForm);
    const path = window.location.pathname;
    const parts = path.split('/');
    const postId = parts[2];
    await fetch(`${backURL}/posts/${postId}`, {
        method: 'PATCH',
        body: formData,
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error(error));
    window.location.href = `${frontURL}/posts/${postId}/info`;
};
