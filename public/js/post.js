let usrProfileBox = document.getElementById('usrProfileBox');
let dropdown = document.getElementById('dropdown');
let createPostBtn = document.getElementById('createPostBtn');
let postContentDiv = document.getElementsByClassName('postContentDiv');

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
