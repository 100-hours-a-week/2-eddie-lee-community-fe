let inputPasswd = document.getElementById('inputPasswd');
let inputRecheckPasswd = document.getElementById('inputRecheckPasswd');
let inputPasswdHelperText = document.getElementById('inputPasswdHelperText');
let passwdDifferent = document.getElementById('passwdDifferent');
let inputPasswdInvalidHelperText = document.getElementById(
    'inputPasswdInvalidHelperText',
);
let inputCheckHelperText = document.getElementById('inputCheckHelperText');
let inputCheckDifferent = document.getElementById('inputCheckDifferent');
let modifyBtn = document.getElementById('modifyBtn');
let usrProfileBox = document.getElementById('usrProfileBox');
let toast = document.getElementById('toast');

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
