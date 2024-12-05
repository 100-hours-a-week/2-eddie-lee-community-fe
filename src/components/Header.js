import React, {useState} from 'react'
import backArrow from '../assets/images/back_arrow.png'
import styled from 'styled-components'
import {useNavigate} from "react-router-dom";
import {useAtomValue} from 'jotai';
import {profileImgAtom} from "../state/atom";

const HeaderBox = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 40%;
    margin: 2% auto 2%;
`

const GoBackBoxStyle = styled.div`
    width: 30px;
    height: 50px;
    justify-self: left;
    overflow: hidden;
    margin: 0;
`

const GoBackLinkStyle = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const HeaderTitle = styled.h1`
    font-size: 32px;
    color: #000;
    width: 100%;
    text-align: center;
    margin: 0;
`

const UserProfileBox = styled.div`
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 70%;
    margin-left: auto;
    padding: 0;
`
const Dropdown = styled.div`
    display: ${(props) => (props.isClicked ? 'block' : 'none')};
    position: absolute;
    background-color: #d9d9d9;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
`

const DropdownContent = styled.a`
    color: black;
    text-decoration: none;
    display: block;
    font-size: 12px;
    padding-inline: 30px;
    padding-block: 15px;

    &:hover{
        background-color: #e9e9e9;
    }
`

const UserProfileImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const HorizontalRule = styled.hr`
    width: 100%;
    height: 1px;
    border: 0;
    background-color: #000;
    margin: 30px auto 0;
`

const GoBackBtn = () => {
    const navigate = useNavigate();
    const handleBack = () =>{
        navigate(-1);
    }
    return (
        <GoBackBoxStyle>
            <a>
                <GoBackLinkStyle src={backArrow} onClick={handleBack}></GoBackLinkStyle>
            </a>
        </GoBackBoxStyle>
    )
}

const ProjectTitle = () => {
    return <HeaderTitle>아무말 대잔치</HeaderTitle>
}

const ProfilePhoto = ({profileImg}) => {
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();
    const handleClick = () =>{
        setIsClicked(!isClicked);
    }

    const handleEditUser = () =>{
        navigate('/users');
    }

    const handleEditUserPasswd = () => {
        navigate('/users/passwd');
    }

    const handleLogout = () => {
        navigate('/auth/login');
    }

    return (
        <UserProfileBox onClick={handleClick}>
            <UserProfileImg src={profileImg} />
            <Dropdown isClicked={isClicked}>
                <DropdownContent onClick={handleEditUser}>회원정보수정</DropdownContent>
                <DropdownContent onClick={handleEditUserPasswd}>비밀번호수정</DropdownContent>
                <DropdownContent onClick={handleLogout}>로그아웃</DropdownContent>
            </Dropdown>
        </UserProfileBox>
    )
}
function Header({pathName}) {
    const profileImg = useAtomValue(profileImgAtom);
    const headerComponent = {
        '/auth/login': <OnlyTitle/>,
        '/auth/signup': <GoBackAndTitle/>,
        '/posts': <ProfileAndTitle profileImg={profileImg}/>,
        '/users': <ProfileAndTitle profileImg={profileImg}/>,
        '/users/passwd': <ProfileAndTitle profileImg={profileImg}/>,
    }

    return headerComponent[pathName] || <GetAllHeader profileImg={profileImg}/>;
}

const OnlyTitle = () => {
    return (
        <>
            <HeaderBox>
                <ProjectTitle/>
            </HeaderBox>
            <HorizontalRule/>
        </>
            )
}

const GoBackAndTitle = () =>{
    return (
        <>
            <HeaderBox>
                <GoBackBtn/>
                <ProjectTitle/>
            </HeaderBox>
            <HorizontalRule/>
        </>
    )
}

const ProfileAndTitle = ({profileImg}) => {
    return (
        <>
            <HeaderBox>
                <ProjectTitle/>
                <ProfilePhoto profileImg={profileImg} />
            </HeaderBox>
            <HorizontalRule/>
        </>
    )
}

const GetAllHeader = ({profileImg}) => {
    return (
        <>
            <HeaderBox>
                <GoBackBtn/>
                <ProjectTitle/>
                <ProfilePhoto profileImg={profileImg}/>
            </HeaderBox>
            <HorizontalRule/>
        </>
    )
}
export default Header;
