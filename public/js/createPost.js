import config from '../config.js';

const submitBtn = document.getElementById('submitBtn');
const inputTitle = document.getElementById('inputTitle');
const inputContent = document.getElementById('inputContent');
const userProfile = document.getElementById('userProfile');
const usrProfileBox = document.getElementById('usrProfileBox');
const dropdown = document.getElementById('dropdown');
const postForm = document.getElementById('postForm');
const modifyUserInfoLink = document.getElementById('modifyUserInfoLink');
const modifyPasswdLink = document.getElementById('modifyPasswdLink');
const logoutLink = document.getElementById('logoutLink');

const backURL = config.BASE_URL;
const frontURL = config.FRONT_URL;

document.addEventListener('DOMContentLoaded', async () => {
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
    userProfile.src = userData.profileImg
        ? `${backURL}${userData.profileImg}`
        : '/public/images/profile_img.webp';
    const userId = userData.user_id;
    modifyUserInfoLink.href = `${frontURL}/users/`;
    modifyPasswdLink.href = `${frontURL}/users/passwd`;
    logoutLink.href = `${frontURL}/auth/login`;
    const userIdInput = document.createElement('input');
    userIdInput.type = 'hidden';
    userIdInput.name = 'userId';
    userIdInput.value = userId;
    console.log(userId);
    postForm.appendChild(userIdInput);
});

const postValid = function () {
    if (inputTitle.value.length !== 0 && inputContent.value.length !== 0) {
        return true;
    } else {
        return false;
    }
};

submitBtn.onclick = function () {
    if (inputTitle.value.length === 0 && inputContent.value.length === 0) {
        alert('제목, 내용을 모두 작성해주세요');
    }
};

inputTitle.onkeydown = function () {
    if (postValid()) {
        submitBtn.style.backgroundColor = '#7F6AEE';
    } else {
        submitBtn.style.backgroundColor = '#ACA0EB';
    }
};

inputContent.onkeydown = function () {
    if (postValid()) {
        submitBtn.style.backgroundColor = '#7F6AEE';
    } else {
        submitBtn.style.backgroundColor = '#ACA0EB';
    }
};

usrProfileBox.onclick = function () {
    if (dropdown.style.display == 'none') {
        dropdown.style.display = 'flex';
        dropdown.style.flexDirection = 'column';
    } else {
        dropdown.style.display = 'none';
    }
};

postForm.onsubmit = event => {
    event.preventDefault();
    const formData = new FormData(postForm);

    fetch(`${backURL}/posts/edit`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
    })
        .then(async res => {
            const data = await res.json();
            if (res.ok) {
                return data;
            } else {
                throw new Error(`create post error`);
            }
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => console.error(err.message));

    location.href = `${frontURL}/posts`;
};
