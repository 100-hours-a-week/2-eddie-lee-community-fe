import styled from 'styled-components';
import { InputLabel, HelperText, InputField } from '../components/InputFields';
import TextLink from '../components/TextLink';
import SelectProfileImg from '../components/ProfileImage';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    isValidEmail,
    isValidPassword,
    isValidNickname,
    isDuplicate,
} from '../utils/validation';
import config from '../config';
import { SetMainButton } from '../components/Button';

const SignupArticle = styled.article`
    width: 40%;
    display: flex;
    background-color: transparent;
    flex-direction: column;
    margin: 0 auto;
`;
const SignupTitle = styled.h1`
    font-size: 2rem;
    margin-top: 5%;
    text-align: center;
    color: #000;
    margin-bottom: 10%;
`;

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [checkPasswd, setCheckPasswd] = useState('');
    const [nickname, setNickname] = useState('');
    const [emailHelperText, setEmailHelperText] =
        useState('*이메일을 입력해주세요.');
    const [passwordHelperText, setPasswordHelperText] =
        useState('*비밀번호를 입력해주세요.');
    const [checkPasswdHelperText, setCheckPasswdHelperText] = useState(
        '*비밀번호를 한번 더 입력해주세요.',
    );
    const [nicknameHelperText, setNicknameHelperText] =
        useState('*닉네임을 입력해주세요.');
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validCheckPasswd, setValidCheckPasswd] = useState(false);
    const [validNickname, setValidNickname] = useState(false);
    const [signupOk, setSignupOk] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    //email helperText
    useEffect(() => {
        setValidEmail(false);
        if (email.length === 0) {
            setEmailHelperText('*이메일을 입력해주세요.');
        } else if (!isValidEmail(email) || email.length < 6) {
            setEmailHelperText(
                '*올바른 이메일 주소 형식을 입력해주세요.\n(예: example@example.com)',
            );
        } else {
            setEmailHelperText('');
        }
    }, [email]);

    //passwd helperText
    useEffect(() => {
        setValidPassword(false);
        if (passwd.length === 0) {
            setPasswordHelperText('*비밀번호를 입력해주세요.');
        } else if (!isValidPassword(passwd)) {
            setPasswordHelperText(
                '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.',
            );
        } else if (passwd !== checkPasswd) {
            setPasswordHelperText('*비밀번호가 다릅니다.');
        } else {
            setPasswordHelperText('');
            setCheckPasswdHelperText('');
            setValidPassword(true);
            setValidCheckPasswd(true);
        }
    }, [passwd]);

    //check passwd helperText
    useEffect(() => {
        setValidPassword(false);
        if (checkPasswd.length === 0) {
            setCheckPasswdHelperText('*비밀번호를 한번 더 입력해주세요.');
        } else if (checkPasswd !== passwd) {
            setCheckPasswdHelperText('*비밀번호가 다릅니다.');
        } else {
            setCheckPasswdHelperText('');
            setPasswordHelperText('');
            setValidPassword(true);
            setValidCheckPasswd(true);
        }
    }, [checkPasswd]);

    //nickname helperText
    useEffect(() => {
        setValidNickname(false);
        if (nickname.length === 0) {
            setNicknameHelperText('*닉네임을 입력해주세요.');
        } else if (!isValidNickname(nickname) && nickname.length < 10) {
            setNicknameHelperText('*띄어쓰기를 없애주세요.');
        } else if (!isValidNickname(nickname) && nickname.length > 10) {
            setNicknameHelperText('*닉네임은 최대 10자까지 작성가능합니다.');
        } else {
            setNicknameHelperText('');
        }
    }, [nickname]);

    //email duplicate
    const handleEmailBlur = async () => {
        if(emailHelperText !== ''){
            return;
        }
        if ((await isDuplicate(email, 'email'))) {
            setEmailHelperText('*중복된 이메일입니다.');
        } else {
            setValidEmail(true);
        }
    };

    //nickname duplicate
    const handleNicknameBlur = async () => {
        if (
            nicknameHelperText === '' &&
            (await isDuplicate(nickname, 'nickname'))
        ) {
            setNicknameHelperText('*중복된 닉네임입니다.');
        } else {
            setValidNickname(true);
        }
    };

    useEffect(() => {
        if (validEmail && validPassword && validNickname && validCheckPasswd) {
            setSignupOk(true);
        }
    }, [validEmail, validPassword, validCheckPasswd, validNickname]);

    const handleFile = fileData => {
        setProfileImage(fileData);
    };

    const handleSignup = async () => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('passwd', btoa(passwd));
        formData.append('nickname', nickname);
        formData.append('profileImg', profileImage);

        await fetch(`${config.API_URL}/auth/signup`, {
            method: 'POST',
            body: formData,
        }).then(res => {
            if (!res.ok) {
                throw new Error('save data failed');
            }
            return res.json();
        });

        navigate('/auth/login');
    };
    const handleTextLink = () => {
        navigate('/auth/login');
    };
    return (
        <SignupArticle>
            <SignupTitle>회원가입</SignupTitle>
            <InputLabel label="프로필 사진" />
            <HelperText label="*프로필 사진을 추가해주세요." />
            <SelectProfileImg onFileChange={handleFile} />
            <InputLabel label={'이메일*'} />
            <InputField
                placeholder={'이메일을 입력하세요'}
                type={'email'}
                name={'email'}
                inputListener={e => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
            />
            <HelperText label={emailHelperText} />
            <InputLabel label={'비밀번호*'} />
            <InputField
                placeholder={'비밀번호를 입력하세요'}
                type={'password'}
                name={'passwd'}
                inputListener={e => setPasswd(e.target.value)}
            />
            <HelperText label={passwordHelperText} />
            <InputLabel label={'비밀번호 확인*'} />
            <InputField
                placeholder={'비밀번호를 한번 더 입력하세요'}
                type={'password'}
                name={'checkPasswd'}
                inputListener={e => setCheckPasswd(e.target.value)}
            />
            <HelperText label={checkPasswdHelperText} />
            <InputLabel label={'닉네임*'} />
            <InputField
                placeholder={'닉네임을 입력하세요'}
                type={'text'}
                name={'nickname'}
                inputListener={e => setNickname(e.target.value)}
                onBlur={handleNicknameBlur}
            />
            <HelperText label={nicknameHelperText} />
            <SetMainButton
                label={'회원가입'}
                onClick={handleSignup}
                valid={signupOk}
            />
            <TextLink label={'로그인하러 가기'} onClick={handleTextLink} />
        </SignupArticle>
    );
}

export default Signup;
