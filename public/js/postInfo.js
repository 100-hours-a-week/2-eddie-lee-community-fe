import config from '../config.js';

const postModify = document.getElementById('postModify');
const postDelete = document.getElementById('postDelete');
const postModal = document.getElementById('postModal');
const postModalBox = document.getElementById('postModalBox');
const postModalCancel = document.getElementById('postModalCancel');
const postModalOk = document.getElementById('postModalOk');
const usrProfileBox = document.getElementById('usrProfileBox');
const commentModal = document.getElementById('commentModal');
const commentModalBox = document.getElementById('commentModalBox');
const commentModalCancel = document.getElementById('commentModalCancel');
const commentModalOk = document.getElementById('commentModalOk');
const commentArea = document.getElementById('commentArea');
const addCommentBtn = document.getElementById('addCommentBtn');
const likeBtn = document.getElementById('likeBtn');
const likeCount = document.getElementById('likeCount');
const viewCount = document.getElementById('viewCount');
const commentCount = document.getElementById('commentCount');
const postInfoArticle = document.getElementById('postInfoArticle');
const profileImg = document.getElementById('profileImg');
const editorNickname = document.getElementById('editorNickname');
const timestamp = document.getElementById('timestamp');
const postPhoto = document.getElementById('postPhoto');
const postContent = document.getElementById('postContent');
const userProfile = document.getElementById('userProfile');
const modifyCommentBtn = document.getElementById('modifyCommentBtn');
const modifyUserInfoLink = document.getElementById('modifyUserInfoLink');
const modifyPasswdLink = document.getElementById('modifyPasswdLink');
const logoutLink = document.getElementById('logoutLink');

const backURL = config.BASE_URL;
const frontURL = config.FRONT_URL;

const numericalPrefix = number => {
    if (number > 999) {
        return `${parseInt(number / 1000)}k`;
    } else {
        return number;
    }
};

const commentIsEmpty = commentLength => {
    if (commentLength === 0) {
        return '#ACA0EB';
    } else {
        return '#7F6AEE';
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    const userData = await fetch(`${backURL}/users/session`, {
        method: 'GET',
        credentials: 'include',
    }).then(async res => {
        const data = await res.json();
        if (res.ok) {
            return data;
        } else {
            throw new Error(`Get session failed..`);
        }
    });
    userProfile.src = `${backURL}${userData.profile_img}`;
    const url = window.location.pathname;
    const postId = url.split('/')[2];

    modifyUserInfoLink.href = `${frontURL}/users/`;
    modifyPasswdLink.href = `${frontURL}/users/passwd`;
    logoutLink.href = `${frontURL}/auth/login`;
    //조회 수 증가
    await fetch(`${backURL}/posts/${postId}/view`, {
        method: 'PATCH',
    })
        .then(res => {
            if (res.ok) {
                console.log(
                    `status code: ${res.status}, message: ${res.json()}`,
                );
            } else {
                console.error(
                    `status code: ${res.status}, message: ${res.json()}`,
                );
            }
        })
        .catch(err => console.error(err));
    const postData = await fetch(`${backURL}/data/posts/${postId}`)
        .then(async res => {
            const data = await res.json();
            if (res.ok) {
                return data;
            } else {
                throw new Error(`Get post data failed..`);
            }
        })
        .catch(err => console.error(err));

    postTitle.textContent = postData.title;
    //프로필 이미지 경로 수정
    profileImg.src = postData.profile_img;
    editorNickname.textContent = postData.nickname;
    timestamp.textContent = postData.timestamp;
    if (userData.user_id !== postData.user_id) {
        postModify.style.display = 'none';
        postDelete.style.display = 'none';
    } else {
        postModify.onclick = function () {
            const path = window.location.pathname;
            const parts = path.split('/');
            const postId = parts[2];

            location.href = `${frontURL}/posts/${postId}`;
        };
        postDelete.onclick = function () {
            postModal.style.display = 'flex';
            postModalBox.style.display = 'flex';
        };
        postModalCancel.onclick = function () {
            postModal.style.display = 'none';
            postModalBox.style.display = 'none';
        };
        postModalOk.onclick = async function () {
            await fetch(`${backURL}/posts/${postId}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));

            commentModal.style.display = 'none';
            commentModalBox.style.display = 'none';

            location.href = `${frontURL}/posts`;
        };
    }

    postPhoto.src = postData.image;
    postContent.textContent = postData.content;

    let like = postData.like;
    let view = postData.view;
    let comment = postData.comment_count;

    likeBtnEventListener(postId);

    likeCount.textContent = numericalPrefix(like);

    viewCount.textContent = numericalPrefix(view);

    commentCount.textContent = numericalPrefix(comment);

    const getComments = await fetch(`${backURL}/posts/${postId}/comments`)
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

        commentEditorBox.appendChild(profileImgBox);
        commentEditorBox.appendChild(editorNickname);
        commentEditorBox.appendChild(time);

        if (comment.user_id === userData.user_id) {
            const btnBox = document.createElement('div');
            btnBox.classList.add('modifyAndDeleteBtnBox');

            const modifyBtn = document.createElement('button');
            modifyBtn.classList.add('modifyAndDeleteBtn');
            modifyBtn.id = `commentModify-${comment.comment_id}`;
            modifyBtn.textContent = '수정';

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('modifyAndDeleteBtn');
            deleteBtn.id = `commentDelete-${comment.comment_id}`;
            deleteBtn.textContent = '삭제';

            btnBox.appendChild(modifyBtn);
            btnBox.appendChild(deleteBtn);

            commentEditorBox.appendChild(btnBox);
            modifyBtn.onclick = async () => {
                const commentData = await fetch(
                    `${backURL}/posts/${postId}/comments/${comment.comment_id}`,
                )
                    .then(res => res.json())
                    .catch(error => console.error(error));
                commentArea.value = commentData.comment_content;
                addCommentBtn.classList.add('hide');
                modifyCommentBtn.classList.remove('hide');
                patchComment(commentData);
            };

            deleteBtn.onclick = function () {
                commentModal.style.display = 'flex';
                commentModalBox.style.display = 'flex';
            };
            commentModalCancel.onclick = function () {
                commentModal.style.display = 'none';
                commentModalBox.style.display = 'none';
            };
            commentModalOk.onclick = async () => {
                await fetch(
                    `${backURL}/posts/${postId}/comments/${comment.comment_id}`,
                    {
                        method: 'DELETE',
                    },
                )
                    .then(res => res.json())
                    .then(data => console.log(data))
                    .catch(error => console.error(error));

                commentModal.style.display = 'none';
                commentModalBox.style.display = 'none';
                window.location.reload();
            };
        }

        const commentContent = document.createElement('p');
        commentContent.classList.add('commentContent');
        commentContent.textContent = comment.comment_content;

        newComment.appendChild(commentEditorBox);
        newComment.appendChild(commentContent);

        postInfoArticle.appendChild(newComment);
    });
});

commentArea.onkeyup = () => {
    const btnColor = commentIsEmpty(commentArea.value.length);
    addCommentBtn.style.backgroundColor = btnColor;
};

usrProfileBox.onclick = function () {
    if (dropdown.style.display == 'none') {
        dropdown.style.display = 'flex';
        dropdown.style.flexDirection = 'column';
    } else {
        dropdown.style.display = 'none';
    }
};

addCommentBtn.onclick = async () => {
    const path = window.location.pathname;
    const parts = path.split('/');
    const postId = parts[2];
    const data = { comment: commentArea.value };
    await fetch(`${backURL}/posts/${postId}/comment`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(async res => {
            const statusCode = res.status;
            const resData = await res.json();
            if (res.ok) {
                console.log(`Status Code: ${statusCode}, ResData: ${resData}`);
            } else {
                console.error(
                    `Status Code: ${statusCode}, ResData: ${resData}`,
                );
            }
        })
        .catch(err => console.error('Network Error: ', err));
    window.location.reload();
};

async function patchComment(commentData) {
    modifyCommentBtn.addEventListener(
        'click',
        await function () {
            commentData.comment_content = commentArea.value;
            fetch(
                `${backURL}/posts/${commentData.post_id}/comments/${commentData.comment_id}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify(commentData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
                .then(async res => {
                    const data = res.json();
                    if (res.ok) {
                        return data;
                    } else {
                        throw new Error('comment modify failed..');
                    }
                })
                .then(data => console.log(data))
                .catch(err => console.error(err));
            window.location.reload();
        },
    );
}

async function likeBtnEventListener(postId) {
    likeBtn.addEventListener('click', async function () {
        await fetch(`${backURL}/posts/${postId}/like`, {
            method: 'PATCH',
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`like is not a number, like: ${data.like}`);
                }
            })
            .catch(err => console.error(err));

        const post = fetch(`${backURL}/data/posts/${postId}`)
            .then(async res => {
                const data = await res.json();
                if (res.ok) {
                    likeCount.textContent = numericalPrefix(data.like);
                } else {
                    console.error(data);
                }
            })
            .catch(error => console.error(error));
    });
}
