let usrProfileBox = document.getElementById('usrProfileBox');
let dropdown = document.getElementById('dropdown');
let submitBtn = document.getElementById('submitBtn');
let postForm = document.getElementById('postForm');
let inputTitle = document.getElementById('inputTitle');
let inputContent = document.getElementById('inputContent');
let inputImg = document.getElementById('inputImg');

usrProfileBox.onclick = function () {
    if (dropdown.style.display == 'none') {
        dropdown.style.display = 'flex';
        dropdown.style.flexDirection = 'column';
    } else {
        dropdown.style.display = 'none';
    }
};

postForm.onsubmit = () => {
    let formData = new FormData();
    const path = window.location.pathname;
    const parts = path.split('/');
    const postId = parts[2];
    history.pushState(null, '', `/posts/${postId}/info`);
    fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PATCH',
        body: formData,
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            fetch(`http://localhost:3000/posts/${postId}/info`)
                .then(res => res.text())
                .then(html => {
                    document.open();
                    document.write(html);
                    document.close();
                });
        })
        .catch(error => console.error(error));
};
