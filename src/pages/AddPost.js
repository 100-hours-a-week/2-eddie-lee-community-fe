import styled from "styled-components";
import {InputLabel, InputPostTitle, InputPostContent, HelperText, InputFile} from "../components/InputFields";
import {SetMainButton} from "../components/Button";

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
    const handleSubmit = () => {}
    return (
        <>
            <AddPostTitleBox>
                <AddPostTitle>게시글 작성</AddPostTitle>
            </AddPostTitleBox>
            <AddPostArticle>
                <InputLabel label={"제목*"}/>
                <InputPostTitle placeholder={'제목을 입력해주세요.(최대 26글자)'}/>
                <InputLabel label={'내용*'}/>
                <InputPostContent placeholder={'내용을 입력해주세요.'}/>
                <HelperText label={'*제목과 내용을 모두 입력해주세요.'}/>
                <InputLabel label={'이미지'}/>
                <InputFile/>
                <SetMainButton label={'완료'} onClick={handleSubmit}/>
            </AddPostArticle>
        </>
    )
}

export default AddPost;