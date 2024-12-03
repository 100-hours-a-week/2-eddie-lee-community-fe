import styled from "styled-components";
import SelectProfileImg from "../components/ProfileImage";
import {HelperText, InputField, InputLabel} from "../components/InputFields";
import TextLink from "../components/TextLink";
import {SetMainButton} from "../components/Button";

const EditUserArticle = styled.article`
    display: flex;
    flex-direction: column;
    width: 30%;
    justify-content: center;
    margin: 0 auto 0;
`

const Title = styled.h1`
    font-size: 32px;
    color: black;
    text-align: center;
    margin-top: 20%;
`

function EditUser(){
    const handleSubmit = () => {}
    const handleDeleteUser = () => {}
    return (
        <EditUserArticle>
            <Title>회원정보 수정</Title>
            <InputLabel label={'프로필 사진*'}/>
            <SelectProfileImg filter={true}/>
            <InputLabel label={'이메일'}/>
            <TextLink label={'example@example.com'}/>
            <InputLabel label={'닉네임'}/>
            <InputField placeholder={'nickname'}/>
            <HelperText label={'*닉네임을 입력해주세요.'}/>
            <SetMainButton label={'수정하기'} onClick={handleSubmit}/>
            <TextLink label={'회원 탈퇴'} onClick={handleDeleteUser}/>
        </EditUserArticle>
    )
}

export default EditUser;