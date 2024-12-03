import styled from "styled-components";
import {EditorInfo, PostTitle, PostHorizontalRule} from "../components/PostLists";
import {useLocation, useNavigate} from "react-router-dom";
import {SetModifyAndDeleteBtn, SetSmallButton} from "../components/Button";
import {useEffect, useState} from "react";
import Modal from "../components/Modal";


const Time = styled.p`
margin-left: ${(props) => props.marginLeft || '5%'};
`

const PostArticle = styled.article`
    width: 40%;
    display: flex;
    flex-direction: column;
    margin: 0 auto 0;
    justify-content: center;
`

const EditorDiv = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 2.5%;
`

const ModifyAndDeleteBtnBox = styled.div`
    margin-left: auto;
`
const PostImgBox = styled.div`
    margin: 30px auto;
    width: 80%;
    height: 50%;
    justify-content: center;
    background-color: gray;
`

const PostImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const PostContent = styled.div`
    width: 80%;
    font-size: 15px;
    margin: auto auto 20px;
`

const CommunicationBtnBox = styled.div`
    display: flex;
    flex: 1 1 0;
    width: 70%;
    justify-content: space-evenly;
    margin: auto;
    height: 10%;
`

const CommunicationBtn = styled.button`
    width: 30%;
    border: none;
    background-color: rgba(217, 217, 217, 1);
    border-radius: 10px;
    height: 100%;
    padding: 5%;
`

const BtnNumber = styled.p`
    font-size: 20px;
    margin: 5%;
    font-weight: 700;
    padding: 5%;
`

const BtnText = styled.p`
    font-size: 16px;
    margin: 5px;
    font-weight: 700;
`

const CommentBox = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: white;
    padding: 5px;
    margin-top: 5%;
`

const CommentEditorAndTimeBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
`

const Comment = styled.textarea`
    border: none;
    background-color: transparent;
    margin: 20px;
    font-size: 15px;
    resize: none;
`

const CommentViewBox = styled.div`
    width: 90%;
    margin: auto;
`

const CommentContent = styled.p`
    font-size: 15px;
    margin: 0 0 0 10%;
`

const SetCommunicationBtn = ({getValue, label, onClick}) => {
    const [value, setValue] = useState(getValue);
    useEffect(() => {
        if(value > 999){
            setValue((value/1000)+'k');
        }
    }, [value]);
    return <CommunicationBtn onClick={onClick}>
        <BtnNumber>{value}</BtnNumber>
        <BtnText>{label}</BtnText>
        </CommunicationBtn>
}

const SetCommunicationArea = ({likes, views, comment_count}) =>{
    const [like, setLike] = useState(likes);
    const [viewCount, setViewCount] = useState(views);
    useEffect(()=>{
        setViewCount(prev => prev + 1);
    },[])
    const handleLikes = () =>{
        setLike(prev => prev + 1);
    }
    return (
        <CommunicationBtnBox>
            <SetCommunicationBtn getValue={like} label={'좋아요수'} onClick={handleLikes} />
            <SetCommunicationBtn getValue={viewCount} label={'조회수'}/>
            <SetCommunicationBtn getValue={comment_count} label={'댓글'}/>
        </CommunicationBtnBox>
    )
}

const SetCommentBox = () => {
    const handleAddComment = () => {

    }
    return (
        <CommentBox>
            <Comment placeholder={'댓글을 남겨주세요!'} rows={4}/>
            <PostHorizontalRule/>
            <SetSmallButton label={'댓글 등록'} onClick={handleAddComment} marginLeft={'auto'} padding={'1%'}/>
        </CommentBox>
    )
}

const SetCommentViewBox = ({commentData, modifyOnClick, deleteOnClick}) => {
    return (
        <CommentViewBox key={commentData.id}>
            <CommentEditorAndTimeBox>
                <EditorInfo profileImg={commentData.profileImg} nickname={commentData.nickname}/>
                <Time>{commentData.time}</Time>
                <ModifyAndDeleteBtnBox>
                    <SetModifyAndDeleteBtn label={'수정'} onClick={modifyOnClick}/>
                    <SetModifyAndDeleteBtn label={'삭제'} onClick={deleteOnClick}/>
                </ModifyAndDeleteBtnBox>
            </CommentEditorAndTimeBox>
            <CommentContent>{commentData.content}</CommentContent>
        </CommentViewBox>
    )
}

function PostInfo (){
    //아마 바꿔야할듯?
    const location = useLocation();

    const {state} = location;
    const postData = state;
    //안바꿀만함
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleModify = ()=>{
        navigate(`/posts/${postData.id}`, {state: postData});
    }

    const handleDelete = ()=>{
        setIsPostModalOpen(true);
    }

    const handleModifyComment = () => {

    }

    const handleDeleteComment = () => {
        setIsCommentModalOpen(true);
    }

    const handlePostModalCancel = () => {
        setIsPostModalOpen(false);
    }

    const handlePostModalOk = () =>{

    }

    const handleCommentModalCancel = () => {
        setIsCommentModalOpen(false);
    }

    const handleCommentModalOk = () => {}

    return (
        <>
            <PostArticle>
                <PostTitle>{postData.title}</PostTitle>
                <EditorDiv>
                    <EditorInfo profileImg={postData.profileImg} nickname={postData.nickname} padding={'0px'}/>
                    <Time>{postData.timestamp}</Time>
                    <ModifyAndDeleteBtnBox>
                        <SetModifyAndDeleteBtn label={'수정'} onClick={handleModify}/>
                        <SetModifyAndDeleteBtn label={'삭제'} onClick={handleDelete}/>
                    </ModifyAndDeleteBtnBox>
                </EditorDiv>
                <PostHorizontalRule/>
                <PostImgBox>
                    <PostImg src={postData.profileImg}/>
                </PostImgBox>
                <PostContent>{postData.content}</PostContent>
                <SetCommunicationArea likes={postData.likes} views={postData.views} comment_count={postData.comment_count}/>
                <SetCommentBox/>
                <SetCommentViewBox commentData={postData} modifyOnClick={handleModifyComment} deleteOnClick={handleDeleteComment}/>
            </PostArticle>
            {isPostModalOpen && (
                <Modal title={'게시글을 삭제하시겠습니까?'} content={'삭제한 내용은 복구할 수 없습니다.'} cancelOnClick={handlePostModalCancel} okOnClick={handlePostModalOk}/>
            )}
            {isCommentModalOpen && (
                <Modal title={'댓글을 삭제하시겠습니까?'} content={'삭제한 내용은 복구할 수 없습니다.'} cancelOnClick={handleCommentModalCancel} okOnClick={handleCommentModalOk} />
            )}
        </>
    )
}

export default PostInfo;