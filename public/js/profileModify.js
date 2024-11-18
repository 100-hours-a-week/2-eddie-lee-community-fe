const modifyBtn = document.getElementById('modifyBtn');
const toast = document.getElementById('toast');
const deleteProfile = document.getElementById('deleteProfile');
const deleteProfileCancelBtn = document.getElementById(
    'deleteProfileCancelBtn',
);
const deleteProfileOkBtn = document.getElementById('deleteProfileOkBtn');
const deleteProfileModal = document.getElementById('deleteProfileModal');
const deleteProfileModalBox = document.getElementById('deleteProfileModalBox');
const dropdown = document.getElementById('dropdown');
const usrProfileBox = document.getElementById('usrProfileBox');
const inputNickname = document.getElementById('inputNickname');
const noInputNickname = document.getElementById('noInputNickname');
const includeSpaceNickname = document.getElementById('includeSpaceNickname');
const dupNickname = document.getElementById('dupNickname');
const tooLongNickname = document.getElementById('tooLongNickname');
const profileImg = document.getElementById('profileImg');
const showEmail = document.getElementById('showEmail');

const nicknamePattern = /^\S{1,10}$/;
let userId = '';

const nicknameValid = function (nickname) {
    return nicknamePattern.test(inputNickname.value);
};

const addHide = function (elementID) {
    elementID.classList.add('hide');
};

const removeHide = function (elementID) {
    elementID.classList.remove('hide');
};

const disableToast = function () {
    toast.style.display = 'none';
};

const createToast = function () {
    toast.style.display = 'inline';
    setTimeout(disableToast, 3000);
    return;
};

document.addEventListener('DOMContentLoaded', async () => {
    //session에서 user data 받아오기
    const userData = await fetch('http://localhost:3000/users/data', {
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
            return user;
        })
        .catch(error => console.error(error));

    profileImg.src = userData.userProfileImg;
    showEmail.value = userData.userEmail;
    inputNickname.placeholder = userData.userNickname;
    modifyUserInfoLink.href = `http://localhost:3000/users/${userId}/user`;
    modifyPasswdLink.href = `http://localhost:3000/users/${userId}/passwd`;
    logoutLink.href = 'http://localhost:3000/auth/login';
});

modifyBtn.onclick = async (req, res) => {
    if (inputNickname.value.length === 0) {
        removeHide(noInputNickname);
        addHide(includeSpaceNickname);
        addHide(dupNickname);
        addHide(tooLongNickname);
    } else if (inputNickname.value.length > 10) {
        removeHide(tooLongNickname);
        addHide(noInputNickname);
        addHide(dupNickname);
        addHide(includeSpaceNickname);
    } else if (!nicknameValid(inputNickname)) {
        removeHide(includeSpaceNickname);
        addHide(noInputNickname);
        addHide(dupNickname);
        addHide(tooLongNickname);
    } else {
        addHide(tooLongNickname);
        addHide(noInputNickname);
        addHide(dupNickname);
        addHide(includeSpaceNickname);

        const formData = new FormData();
        const editImg = modifyProfilePhoto.files[0];
        const editNickname = inputNickname.value;
        formData.append('profileImg', editImg);
        formData.append('nickname', editNickname);
        await fetch(`http://localhost:3000/users/${userId}/user`, {
            method: 'PATCH',
            body: formData,
        })
            .then(res => res.json())
            .then(data => console.log(data));
        createToast();
    }
};

deleteProfile.onclick = function () {
    deleteProfileModal.style.display = 'flex';
    deleteProfileModalBox.style.display = 'flex';
};

deleteProfileCancelBtn.onclick = function () {
    deleteProfileModal.style.display = 'none';
    deleteProfileModalBox.style.display = 'none';
};

deleteProfileOkBtn.onclick = async () => {
    await fetch(`http://localhost:3000/users/${userId}/user`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            location.href = 'http://localhost:3000/auth/login';
        })
        .catch(err => console.error(err));
};

usrProfileBox.onclick = function () {
    if (dropdown.style.display == 'none') {
        dropdown.style.display = 'flex';
        dropdown.style.flexDirection = 'column';
    } else {
        dropdown.style.display = 'none';
    }
};
