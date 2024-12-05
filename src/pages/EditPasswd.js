import styled from "styled-components";
import {InputLabel, InputField, HelperText} from "../components/InputFields";
import {SetMainButton} from "../components/Button";
import {useEffect, useState} from "react";
import {isValidPassword} from "../utils/validation";
import config from "../config";
import Toast from "../components/Toast";

const EditPasswdArticle = styled.article`
    display: flex;
    width: 25%;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto 0;
`

const Title = styled.h1`
    font-size: 32px;
    color: black;
    text-align: center;
    margin-top: 20%;
    margin-bottom: 20%;
`

function EditPasswd(){
    const [validState, setValidState] = useState(false);
    const [passwd, setPasswd] = useState('');
    const [checkPasswd, setCheckPasswd] = useState('');
    const [validPasswd, setValidPasswd] = useState(false);
    const [validCheckPasswd, setValidCheckPasswd] = useState(false);
    const [passwdHelperText, setPasswdHelperText] = useState('*비밀번호를 입력해주세요');
    const [checkPasswdHelperText, setCheckPasswdHelperText] = useState('*비밀번호를 한번 더 입력해주세요');
    const [viewToast, setViewToast] = useState(false);

    useEffect(() => {
        setValidPasswd(false);
        if(passwd.length === 0) {setPasswdHelperText('*비밀번호를 입력해주세요.')}
        else if(!isValidPassword(passwd)){setPasswdHelperText('*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.')}
        else if(passwd !== checkPasswd){setPasswdHelperText('*비밀번호가 다릅니다.')}
        else {
            setPasswdHelperText('');
            setCheckPasswdHelperText('');
            setValidPasswd(true);
            setValidCheckPasswd(true);
        }
    },[passwd]);
    useEffect(() => {
        setValidPasswd(false);
        if(checkPasswd.length === 0){
            setCheckPasswdHelperText('*비밀번호를 한번 더 입력해주세요.');
        } else if(checkPasswd !== passwd){
            setCheckPasswdHelperText('*비밀번호가 다릅니다.');
        } else {
            setCheckPasswdHelperText('');
            setPasswdHelperText('');
            setValidPasswd(true);
            setValidCheckPasswd(true);
        }
    }, [checkPasswd]);

    useEffect(() => {
        if(validPasswd && validCheckPasswd){
            setValidState(true);
        } else {
            setValidState(false);
        }
    }, [validPasswd, validCheckPasswd]);

    const handleSubmit = async() =>{
        const formData = new FormData();
        formData.append('modifyPasswd', btoa(passwd));
        await fetch(`${config.API_URL}/users/passwd`, {
            method: 'PATCH',
            body: formData,
            credentials: 'include',
        }).then(res => {
            if(!res.ok) {throw new Error('Failed to modify passwd');}
            return res.json();
        });

        setViewToast(true);
        setTimeout(() => setViewToast(false), 3000);
    }

    return (
        <EditPasswdArticle>
            <Title>비밀번호 수정</Title>
            <InputLabel label={'비밀번호'}/>
            <InputField placeholder={'비밀번호를 입력하세요'} inputListener={e => setPasswd(e.target.value)} type={'password'}/>
            <HelperText label={passwdHelperText}/>
            <InputLabel label={'비밀번호 확인'}/>
            <InputField placeholder={'비밀번호를 한번 더 입력하세요'} inputListener={e => setCheckPasswd(e.target.value)} type={'password'}/>
            <HelperText label={checkPasswdHelperText}/>
            <SetMainButton label={'수정하기'} onClick={handleSubmit} valid={validState}/>
            {viewToast && <Toast/>}
        </EditPasswdArticle>
    )
}

export default EditPasswd;