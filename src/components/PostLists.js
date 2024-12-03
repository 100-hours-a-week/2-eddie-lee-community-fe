import styled from "styled-components";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const PostDiv = styled.div`
    border-radius: 16px;
    box-shadow: 3px 4px 4px 0px #cccccc40;
`

export const PostTitle = styled.h3`
    font-size: 24px;
    margin-left: 10px;
    margin-top: 10%;
    margin-bottom: 0;
`
const ListAndTime = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
`

const SocialList = styled.ul`
    display: flex;
    list-style: none;
    margin-right: auto;
    margin-left: 10px;
    padding: 0px;
`

const SocialListText = styled.li`
    margin-right: 5px;
`

const Time = styled.p`
    margin-left: auto;
    margin-right: 10px;
`

export const PostHorizontalRule = styled.hr`
    color: #cccccc;
    width: 100%;
`

const Editor = styled.div`
    display: flex;
    align-items: center;
    padding: ${(props) => props.padding || "15px"};
`

const ProfileImgBox = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 70%;
    overflow: hidden;
`

const ProfileImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const EditorNickname = styled.p`
    margin: 10px;
    font-size: 20px;
`

const SetSocialListText = ({label, inputValue}) =>{
    const [value, setValue] = useState(inputValue);
    useEffect(()=>{
        if(value > 999){
            setValue(`${(value/1000)}k`);
        }
    },[]);
    return(
        <SocialListText>{label} {value}</SocialListText>
    )
}

export const EditorInfo = ({profileImg, nickname, padding}) =>{
    return (
        <Editor padding={padding}>
            <ProfileImgBox>
                <ProfileImg src={profileImg} />
            </ProfileImgBox>
            <EditorNickname>{nickname}</EditorNickname>
        </Editor>
    )
}

function PostLists({postData}){
    const navigate = useNavigate();
    const handlePostInfo = () =>{
        navigate(`/posts/${postData.id}/info`, {state: postData});
    }
    return (
        <PostDiv key={postData.id} onClick={handlePostInfo}>
            <PostTitle>{postData.title}</PostTitle>
            <ListAndTime>
                <SocialList>
                    <SetSocialListText label={'좋아요'} inputValue={postData.likes}/>
                    <SetSocialListText label={'댓글'} inputValue={postData.comment_counts}/>
                    <SetSocialListText label={'조회수'} inputValue={postData.views}/>
                </SocialList>
                <Time>{postData.timestamp}</Time>
            </ListAndTime>
            <PostHorizontalRule/>
            <EditorInfo profileImg={postData.profileImg} nickname={postData.nickname}/>
        </PostDiv>
    )
}

export default PostLists;