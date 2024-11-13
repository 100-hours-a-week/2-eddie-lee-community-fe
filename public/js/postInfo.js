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
const postInfoArticle = document.getElementById('postInfoArticle');
const profileImg = document.getElementById('profileImg');
const editorNickname = document.getElementById('editorNickname');
const timestamp = document.getElementById('timestamp');
const postPhoto = document.getElementById('postPhoto');
const postContent = document.getElementById('postContent');
const userProfile = document.getElementById('userProfile');
const modifyAndDeleteBtnBox = document.getElementById('modifyAndDeleteBtnBox');

let userId = 0;

const numericalPrefix = number => {
    if (number > 999) {
        return `${parseInt(number / 1000)}k`;
    } else {
        return number;
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    //session에서 user data 받아오기
    await fetch('http://localhost:3000/users/data', {
        method: 'GET',
        credentials: 'include',
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('User data not exist');
            }
            return res.json();
        })
        .then(userData => {
            const user = userData.user;
            userProfile.src = user.userProfileImg;
            userId = user.userId;
        })
        .catch(error => console.error(error));

    const url = window.location.pathname;
    const postId = url.split('/')[2];

    const getData = await fetch(`http://localhost:3000/posts/${postId}/data`);
    const postData = await getData.json();
    const getUserData = await fetch(
        `http://localhost:3000/public/dummyData/userDummyData.json`,
    )
        .then(res => {
            if (!res.ok) {
                throw Error('get data error');
            }
            return res.json();
        })
        .then(users => {
            const user = users.find(user => user.user_id === postData.user_id);
            return user;
        })
        .catch(error => console.error(error));
    postTitle.textContent = postData.title;
    profileImg.src = postData.profile_img;
    editorNickname.textContent = postData.nickname;
    timestamp.textContent = postData.timestamp;
    if (userId !== postData.user_id)
        modifyAndDeleteBtnBox.style.display = 'none';

    postPhoto.src = postData.image;
    postContent.textContent = postData.content;

    let like = postData.like;
    let view = postData.view;
    let comment = postData.comment_count;

    likeCount.textContent = numericalPrefix(like);

    viewCount.textContent = numericalPrefix(++view);

    commentCount.textContent = numericalPrefix(comment);

    const getComments = await fetch(
        `http://localhost:3000/posts/${postId}/comments`,
    )
        .then(res => res.json())
        .catch(error => console.error(error));
    //여기도 offset으로 infinite scroll 구현해보기 (추가)
    getComments.forEach(comment => {
        const newComment = document.createElement('div');
        newComment.classList.add('commentViewBox');
        newComment.id = comment.comment_id;

        const commentEditorBox = document.createElement('div');
        commentEditorBox.classList.add('commentViewEditorBox');

        const profileImgBox = document.createElement('div');
        profileImgBox.classList.add('profileImgBox');

        const profileImg = document.createElement('img');
        profileImg.classList.add('profileImg');
        profileImg.src = comment.profile_img;

        profileImgBox.appendChild(profileImg);

        const editorNickname = document.createElement('p');
        editorNickname.classList.add('editorNickname');
        editorNickname.textContent = comment.nickname;

        const time = document.createElement('p');
        time.classList.add('time');
        time.textContent = comment.timestamp;
        if (comment.user_id === userId) {
            const modifyAndDeleteBtnBox = document.createElement('div');
            modifyAndDeleteBtnBox.classList.add('modifyAndDeleteBtnBox');

            const modifyBtn = document.createElement('button');
            modifyBtn.classList.add('modifyAndDeleteBtn');
            modifyBtn.textContent = '수정';

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('modifyAndDeleteBtn');
            deleteBtn.textContent = '삭제';

            modifyAndDeleteBtnBox.appendChild(modifyBtn);
            modifyAndDeleteBtnBox.appendChild(deleteBtn);
        }

        commentEditorBox.appendChild(profileImgBox);
        commentEditorBox.appendChild(editorNickname);
        commentEditorBox.appendChild(time);
        commentEditorBox.appendChild(modifyAndDeleteBtnBox);

        const commentContent = document.createElement('p');
        commentContent.classList.add('commentContent');
        commentContent.textContent = comment.comment_content;

        newComment.appendChild(commentEditorBox);
        newComment.appendChild(commentContent);

        postInfoArticle.appendChild(newComment);
    });
});

usrProfileBox.onclick = function () {
    if (dropdown.style.display == 'none') {
        dropdown.style.display = 'flex';
        dropdown.style.flexDirection = 'column';
    } else {
        dropdown.style.display = 'none';
    }
};

// postDelete.onclick = function () {
//     postModal.style.display = 'flex';
//     postModalBox.style.display = 'flex';
// };

// postModalCancel.onclick = function () {
//     postModal.style.display = 'none';
//     postModalBox.style.display = 'none';
// };

// commentDelete.onclick = function () {
//     commentModal.style.display = 'flex';
//     commentModalBox.style.display = 'flex';
// };

// commentModalCancel.onclick = function () {
//     commentModal.style.display = 'none';
//     commentModalBox.style.display = 'none';
// };

postModify.onclick = function () {
    const path = window.location.pathname;
    const parts = path.split('/');
    const postId = parts[2];

    location.href = `http://localhost:3000/posts/${postId}`;
};

// commentModify.onclick = function () {
//     commentArea.value = '댓글 내용';
// };

addCommentBtn.onclick = () => {
    const path = window.location.pathname;
    const parts = path.split('/');
    const postId = parts[2];
    const data = { userId: userId, comment: commentArea.value };
    fetch(`http://localhost:3000/posts/${postId}/comment`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(req => req.json())
        .then(data => console.log(data));
    window.location.reload();
};

likeBtn.onclick = () => {
    //좋아요 수가 늘어났을 때 다시 저장하는 부분 아직 안만들었음
    let like = parseInt(likeCount.textContent);
    console.log(likeCount.textContent);
    if (++like >= 1000) {
        like /= 1000;
        likeCount.textContent = `${like}k`;
    }
    console.log(like);
};
