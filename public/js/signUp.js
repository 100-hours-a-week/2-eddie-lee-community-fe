import config from '../config.js';

const profilePhoto = document.getElementById('profilePhoto');
const inputEmail = document.getElementById('inputEmail');
const inputPasswd = document.getElementById('inputPasswd');
const recheckPasswd = document.getElementById('recheckPasswd');
const inputNickname = document.getElementById('inputNickname');
const signupForm = document.getElementById('signupForm');
const signupBtn = document.getElementById('signupBtn');
const noInputEmail = document.getElementById('noInputEmail');
const invalidEmail = document.getElementById('invalidEmail');
const dupEmail = document.getElementById('dupEmail');
const noInputPasswd = document.getElementById('noInputPasswd');
const diffPasswd = document.getElementById('diffPasswd');
const noInputRecheckPasswd = document.getElementById('noInputRecheckPasswd');
const diffRecheckPasswd = document.getElementById('diffRecheckPasswd');
const noInputNickname = document.getElementById('noInputNickname');
const includeSpaceNickname = document.getElementById('includeSpaceNickname');
const dupNickname = document.getElementById('dupNickname');
const tooLongNickname = document.getElementById('tooLongNickname');
const profileImg = document.getElementById('profileImg');
const loginBtn = document.getElementById('loginBtn');
const loginArticle = document.getElementById('loginArticle');

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwdPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
const nicknamePattern = /^\S{1,10}$/;

const backURL = config.BASE_URL;
const frontURL = config.FRONT_URL;

const emailValid = function (email) {
    return emailPattern.test(email.value);
};

const passwdValid = function (passwd, recheckPasswd) {
    if (passwd.value === recheckPasswd.value) {
        return passwdPattern.test(passwd.value);
    } else {
        return false;
    }
};

const nicknameValid = function (nickname) {
    return nicknamePattern.test(inputNickname.value);
};

const addHide = function (elementID) {
    elementID.classList.add('hide');
};

const removeHide = function (elementID) {
    elementID.classList.remove('hide');
};

//중복 체크

const isDuplicate = async (inputData, dataType) => {
    const result = await fetch(
        `${backURL}/data/signup?type=${dataType}&input=${inputData}`,
    )
        .then(async res => {
            if (!res.ok) {
                throw new Error('check duplicate fail');
            }
            return await res.json();
        })
        .catch(error =>
            console.error('데이터 가져오기 실패: ' + error.message),
        );
    return result.data;
};

//유효성 체크
inputEmail.onkeyup = async () => {
    addHide(noInputEmail);
    addHide(dupEmail);
    addHide(invalidEmail);
    if (inputEmail.value.length === 0) {
        addHide(invalidEmail);
        removeHide(noInputEmail);
    } else if (!emailPattern.test(inputEmail.value)) {
        addHide(noInputEmail);
        removeHide(invalidEmail);
    } else {
        addHide(noInputEmail);
        addHide(invalidEmail);
    }
};

inputEmail.onblur = async () => {
    const result = await fetch(
        `${backURL}/auth/duplicate?type=email&input=${inputEmail.value}`,
        {
            credentials: 'include',
        },
    ).then(res => res.json());
    if (result.data) {
        removeHide(dupEmail);
    } else {
        addHide(dupEmail);
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

inputNickname.onkeyup = async () => {
    addHide(tooLongNickname);
    addHide(noInputNickname);
    addHide(includeSpaceNickname);
    if (inputNickname.value.length === 0) {
        removeHide(noInputNickname);
        addHide(includeSpaceNickname);
        addHide(tooLongNickname);
    } else if (
        !nicknameValid(inputNickname) &&
        inputNickname.value.length < 10
    ) {
        removeHide(includeSpaceNickname);
        addHide(noInputNickname);
        addHide(tooLongNickname);
    } else if (inputNickname.value.length > 10) {
        removeHide(tooLongNickname);
        addHide(noInputNickname);
        addHide(includeSpaceNickname);
    } else {
        addHide(tooLongNickname);
        addHide(noInputNickname);
        addHide(includeSpaceNickname);
    }
};

inputNickname.onblur = async () => {
    const result = await fetch(
        `${backURL}/auth/duplicate?type=nickname&input=${inputNickname.value}`,
        {
            credentials: 'include',
        },
    ).then(res => res.json());
    if (result.data) {
        removeHide(dupNickname);
    } else {
        addHide(dupNickname);
    }
};

signupForm.oninput = function () {
    if (
        emailValid(inputEmail) &&
        passwdValid(inputPasswd, recheckPasswd) &&
        nicknameValid(inputNickname)
    ) {
        signupBtn.style.backgroundColor = '#7F6AEE';
        signupBtn.disabled = false;
    } else {
        signupBtn.style.backgroundColor = '#ACA0EB';
        signupBtn.disabled = true;
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
        profileImg.src = `/public/assets/images/profile_img.webp`;
    }
};

signupForm.onsubmit = async event => {
    event.preventDefault();

    const formData = new FormData(signupForm);
    const originPasswd = formData.get('passwd');
    formData.set('passwd', btoa(originPasswd));

    await fetch(`${backURL}/auth/signup`, {
        method: 'POST',
        body: formData,
    })
        .then(res => {
            const data = res.json();
            if (res.ok) {
                window.location.href = `${frontURL}/auth/login`;
            } else {
                throw new Error(`sign up failed..`);
            }
        })
        .catch(error => console.error('Error:', error));
};

loginBtn.onclick = () => {
    location.href = `${frontURL}/auth/login`;
};
