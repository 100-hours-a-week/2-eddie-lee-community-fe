import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProfileImg from '../assets/images/profile_img.webp';
import { getImgURL } from '../utils/cdnPath';

const PostDiv = styled.div`
    border-radius: 1rem;
    box-shadow: 3px 4px 4px 0px #cccccc40;
`;

export const PostTitle = styled.h3`
    font-size: 1.5rem;
    margin-left: 10px;
    margin-top: 10%;
    margin-bottom: 0;
`;
const ListAndTime = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
`;

const SocialList = styled.ul`
    display: flex;
    list-style: none;
    margin-right: auto;
    margin-left: 10px;
    padding: 0px;
`;

const SocialListText = styled.li`
    margin-right: 5px;
`;

const Time = styled.p`
    margin-left: auto;
    margin-right: 10px;
`;

export const PostHorizontalRule = styled.hr`
    color: #cccccc;
    width: 100%;
`;

const Editor = styled.div`
    display: flex;
    align-items: center;
    padding: ${props => props.padding || '15px'};
`;

const ProfileImgBox = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 70%;
    overflow: hidden;
`;

const ProfileImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const EditorNickname = styled.p`
    margin: 10px;
    font-size: 1.25rem;
`;

const SetSocialListText = ({ label, inputValue }) => {
    const [value, setValue] = useState(inputValue);
    useEffect(() => {
        if (value > 999) {
            setValue(`${value / 1000}k`);
        }
    }, []);
    return (
        <SocialListText>
            {label} {value}
        </SocialListText>
    );
};

export const EditorInfo = ({ profileImg, nickname, padding }) => {
    return (
        <Editor padding={padding}>
            <ProfileImgBox>
                <ProfileImg
                    src={getImgURL(profileImg)}
                    alt={defaultProfileImg}
                />
            </ProfileImgBox>
            <EditorNickname>{nickname}</EditorNickname>
        </Editor>
    );
};

function PostLists({ postData }) {
    useEffect(() => {
        if (postData.profileImg) {
            setProfileSrc(postData.profileImg);
        }
    }, [postData.profileImg]);

    const [profileSrc, setProfileSrc] = useState(defaultProfileImg);
    const navigate = useNavigate();
    const handlePostInfo = () => {
        navigate(`/posts/${postData.id}/info`, { state: postData.id });
    };
    return (
        <PostDiv onClick={handlePostInfo}>
            <PostTitle>{postData.title}</PostTitle>
            <ListAndTime>
                <SocialList>
                    <SetSocialListText
                        label={'좋아요'}
                        inputValue={postData.likes}
                    />
                    <SetSocialListText
                        label={'댓글'}
                        inputValue={postData.comment_counts}
                    />
                    <SetSocialListText
                        label={'조회수'}
                        inputValue={postData.views}
                    />
                </SocialList>
                <Time>{postData.timestamp}</Time>
            </ListAndTime>
            <PostHorizontalRule />
            <EditorInfo profileImg={profileSrc} nickname={postData.nickname} />
        </PostDiv>
    );
}

export default PostLists;
