let modifyBtn = document.getElementById('modifyBtn');
let toast = document.getElementById('toast');
let deleteProfile = document.getElementById('deleteProfile');
let deleteProfileCancelBtn = document.getElementById('deleteProfileCancelBtn');
let deleteProfileOkBtn = document.getElementById('deleteProfileOkBtn');
let deleteProfileModal = document.getElementById('deleteProfileModal');
let deleteProfileModalBox = document.getElementById('deleteProfileModalBox');

const disableToast = function () {
    toast.style.display = 'none';
};

const createToast = function () {
    toast.style.display = 'inline';
    setTimeout(disableToast, 3000);
    return;
};

modifyBtn.onclick = async (req, res) => {
    await createToast();
};

deleteProfile.onclick = function () {
    deleteProfileModal.style.display = 'flex';
    deleteProfileModalBox.style.display = 'flex';
};

deleteProfileCancelBtn.onclick = function () {
    deleteProfileModal.style.display = 'none';
    deleteProfileModalBox.style.display = 'none';
};
