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
const toast = document.getElementById('toast');
const modifyUserInfoLink = document.getElementById('modifyUserInfoLink');
const modifyPasswdLink = document.getElementById('modifyPasswdLink');
const logoutLink = document.getElementById('logoutLink');

modifyUserInfoLink.href = `http://localhost:3000/users/${userId}/user`;
modifyPasswdLink.href = `http://localhost:3000/users/${userId}/passwd`;
logoutLink.href = 'http://localhost:3000/auth/login';

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

inputPasswd.onkeyup = () => {
    changeBtnColor;
    console.log(inputRecheckPasswd);
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

modifyBtn.onclick = event => {
    event.preventDefault();
    createToast();
};

usrProfileBox.onclick = function () {
    if (dropdown.style.display == 'none') {
        dropdown.style.display = 'flex';
        dropdown.style.flexDirection = 'column';
    } else {
        dropdown.style.display = 'none';
    }
};
