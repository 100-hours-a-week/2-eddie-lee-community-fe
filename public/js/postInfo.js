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
let commentArea = document.getElementById('commentArea');
let addCommentBtn = document.getElementById('addCommentBtn');
let likeBtn = document.getElementById('likeBtn');
let likeCount = document.getElementById('likeCount');
let viewCount = document.getElementById('viewCount');
let commentCount = document.getElementById('commentCount');

document.addEventListener('DOMContentLoaded', () => {
    let like = parseInt(likeCount.textContent);
    let view = parseInt(viewCount.textContent);
    let comment = parseInt(commentCount.textContent);

    if (like > 999) {
        likeCount.textContent = `${parseInt(like / 1000)}k`;
    }
    if (view > 999) {
        viewCount.textContent = `${parseInt(view / 1000)}k`;
    }
    if (comment > 999) {
        commentCount.textContent = `${parseInt(comment / 1000)}k`;
    }
});

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

commentDelete.onclick = function () {
    commentModal.style.display = 'flex';
    commentModalBox.style.display = 'flex';
};

commentModalCancel.onclick = function () {
    commentModal.style.display = 'none';
    commentModalBox.style.display = 'none';
};

postModify.onclick = function () {
    const path = window.location.pathname;
    const parts = path.split('/');
    const postId = parts[2];

    history.pushState(null, '', `/posts/${postId}`);

    fetch(`http://localhost:3000/posts/${postId}`)
        .then(res => res.text())
        .then(html => {
            document.open();
            document.write(html);
            document.close();
        })
        .catch(error => console.error(error));
};

commentModify.onclick = function () {
    commentArea.value = '댓글 내용';
};

addCommentBtn.onclick = () => {
    console.log(commentArea.value);
};

likeBtn.onclick = () => {
    let like = parseInt(likeCount.textContent);
    console.log(likeCount.textContent);
    if (++like > 1000) {
        like /= 1000;
        likeCount.textContent = `${like}k`;
    }
};
