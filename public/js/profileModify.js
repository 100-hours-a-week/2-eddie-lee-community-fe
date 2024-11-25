import config from '../config.js';

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

const backURL = config.BASE_URL;
const frontURL = config.FRONT_URL;

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

    profileImg.src = `${backURL}${userData.profile_img}`;
    showEmail.value = userData.email;
    inputNickname.placeholder = userData.nickname;
    modifyUserInfoLink.href = `${frontURL}/users/`;
    modifyPasswdLink.href = `${frontURL}/users/passwd`;
    logoutLink.href = `${frontURL}/auth/login`;
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
        await fetch(`${backURL}/users`, {
            method: 'PATCH',
            body: formData,
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err.message));
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
    await fetch(`${backURL}/users`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            location.href = `${backURL}/auth/login`;
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
