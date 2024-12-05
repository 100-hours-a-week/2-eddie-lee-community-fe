import config from '../config';

export const isValidEmail = (email) =>{
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

export const isValidPassword = (passwd) => {
    const passwdPattern =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    return passwdPattern.test(passwd);
}

export const isValidNickname = (nickname) => {
    const nicknamePattern = /^\S{1,10}$/;
    return nicknamePattern.test(nickname);
}

export const isDuplicate = async (inputData, dataType) => {
    const data = await fetch(`${config.API_URL}/auth/duplicate?type=${dataType}&input=${inputData}`)
        .then(async res => {
            if(!res.ok){ throw new Error('check duplicate err')};
            return await res.json();
        });
    console.log(data.data);
    return data.data;
}