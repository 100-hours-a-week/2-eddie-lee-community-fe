let modifyBtn = document.getElementById('modifyBtn');
let toast = document.getElementById('toast');
let deleteProfile = document.getElementById('deleteProfile');
let deleteProfileCancelBtn = document.getElementById('deleteProfileCancelBtn');
let deleteProfileOkBtn = document.getElementById('deleteProfileOkBtn');
let deleteProfileModal = document.getElementById('deleteProfileModal');
let deleteProfileModalBox = document.getElementById('deleteProfileModalBox');
let dropdown = document.getElementById('dropdown');
let usrProfileBox = document.getElementById('usrProfileBox');
let inputNickname = document.getElementById('inputNickname');
let noInputNickname = document.getElementById('noInputNickname');
let includeSpaceNickname = document.getElementById('includeSpaceNickname');
let dupNickname = document.getElementById('dupNickname');
let tooLongNickname = document.getElementById('tooLongNickname');

const nicknamePattern = /^\S{1,10}$/;

let nicknameValid = function (nickname) {
    return nicknamePattern.test(inputNickname.value);
};

let addHide = function (elementID) {
    elementID.classList.add('hide');
};

let removeHide = function (elementID) {
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

modifyBtn.onclick = async (req, res) => {
    console.log(inputNickname.value);
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

deleteProfileOkBtn.onclick = () => {
    location.href = 'http://localhost:3000/';
};

usrProfileBox.onclick = function () {
    if (dropdown.style.display == 'none') {
        dropdown.style.display = 'flex';
        dropdown.style.flexDirection = 'column';
    } else {
        dropdown.style.display = 'none';
    }
};
