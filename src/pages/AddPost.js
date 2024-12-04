import styled from "styled-components";
import {InputLabel, InputPostTitle, InputPostContent, HelperText, InputFile} from "../components/InputFields";
import {SetMainButton} from "../components/Button";
import {useEffect, useState} from "react";
import config from "../config";
import {useNavigate} from "react-router-dom";

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

function AddPost() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(title.length !== 0 && content.length !== 0) {
            setIsValid(true);
        }
    },[title, content]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }
    const handleSubmit = async () => {
        if(title.length === 0 || content.length === 0) return;
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("inputImg", selectedFile);
        const result = await fetch(`${config.API_URL}/posts/edit`, {
            method: "POST",
            body: formData,
            credentials: "include",
        }).then(async res => {
            if(!res.ok){ throw new Error("Failed to save post!"); }
            return await res.json();
        })
        console.log(result);
        navigate("/posts");
    }
    return (
        <>
            <AddPostTitleBox>
                <AddPostTitle>게시글 작성</AddPostTitle>
            </AddPostTitleBox>
            <AddPostArticle>
                <InputLabel label={"제목*"}/>
                <InputPostTitle placeholder={'제목을 입력해주세요.(최대 26글자)'} onInput={e=>setTitle(e.target.value)}/>
                <InputLabel label={'내용*'}/>
                <InputPostContent placeholder={'내용을 입력해주세요.'} onInput={e=>setContent(e.target.value)}/>
                {isValid && <HelperText label={'*제목과 내용을 모두 입력해주세요.'}/>}
                <InputLabel label={'이미지'}/>
                <InputFile onChange = {handleFileChange}/>
                <SetMainButton label={'완료'} onClick={handleSubmit} valid={isValid}/>
            </AddPostArticle>
        </>
    )
}

export default AddPost;