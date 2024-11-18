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

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwdPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
const nicknamePattern = /^\S{1,10}$/;

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
    let result = false;
    await fetch('http://localhost:3000/public/dummyData/userDummyData.json')
        .then(res => res.json())
        .then(userData => {
            userData.forEach(user => {
                switch (dataType) {
                    case 'email':
                        if (inputData === user.email) {
                            result = true;
                        }
                        break;
                    case 'nickname':
                        if (inputData === user.nickname) {
                            result = true;
                        }
                        break;
                }
            });
        })
        .catch(error => console.error('데이터 가져오기 실패: ' + error));
    return result;
};

//유효성 체크
inputEmail.onkeyup = async () => {
    if (inputEmail.value.length === 0) {
        addHide(invalidEmail);
        addHide(dupEmail);
        removeHide(noInputEmail);
    } else if (!emailPattern.test(inputEmail.value)) {
        addHide(noInputEmail);
        addHide(dupEmail);
        removeHide(invalidEmail);
    } else if (await isDuplicate(inputEmail.value, 'email')) {
        addHide(noInputEmail);
        removeHide(dupEmail);
        addHide(invalidEmail);
    } else {
        addHide(noInputEmail);
        addHide(dupEmail);
        addHide(invalidEmail);
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
    if (inputNickname.value.length === 0) {
        removeHide(noInputNickname);
        addHide(includeSpaceNickname);
        addHide(dupNickname);
        addHide(tooLongNickname);
    } else if (
        !nicknameValid(inputNickname) &&
        inputNickname.value.length < 10
    ) {
        removeHide(includeSpaceNickname);
        addHide(noInputNickname);
        addHide(dupNickname);
        addHide(tooLongNickname);
    } else if (inputNickname.value.length > 10) {
        removeHide(tooLongNickname);
        addHide(noInputNickname);
        addHide(dupNickname);
        addHide(includeSpaceNickname);
    } else if (await isDuplicate(inputNickname.value, 'nickname')) {
        addHide(tooLongNickname);
        addHide(noInputNickname);
        removeHide(dupNickname);
        addHide(includeSpaceNickname);
    } else {
        addHide(tooLongNickname);
        addHide(noInputNickname);
        addHide(dupNickname);
        addHide(includeSpaceNickname);
    }
    isDuplicate(inputNickname.value, 'nickname');
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

signupForm.onsubmit = async event => {
    event.preventDefault();

    const formData = new FormData(signupForm);
    const originPasswd = formData.get('passwd');
    formData.set('passwd', btoa(originPasswd));

    await fetch('/auth/signup', {
        method: 'POST',
        body: formData,
    })
        .then(res => {
            const data = res.text();
            if (res.ok) {
                window.location.href = 'http://localhost:3000/auth/login';
            } else {
                throw new Error(`sign up failed..`);
            }
        })
        .catch(error => console.error('Error:', error));
};

loginBtn.onclick = () => {
    location.href = 'http://localhost:3000/auth/login';
};
