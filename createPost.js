let submitBtn = document.getElementById('submitBtn');
let inputTitle = document.getElementById('inputTitle');
let inputContent = document.getElementById('inputContent');

submitBtn.onclick = function () {
    if (inputTitle.value.length === 0 && inputContent.value.length === 0) {
        alert('제목, 내용을 모두 작성해주세요');
    }
};

inputTitle.onkeydown = function () {
    if (inputTitle.value.length !== 0 && inputContent.value.length !== 0) {
        submitBtn.style.backgroundColor = '#7F6AEE';
    }
};
inputContent.onkeydown = function () {
    if (inputTitle.value.length !== 0 && inputContent.value.length !== 0) {
        submitBtn.style.backgroundColor = '#7F6AEE';
    }
};
