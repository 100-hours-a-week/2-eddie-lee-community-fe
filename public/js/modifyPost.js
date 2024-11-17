const usrProfileBox = document.getElementById('usrProfileBox');
const usrProfile = document.getElementById('usrProfile');
const dropdown = document.getElementById('dropdown');
const submitBtn = document.getElementById('submitBtn');
const postForm = document.getElementById('postForm');
const inputTitle = document.getElementById('inputTitle');
const inputContent = document.getElementById('inputContent');
const inputImg = document.getElementById('inputImg');

let userId = '';

document.addEventListener('DOMContentLoaded', async (req, res) => {
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

    try {
        const resPostData = await fetch(
            `http://localhost:3000/data/posts/${postId}`,
        );
        const postData = await resPostData.json();

        inputTitle.value = postData.title;
        inputContent.value = postData.content;
        inputImg.src = postData.profile_img;
    } catch (err) {
        res.status(404).json({
            result: '데이터 가져오기 실패',
            message: 'post Id에 따라 post Data가져오는 부분에서 에러 발생',
        });
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

postForm.onsubmit = async event => {
    event.preventDefault();
    const formData = new FormData(postForm);
    const path = window.location.pathname;
    const parts = path.split('/');
    const postId = parts[2];
    await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PATCH',
        body: formData,
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error(error));
    window.location.href = `http://localhost:3000/posts/${postId}/info`;
};
