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

document.addEventListener('DOMContentLoaded', async () => {
    let userId = '';
    await fetch('http://localhost:3000/users/data', {
        method: 'GET',
        credentials: 'include',
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('User data not exist');
            }
            return res.json();
        })
        .then(userData => {
            const user = userData.user;
            userProfile.src = user.userProfileImg;
            userId = user.userId;

            console.log(
                `user Profile : ${user.userProfileImg}, userId: ${user.userId}`,
            );
        })
        .catch(error => console.error(error));
    modifyUserInfoLink.href = `http://localhost:3000/users/${userId}/user`;
    modifyPasswdLink.href = `http://localhost:3000/users/${userId}/passwd`;
    logoutLink.href = 'http://localhost:3000/auth/login';
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
    let formData = new FormData(postForm);

    fetch('http://localhost:3000/posts/edit', {
        method: 'POST',
        body: formData,
    })
        .then(res => res.text())
        .then(data => {
            console.log(data);
        });

    location.href = 'http://localhost:3000/posts';
};
