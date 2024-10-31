const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwdPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

// inputEmail 요소 가져오기
let inputEmail = document.getElementById('inputEmail');
let inputPasswd = document.getElementById('inputPasswd');
let validPasswd = document.getElementById('validPasswd');
let loginBtn = document.getElementById('loginBtn');

let checkValid = function (inputEmail, inputPasswd) {
    if (
        emailPattern.test(inputEmail.value) &&
        passwdPattern.test(inputPasswd.value)
    ) {
        loginBtn.style.backgroundColor = '#7F6AEE';
    }
};

inputEmail.onkeyup = function () {
    // wrongEmail 클래스 요소 가져오기
    let wrongEmail = document.getElementsByClassName('wrongEmail');

    if (emailPattern.test(inputEmail.value)) {
        // HTMLCollection에서 첫 번째 요소 선택
        wrongEmail[0].classList.add('hide');
    } else {
        wrongEmail[0].classList.remove('hide');
    }
    if (inputEmail.value.length == 0) {
        wrongEmail.classList.remove('hide');
    }
    checkValid(inputEmail, inputPasswd);
};

inputPasswd.onkeyup = function () {
    if (inputPasswd.value.length != 0) {
        validPasswd.classList.add('hide');
    } else {
        validPasswd.classList.remove('hide');
    }
    checkValid(inputEmail, inputPasswd);
};

loginBtn.onclick = function () {
    location.href = 'Posts.html';
};
