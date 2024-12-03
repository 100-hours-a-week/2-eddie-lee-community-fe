import styled from "styled-components";
import {InputLabel, HelperText, InputField} from "../components/InputFields";
import TextLink from "../components/TextLink";
import * as Button from "../components/Button";
import SelectProfileImg from "../components/ProfileImage";
import {useNavigate} from "react-router-dom";

const SignupArticle = styled.article`
    width: 40%;
    display: flex;
    background-color: transparent;
    flex-direction: column;
    margin: 0 auto;
`
const SignupTitle = styled.h1`
    font-size: 32px;
    margin-top: 5%;
    text-align: center;
    color: #000;
    margin-bottom: 10%;
`

function Signup() {
    const navigate = useNavigate();
    const handleSignup = () => {
        navigate('/auth/login');
    }
    const handleTextLink = () => {
        navigate('/auth/login');
    }
    return(
        <SignupArticle>
            <SignupTitle>회원가입</SignupTitle>
            <InputLabel label='프로필 사진'/>
            <HelperText label='*프로필 사진을 추가해주세요.'/>
            <SelectProfileImg name={'profileImg'}/>
            <InputLabel label={'이메일*'}/>
            <InputField placeholder={'이메일을 입력하세요'} type={'email'} name={'email'}/>
            <HelperText label={'*이메일을 입력해주세요.'}/>
            <InputLabel label={'비밀번호*'}/>
            <InputField placeholder={'비밀번호를 입력하세요'} type={'password'} name={'passwd'}/>
            <HelperText label={'*비밀번호를 입력해주세요.'}/>
            <InputLabel label={'비밀번호 확인*'}/>
            <InputField placeholder={'비밀번호를 한번 더 입력하세요'} type={'password'} name={'checkPasswd'}/>
            <HelperText label={'*비밀번호를 한번 더 입력해주세요.'}/>
            <InputLabel label={'닉네임*'}/>
            <InputField placeholder={'닉네임을 입력하세요'} type={'text'} name={'nickname'}/>
            <HelperText label={'*닉네임을 입력해주세요.'}/>
            <Button.SetMainButton label={'회원가입'} onClick={handleSignup}/>
            <TextLink label={'로그인하러 가기'} onClick={handleTextLink}/>
        </SignupArticle>
    )
}

export default Signup;