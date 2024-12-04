import styled from "styled-components";
import {HelperText, InputFile, InputLabel, InputPostContent, InputPostTitle} from "../components/InputFields";
import {SetMainButton} from "../components/Button";
import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import config from "../config";

const AddPostTitleBox = styled.div`
    display: flex;
    justify-content: center;
    width: 40%;
    margin: 0 auto;
`

const AddPostTitle = styled.h1`
    font-size: 24px;
    color: black;
`

const AddPostArticle = styled.article`
    width: 40%;
    display: flex;
    background-color: transparent;
    flex-direction: column;
    margin: 0 auto;
`

function EditPost() {
    const {postId} = useParams();
    const [postData, setPostData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(`${config.API_URL}/posts/${postId}/data`, {})
            } catch (err) {
                console.error(err);
            }
        }
    },[])
    const handleSubmit = () => {}
    return (
        <>
            <AddPostTitleBox>
                <AddPostTitle>게시글 수정</AddPostTitle>
            </AddPostTitleBox>
            <AddPostArticle>
                <InputLabel label={"제목*"}/>
                <InputPostTitle placeholder={postData.title}/>
                <InputLabel label={'내용*'}/>
                <InputPostContent placeholder={postData.content}/>
                <HelperText label={'*제목과 내용을 모두 입력해주세요.'}/>
                <InputLabel label={'이미지'}/>
                <InputFile/>
                <SetMainButton label={'수정하기'} onClick={handleSubmit}/>
            </AddPostArticle>
        </>
    )
}

export default EditPost;