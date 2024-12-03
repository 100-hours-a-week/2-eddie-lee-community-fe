import config from '../config.js';

const inputPasswd = document.getElementById('inputPasswd');
const inputRecheckPasswd = document.getElementById('inputRecheckPasswd');
const inputPasswdHelperText = document.getElementById('inputPasswdHelperText');
const passwdDifferent = document.getElementById('passwdDifferent');
const inputPasswdInvalidHelperText = document.getElementById(
    'inputPasswdInvalidHelperText',
);
const inputCheckHelperText = document.getElementById('inputCheckHelperText');
const inputCheckDifferent = document.getElementById('inputCheckDifferent');
const modifyBtn = document.getElementById('modifyBtn');
const usrProfileBox = document.getElementById('usrProfileBox');
const userProfile = document.getElementById('userProfile');
const toast = document.getElementById('toast');
const modifyUserInfoLink = document.getElementById('modifyUserInfoLink');
const modifyPasswdLink = document.getElementById('modifyPasswdLink');
const logoutLink = document.getElementById('logoutLink');
const passwdModifyForm = document.getElementById('passwdModifyForm');

const backURL = config.BASE_URL;
const frontURL = config.FRONT_URL;

const passwdPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
let addHide = function (elementID) {
    elementID.classList.add('hide');
};

let removeHide = function (elementID) {
    elementID.classList.remove('hide');
};

let isSame = function (passwd, recheckPasswd) {
    return passwd.value === recheckPasswd.value;
};

let passwdValid = passwd => {
    return passwdPattern.test(passwd.value);
};

const disableToast = function () {
    toast.style.display = 'none';
};

const createToast = function () {
    toast.style.display = 'inline';
    setTimeout(disableToast, 3000);
    return;
};

const changeBtnColor = () => {
    modifyBtn.style.backgroundColor = '#ACA0EB';
};

const activateBtn = () => {
    modifyBtn.style.backgroundColor = '#7F6AEE';
    modifyBtn.disabled = false;
};

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
    modifyUserInfoLink.href = `${frontURL}/users`;
    modifyPasswdLink.href = `${frontURL}/users/passwd`;
    logoutLink.href = `${frontURL}/auth/login`;
});

inputPasswd.onkeyup = () => {
    changeBtnColor;
    if (inputPasswd.value.length === 0) {
        removeHide(inputPasswdHelperText);
        addHide(inputPasswdInvalidHelperText);
        addHide(passwdDifferent);
    } else if (!passwdValid(inputPasswd)) {
        addHide(inputPasswdHelperText);
        removeHide(inputPasswdInvalidHelperText);
        addHide(passwdDifferent);
    } else if (!isSame(inputPasswd, inputRecheckPasswd)) {
        addHide(inputPasswdHelperText);
        addHide(inputPasswdInvalidHelperText);
        removeHide(passwdDifferent);
    } else {
        addHide(inputPasswdHelperText);
        addHide(inputPasswdInvalidHelperText);
        addHide(passwdDifferent);
        addHide(inputCheckDifferent);
        activateBtn();
    }
};

inputRecheckPasswd.onkeyup = () => {
    changeBtnColor;
    if (inputRecheckPasswd.value.length === 0) {
        removeHide(inputCheckHelperText);
        addHide(inputCheckDifferent);
    } else if (!isSame(inputPasswd, inputRecheckPasswd)) {
        addHide(inputCheckHelperText);
        removeHide(inputCheckDifferent);
    } else {
        addHide(inputCheckHelperText);
        addHide(inputCheckDifferent);
        addHide(passwdDifferent);
        activateBtn();
    }
};

modifyBtn.onclick = async event => {
    event.preventDefault();
    const formData = new FormData(passwdModifyForm);
    const originPasswd = formData.get('modifyPasswd');
    formData.set('modifyPasswd', btoa(originPasswd));
    try {
        const reqData = await fetch(`${backURL}/users/passwd`, {
            method: 'PATCH',
            body: formData,
            credentials: 'include',
        });
        if (reqData.ok) {
            const data = await reqData.json();
            location.href = `${frontURL}/auth/login`;
        } else {
            throw new Error(`passwd modify failed..`);
        }
    } catch (err) {
        console.error(err.message);
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
