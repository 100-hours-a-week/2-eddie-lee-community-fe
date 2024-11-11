let usrProfileBox = document.getElementById('usrProfileBox');
let dropdown = document.getElementById('dropdown');
let createPostBtn = document.getElementById('createPostBtn');
let postContentArea = document.getElementById('postContentArea');
//게시글 목록의 요소를 담는 div태그
let postContentDiv = document.getElementsByClassName('postContentDiv');

let contentsCount = 0;

//infinite scroll
function getContents() {
    for (let i = 0; i < 10; i++) {
        const newPost = document.createElement('div');
        newPost.classList.add('postContentDiv');
        newPost.id = contentsCount; // 각 게시물에 고유 ID 부여

        // 제목 요소 생성
        const postTitle = document.createElement('h3');
        postTitle.classList.add('postTitle');
        postTitle.textContent = `제목 ${contentsCount}`;

        // 좋아요, 댓글, 조회수, 시간 요소 생성
        const listAndTimeDiv = document.createElement('div');
        listAndTimeDiv.classList.add('listAndTime');

        const socialList = document.createElement('ul');
        socialList.classList.add('socialList');

        const like = document.createElement('li');
        like.classList.add('socialListTxt');
        like.textContent = `좋아요 ${contentsCount}`;

        const comment = document.createElement('li');
        comment.classList.add('socialListTxt');
        comment.textContent = `댓글 ${contentsCount}`;

        const view = document.createElement('li');
        view.classList.add('socialListTxt');
        view.textContent = `조회수 ${contentsCount}`;

        // 소셜 리스트에 좋아요, 댓글, 조회수 항목 추가
        socialList.appendChild(like);
        socialList.appendChild(comment);
        socialList.appendChild(view);

        // 시간 요소 생성
        const time = document.createElement('p');
        time.classList.add('time');
        time.textContent = '2024-11-11 01:11:11';

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
        profileImg.src = '/public/images/profile_img.webp';

        profileImgBox.appendChild(profileImg);

        const editorNickname = document.createElement('p');
        editorNickname.classList.add('editorNickname');
        editorNickname.textContent = `작성자 ${contentsCount}`;

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

        contentsCount++; // 게시물 번호 증가
    }
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

Array.from(postContentDiv).forEach(post => {
    post.addEventListener('click', function () {
        let postId = post.id;
        history.pushState(null, '', `/posts/${postId}/info`);
        fetch(`http://localhost:3000/posts/${postId}/info`)
            .then(res => res.text())
            .then(html => {
                document.open();
                document.write(html);
                document.close();
            });
    });
});

createPostBtn.onclick = () => {
    location.href = 'http://localhost:3000/posts/edit';
};
