let postModify = document.getElementById('postModify');
let postDelete = document.getElementById('postDelete');
let postModal = document.getElementById('postModal');
let postModalBox = document.getElementById('postModalBox');
let postModalCancel = document.getElementById('postModalCancel');
let postModalOk = document.getElementById('postModalOk');
let commentDelete = document.getElementById('commentDelete');

let commentModify = document.getElementById('commentModify');
let usrProfileBox = document.getElementById('usrProfileBox');

let commentModal = document.getElementById('commentModal');
let commentModalBox = document.getElementById('commentModalBox');
let commentModalCancel = document.getElementById('commentModalCancel');
let commentModalOk = document.getElementById('commentModalOk');

usrProfileBox.onclick = function () {
    if (dropdown.style.display == 'none') {
        dropdown.style.display = 'flex';
        dropdown.style.flexDirection = 'column';
    } else {
        dropdown.style.display = 'none';
    }
};

postDelete.onclick = function () {
    postModal.style.display = 'flex';
    postModalBox.style.display = 'flex';
};

postModalCancel.onclick = function () {
    postModal.style.display = 'none';
    postModalBox.style.display = 'none';
};

postModify.onclick = function () {
    location.href = 'http://localhost:3000/post/post_modify';
};
