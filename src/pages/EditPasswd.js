import styled from "styled-components";
import {InputLabel, InputField, HelperText} from "../components/InputFields";
import {SetMainButton} from "../components/Button";

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

    const handleSubmit = () =>{

    }

    return (
        <EditPasswdArticle>
            <Title>비밀번호 수정</Title>
            <InputLabel label={'비밀번호'}/>
            <InputField placeholder={'비밀번호를 입력하세요'}/>
            <HelperText label={'*비밀번호를 입력해주세요'}/>
            <InputLabel label={'비밀번호 확인'}/>
            <InputField placeholder={'비밀번호를 한번 더 입력하세요'}/>
            <HelperText label={'*비밀번호를 입력해주세요'}/>
            <SetMainButton label={'수정하기'} onClick={handleSubmit}/>
        </EditPasswdArticle>
    )
}

export default EditPasswd;