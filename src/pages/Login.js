import styled from "styled-components"
import {InputField, HelperText, InputLabel} from "../components/InputFields"
import TextLink from "../components/TextLink"
import {SetMainButton} from "../components/Button"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {isValidEmail, isValidPassword} from "../utils/validation";
import {useAtom} from "jotai";
import config from "../config";
import {profileImgAtom, userIdAtom} from "../state/atom";

const LoginTitleStyle = styled.h1`
    font-size: 32px;
    margin-top: 10%;
    text-align: center;
    color: #000;
    margin-bottom: 30px;`

const LoginArticle = styled.article`
    width: 40%;
    display: flex;
    background-color: transparent;
    flex-direction: column;
    margin: 0 auto;
`

const LoginTitle = ()=> {
    return (
        <LoginTitleStyle>로그인</LoginTitleStyle>
    )
}

const InputEmailLabel = () => {
    return (
        <InputLabel label="이메일"/>
    )
}

const InputPasswdLabel = () => {
    return <InputLabel label='비밀번호'/>
}

function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('*올바른 이메일 주소 형식을 입력해주세요.\n(예: example@example.com)');
    const [validPassword, setValidPassword] = useState(false);
    const [passwdHelperText, setPasswdHelperText] = useState('*비밀번호를 입력해주세요');
    const [btnColor, setBtnColor] = useState(false);
    const [profileImg, setProfileImg] = useAtom(profileImgAtom);
    const [userId, setUserId] = useAtom(userIdAtom);
    const navigate = useNavigate();

    useEffect(() => {
        if(validEmail && validPassword) {setBtnColor(true)}
    }, [validEmail, validPassword]);

    const handleEmailChange = e => {
        const value = e.target.value;
        setEmail(value);
        if(value.length >= 6 && isValidEmail(value)){
            setEmailHelperText('');
            setValidEmail(true)
        } else {
            setEmailHelperText('*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)');
        }


    }

    const handlePasswordChange = e => {
        const value = e.target.value;
        setPassword(value);
        if(value.length === 0){
            setPasswdHelperText('*비밀번호를 입력해주세요');
        } else if(!isValidPassword(value)){
            setPasswdHelperText('*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.');
        } else {
            setPasswdHelperText('');
            setValidPassword(true)
        }
    }

    const handleClick = () =>{
        navigate('/auth/signup');
    }
    const handleLogin = async (e) =>{
        e.preventDefault();
        try {
            if (validEmail && validPassword) {
                const formData = new FormData();
                formData.append("email", email);
                formData.append("passwd", btoa(password));
                const loginResponse = await fetch(`${config.API_URL}/auth/login`, {
                    method: 'POST',
                    body: formData,
                    credentials: "include",
                });
                if(loginResponse.ok){
                    try{
                        const userData = await fetch(`${config.API_URL}/users/session`, {
                            method: 'GET',
                            credentials: "include",
                        }).then(res => res.json());
                        if(userData.profileImg) {setProfileImg(`${config.API_URL}${userData.profileImg}`);}
                        setUserId(userData.user_id);
                        navigate('/posts');
                    } catch(err){console.log('get session failed..' + err)}
                } else {
                    setPasswdHelperText('*아이디 또는 비밀번호를 확인해주세요.');
                }
            }
        }catch(err){
            console.error(err.message);
        }
    }
    return (
        <LoginArticle>
            <LoginTitle/>
            <InputEmailLabel/>
            <InputField inputListener={handleEmailChange} value={email} placeholder={'이메일을 입력해주세요.'} type="email" />
            <HelperText label={emailHelperText}/>
            <InputPasswdLabel/>
            <InputField inputListener={handlePasswordChange} value={password} placeholder={'비밀번호를 입력해주세요.'} type="password" />
            <HelperText label={passwdHelperText}/>
            <SetMainButton label="로그인" onClick={handleLogin} valid={btnColor}/>
            <TextLink label='회원가입' onClick={handleClick}/>
        </LoginArticle>
    )
}

export default Login;