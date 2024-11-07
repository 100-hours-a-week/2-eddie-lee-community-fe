let usrProfileBox = document.getElementById('usrProfileBox');
let dropdown = document.getElementById('dropdown');
let createPostBtn = document.getElementById('createPostBtn');

usrProfileBox.onclick = function () {
    if (dropdown.style.display == 'none') {
        dropdown.style.display = 'flex';
        dropdown.style.flexDirection = 'column';
    } else {
        dropdown.style.display = 'none';
    }
};

createPostBtn.onclick = () => {
    location.href = 'http://localhost:3000/posts/edit';
};
