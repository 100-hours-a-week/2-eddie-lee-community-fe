import styled from "styled-components";
import {HelperText, InputFile, InputLabel, InputPostContent, InputPostTitle} from "../components/InputFields";
import {SetMainButton} from "../components/Button";
import {useLocation, useNavigate, useParams} from "react-router-dom";
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
    const location = useLocation();
    const {postId} = useParams();
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if(title.length !== 0 && content.length !== 0){
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    },[title, content]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    useEffect(() => {
        setTitle(location.state.title);
        setContent(location.state.content);
    },[])
    const handleSubmit = async () => {
        if(!isValid){ return; }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("inputImg", selectedFile);
        await fetch(`${config.API_URL}/posts/${postId}`, {
            method: "PATCH",
            body: formData,
            credentials: "include",
        }).then(res => {
            if(!res.ok){
                throw new Error("Failed to modify post");
            }
            return res.json();
        })
        navigate('/posts');
    }
    return (
        <>
            <AddPostTitleBox>
                <AddPostTitle>게시글 수정</AddPostTitle>
            </AddPostTitleBox>
            <AddPostArticle>
                <InputLabel label={"제목*"}/>
                <InputPostTitle value={title} onInput={e => setTitle(e.target.value)} />
                <InputLabel label={'내용*'}/>
                <InputPostContent value={content} onInput={e => setContent(e.target.value)} />
                {isValid && <HelperText label={'*제목과 내용을 모두 입력해주세요.'}/>}
                <InputLabel label={'이미지'}/>
                <InputFile onChange={handleFileChange}/>
                <SetMainButton label={'수정하기'} onClick={handleSubmit} valid={isValid}/>
            </AddPostArticle>
        </>
    )
}

export default EditPost;