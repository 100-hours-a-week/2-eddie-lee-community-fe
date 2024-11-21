import config from '../config.js';

const usrProfileBox = document.getElementById('usrProfileBox');
const dropdown = document.getElementById('dropdown');
const createPostBtn = document.getElementById('createPostBtn');
const postContentArea = document.getElementById('postContentArea');
const userProfile = document.getElementById('userProfile');
const modifyUserInfoLink = document.getElementById('modifyUserInfoLink');
const modifyPasswdLink = document.getElementById('modifyPasswdLink');
const logoutLink = document.getElementById('logoutLink');
//게시글 목록의 요소를 담는 div태그
const postContentDiv = document.getElementsByClassName('postContentDiv');

const baseURL = config.BASE_URL;
const frontURL = config.FRONT_URL;

let contentsCount = 0;
let userId = 0;

document.addEventListener('DOMContentLoaded', async () => {
    modifyUserInfoLink.href = `${frontURL}/users/`;
    modifyPasswdLink.href = `${frontURL}/users/passwd`;
    logoutLink.href = `${frontURL}/auth/login`;
});

//infinite scroll
async function getContents() {
    const postList = await fetch(`${baseURL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ offset: contentsCount }),
    }).then(async res => {
        const data = await res.json();
        if (res.ok) {
            contentsCount = data.offset;
            return data.data;
        } else {
            throw new Error(`Get post list Failed...`);
        }
    });
    postList.forEach(postInfo => {
        const newPost = document.createElement('div');
        newPost.classList.add('postContentDiv');
        newPost.id = postInfo.post_id; // 각 게시물에 고유 ID 부여

        // 제목 요소 생성
        const postTitle = document.createElement('h3');
        postTitle.classList.add('postTitle');
        postTitle.textContent = postInfo.title;

        // 좋아요, 댓글, 조회수, 시간 요소 생성
        const listAndTimeDiv = document.createElement('div');
        listAndTimeDiv.classList.add('listAndTime');

        const socialList = document.createElement('ul');
        socialList.classList.add('socialList');

        const like = document.createElement('li');
        like.classList.add('socialListTxt');
        like.textContent = `좋아요 ${postInfo.like}`;

        const comment = document.createElement('li');
        comment.classList.add('socialListTxt');
        comment.textContent = `댓글 ${postInfo.comment_count}`;

        const view = document.createElement('li');
        view.classList.add('socialListTxt');
        view.textContent = `조회수 ${postInfo.view}`;

        // 소셜 리스트에 좋아요, 댓글, 조회수 항목 추가
        socialList.appendChild(like);
        socialList.appendChild(comment);
        socialList.appendChild(view);

        // 시간 요소 생성
        const time = document.createElement('p');
        time.classList.add('time');
        time.textContent = postInfo.timestamp;

        // listAndTimeDiv에 socialList와 time 추가
        listAndTimeDiv.appendChild(socialList);
        listAndTimeDiv.appendChild(time);

        // 작성자 정보 및 프로필 이미지
        const editorDiv = document.createElement('div');
        editorDiv.classList.add('editor');

        const profileImgBox = document.createElement('div');
        profileImgBox.classList.add('profileImgBox');

        const profileImg = document.createElement('img');
        profileImg.classList.add('profileImg');
        profileImg.src = postInfo.profile_img;

        profileImgBox.appendChild(profileImg);

        const editorNickname = document.createElement('p');
        editorNickname.classList.add('editorNickname');
        editorNickname.textContent = postInfo.nickname;

        // editorDiv에 프로필 이미지와 작성자 닉네임 추가
        editorDiv.appendChild(profileImgBox);
        editorDiv.appendChild(editorNickname);

        // 게시물 구조 생성
        newPost.appendChild(postTitle);
        newPost.appendChild(listAndTimeDiv);
        newPost.appendChild(document.createElement('hr')); // <hr class="postHorizontal-rule">
        newPost.appendChild(editorDiv);

        // 생성된 게시물을 postContentArea에 추가
        postContentArea.appendChild(newPost);
    });
}

getContents();

window.addEventListener('scroll', () => {
    if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
    ) {
        getContents();
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

postContentArea.onclick = () => {
    const post = event.target.closest('.postContentDiv');
    if (post) {
        const postId = post.id;
        location = `${frontURL}/posts/${postId}/info`;
    }
};

createPostBtn.onclick = () => {
    location.href = `${frontURL}/posts/edit`;
};
