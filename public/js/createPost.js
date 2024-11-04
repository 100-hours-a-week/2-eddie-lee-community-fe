let submitBtn = document.getElementById('submitBtn');
let inputTitle = document.getElementById('inputTitle');
let inputContent = document.getElementById('inputContent');
let userProfile = document.getElementById('userProfile');
let usrProfileBox = document.getElementById('usrProfileBox');
let dropdown = document.getElementById('dropdown');

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