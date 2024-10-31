let profilePhoto = document.getElementById('profilePhoto');
let inputEmail = document.getElementById('inputEmail');
let inputPasswd = document.getElementById('inputPasswd');
let recheckPasswd = document.getElementById('recheckPasswd');
let inputNickname = document.getElementById('inputNickname');
let signupForm = document.getElementById('signupForm');
let signupBtn = document.getElementById('signupBtn');
let noInputEmail = document.getElementById('noInputEmail');
let invalidEmail = document.getElementById('invalidEmail');
let dupEmail = document.getElementById('dupEmail');
let noInputPasswd = document.getElementById('noInputPasswd');
let diffPasswd = document.getElementById('diffPasswd');
let noInputRecheckPasswd = document.getElementById('noInputRecheckPasswd');
let diffRecheckPasswd = document.getElementById('diffRecheckPasswd');
let noInputNickname = document.getElementById('noInputNickname');
let includeSpaceNickname = document.getElementById('includeSpaceNickname');
let dupNickname = document.getElementById('dupNickname');
let tooLongNickname = document.getElementById('tooLongNickname');
let profileImg = document.getElementById('profileImg');

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwdPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
const nicknamePattern = /^\S{1,10}$/;

let emailValid = function (email) {
    return emailPattern.test(email.value);
};

let passwdValid = function (passwd, recheckPasswd) {
    if (passwd.value === recheckPasswd.value) {
        return passwdPattern.test(passwd.value);
    } else {
        return false;
    }
};

let nicknameValid = function (nickname) {
    return nicknamePattern.test(inputNickname.value);
};

let addHide = function (elementID) {
    elementID.classList.add('hide');
};

let removeHide = function (elementID) {
    elementID.classList.remove('hide');
};

//유효성 체크
inputEmail.onkeyup = function () {
    if (inputEmail.value.length === 0) {
        addHide(invalidEmail);
        addHide(dupEmail);
        removeHide(noInputEmail);
    } else if (!emailPattern.test(inputEmail.value)) {
        addHide(noInputEmail);
        addHide(dupEmail);
        removeHide(invalidEmail);
    }
    if (emailValid(inputEmail)) {
        addHide(noInputEmail);
        addHide(dupEmail);
        addHide(invalidEmail);
        signUpValid(inputEmail, inputPasswd, inputNickname);
    }
};

inputPasswd.onkeyup = function () {
    if (passwdValid(inputPasswd, recheckPasswd)) {
        addHide(noInputPasswd);
        addHide(diffPasswd);
        addHide(diffRecheckPasswd);
    } else if (inputPasswd.value.length === 0) {
        removeHide(noInputPasswd);
        addHide(diffPasswd);
    } else {
        addHide(noInputPasswd);
        removeHide(diffPasswd);
    }
};

recheckPasswd.onkeyup = function () {
    if (passwdValid(inputPasswd, recheckPasswd)) {
        addHide(noInputRecheckPasswd);
        addHide(diffPasswd);
        addHide(diffRecheckPasswd);
    } else if (recheckPasswd.value.length === 0) {
        removeHide(noInputRecheckPasswd);
        addHide(diffRecheckPasswd);
    } else {
        addHide(noInputRecheckPasswd);
        removeHide(diffRecheckPasswd);
    }
};

inputNickname.onkeyup = function () {
    if (inputNickname.value.length === 0) {
        removeHide(noInputNickname);
        addHide(includeSpaceNickname);
        addHide(dupNickname);
        addHide(tooLongNickname);
    }
    if (inputNickname.value.length > 10) {
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
    }
};

inputNickname.onblur = function () {
    if (
        emailValid(inputEmail) &&
        passwdValid(inputPasswd, recheckPasswd) &&
        nicknameValid(inputNickname)
    ) {
        signupBtn.style.backgroundColor = '#7F6AEE';
        signupBtn.disabled = false;
    }
};

profilePhoto.onchange = function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profileImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        profileImg.src = 'images/profile_img.webp';
    }
};
