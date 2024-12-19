import styled from 'styled-components';
import {
    EditorInfo,
    PostTitle,
    PostHorizontalRule,
} from '../components/PostLists';
import { useNavigate, useParams } from 'react-router-dom';
import { SetModifyAndDeleteBtn, SetSmallButton } from '../components/Button';
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import config from '../config';
import defaultPostImg from '../assets/images/defaultPostImg.png';
import defaultProfileImg from '../assets/images/profile_img.webp';
import { getImgURL } from '../utils/cdnPath';

const Time = styled.p`
    margin-left: ${props => props.marginLeft || '5%'};
`;

const PostArticle = styled.article`
    width: 40%;
    display: flex;
    flex-direction: column;
    margin: 0 auto 0;
    justify-content: center;
`;

const EditorDiv = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 2.5%;
`;

const ModifyAndDeleteBtnBox = styled.div`
    margin-left: auto;
`;
const PostImgBox = styled.div`
    margin: 30px auto;
    width: 80%;
    height: 50%;
    justify-content: center;
    background-color: #1E90FF;
`;

const PostImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const PostContent = styled.div`
    width: 80%;
    font-size: 1rem;
    margin: auto auto 20px;
`;

const CommunicationBtnBox = styled.div`
    display: flex;
    flex: 1 1 0;
    width: 70%;
    justify-content: space-evenly;
    margin: auto;
    height: 10%;
`;

const CommunicationBtn = styled.button`
    width: 30%;
    border: none;
    background-color: inherit;
    border-radius: 10px;
    height: 100%;
    padding: 5%;
`;

const BtnNumber = styled.p`
    font-size: 1.25rem;
    margin: 5%;
    font-weight: 700;
    padding: 5%;
`;

const BtnText = styled.p`
    font-size: 1rem;
    margin: 5px;
    font-weight: 700;
`;

const CommentBox = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: white;
    padding: 5px;
    margin-top: 5%;
`;

const CommentEditorAndTimeBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
`;

const Comment = styled.textarea`
    border: none;
    background-color: transparent;
    margin: 20px;
    font-size: 1rem;
    resize: none;
`;

const CommentViewBox = styled.div`
    width: 90%;
    margin: auto;
`;

const CommentContent = styled.p`
    font-size: 1rem;
    margin: 0 0 0 10%;
`;

const SetCommunicationArea = ({ likes, views, comment_count, onClick }) => {
    return (
        <CommunicationBtnBox>
            <CommunicationBtn onClick={onClick}>
                <BtnNumber>{likes}</BtnNumber>
                <BtnText>{'좋아요수'}</BtnText>
            </CommunicationBtn>
            <CommunicationBtn>
                <BtnNumber>{views}</BtnNumber>
                <BtnText>{'조회수'}</BtnText>
            </CommunicationBtn>
            <CommunicationBtn>
                <BtnNumber>{comment_count}</BtnNumber>
                <BtnText>{'댓글'}</BtnText>
            </CommunicationBtn>
        </CommunicationBtnBox>
    );
};

const SetPostImg = ({ postImg }) => {
    return <PostImg src={getImgURL(postImg)} />;
};

const SetCommentBox = ({ postId, editComment, onSave, updateCount, getCommentData }) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        if (editComment) {
            setContent(editComment.content);
        }
    }, [editComment]);

    const handleAddComment = async () => {
        const url = editComment
            ? `${config.API_URL}/posts/${postId}/comments/${editComment.id}`
            : `${config.API_URL}/posts/${postId}/comment`;
        const method = editComment ? 'PATCH' : 'POST';
        await fetch(url, {
            method: method,
            body: JSON.stringify({ content: content }),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then(res => {
            if (!res.ok) throw new Error('Failed to add comment');
            return res.json();
        });

        setContent('');
        getCommentData();
        if (method === 'POST') {
            updateCount();
        }
        if (onSave) onSave();
    };
    return (
        <CommentBox>
            <Comment
                placeholder={'댓글을 입력하세요!'}
                rows={4}
                onChange={e => setContent(e.target.value)}
                value={content}
            />
            <PostHorizontalRule />
            <SetSmallButton
                label={editComment ? '댓글 수정' : '댓글 등록'}
                onClick={handleAddComment}
                marginLeft={'auto'}
                padding={'1%'}
            />
        </CommentBox>
    );
};

const SetCommentViewBox = ({ commentData, handleModify, userId, updateCount, getCommentData }) => {
    const [isEditor, setIsEditor] = useState(false);
    const [profileSrc, setProfileSrc] = useState(defaultProfileImg);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    useEffect(() => {
        if (userId === commentData.user_id) setIsEditor(true);
        if (commentData.profile_img) setProfileSrc(commentData.profile_img);
    }, [commentData.profile_img, commentData.user_id, userId]);

    const handleCommentModalCancel = () => {
        setIsCommentModalOpen(false);
    };

    const handleCommentModalOk = async () => {
        await fetch(`${config.API_URL}/posts/comments/${commentData.id}`, {
            method: 'DELETE',
        }).then(res => {
            if (!res.ok) throw new Error('Failed to delete comment');
            return res.json();
        });
        setIsCommentModalOpen(false);
        updateCount();
        getCommentData();
    };

    const handleDelete = async () => {
        setIsCommentModalOpen(true);
    };

    return (
        <CommentViewBox key={commentData.id}>
            <CommentEditorAndTimeBox>
                <EditorInfo
                    profileImg={profileSrc}
                    nickname={commentData.nickname}
                />
                <Time>{commentData.timestamp}</Time>
                {isEditor && (
                    <ModifyAndDeleteBtnBox>
                        <SetModifyAndDeleteBtn
                            label={'수정'}
                            onClick={() => handleModify(commentData)}
                        />
                        <SetModifyAndDeleteBtn
                            label={'삭제'}
                            onClick={handleDelete}
                        />
                    </ModifyAndDeleteBtnBox>
                )}
            </CommentEditorAndTimeBox>
            <CommentContent>{commentData.content}</CommentContent>
            {isCommentModalOpen && (
                <Modal
                    title={'댓글을 삭제하시겠습니까?'}
                    content={'삭제한 내용은 복구할 수 없습니다.'}
                    cancelOnClick={handleCommentModalCancel}
                    okOnClick={handleCommentModalOk}
                />
            )}
        </CommentViewBox>
    );
};
function PostInfo() {
    const { postId } = useParams();
    const [userId, setUserId] = useState(0);
    const [postData, setPostData] = useState({});
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isEditor, setIsEditor] = useState(false);
    const [postSrc, setPostSrc] = useState(defaultPostImg);
    const [profileSrc, setProfileSrc] = useState(defaultProfileImg);
    const [likeCount, setLikeCount] = useState(0);
    const [viewCount, setViewCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [convertLike, setConverterLike] = useState('');
    const [convertCommentCount, setConverterCommentCount] = useState('');
    const [convertView, setConverterView] = useState('');
    const [comments, setComments] = useState([]);
    const [editComment, setEditComment] = useState(null);
    const navigate = useNavigate();

    const getValue = value => {
        const parseValue = parseInt(value);
        if (parseValue <= 999) return `${parseValue}`;
        else {
            return `${parseInt(parseValue / 1000)}k`;
        }
    };

    useEffect(() => {
        setConverterLike(getValue(likeCount));
    }, [likeCount]);

    useEffect(() => {
        setConverterView(getValue(viewCount));
    }, [viewCount]);

    useEffect(() => {
        setConverterCommentCount(getValue(commentCount));
    }, [commentCount]);

    const fetchData = async () => {
        try {
            const userData = await fetch(
                `${config.API_URL}/users/session`,
                {
                    method: 'GET',
                    credentials: 'include',
                },
            ).then(async res => {
                if (!res.ok) {
                    throw new Error('Get user session failed');
                }
                return await res.json();
            });
            setUserId(userData.user_id);
            await fetch(`${config.API_URL}/posts/${postId}/view`, {
                method: 'PATCH',
            }).then(res => {
                if (!res.ok) throw new Error('update view failed');
                return res.json();
            });
            const data = await fetch(
                `${config.API_URL}/posts/${postId}/data`,
                {
                    method: 'GET',
                    credentials: 'include',
                },
            ).then(async res => {
                if (!res.ok) {
                    throw new Error(`Get post data failed`);
                }
                return await res.json();
            });
            setPostData(data);
            if (data.user_id === userData.user_id) {
                setIsEditor(true);
            }
            if (data.image) {
                setPostSrc(data.image);
            }
            if (data.profileImg) {
                setProfileSrc(data.profileImg);
            }
            setLikeCount(data.like);
            setViewCount(data.view);
            setCommentCount(data.comment_count);
        } catch (error) {
            console.error(error);
        }
    };

    const getCommentData = async () => {
        try {
            const response = await fetch(
                `${config.API_URL}/posts/${postId}/comments`,
                {},
            );
            if (!response.ok) {
                throw new Error('get comment data failed');
            }
            const commentData = await response.json();
            setComments(commentData);
        } catch (e) {
            console.error(e.message);
        }
    };

    useEffect(() => {
        fetchData();
        getCommentData();
    }, []);

    const updateLikes = async () => {
        try {
            await fetch(`${config.API_URL}/posts/${postId}/like`, {
                method: 'PATCH',
            }).then(res => {
                if (!res.ok) throw new Error('update like failed');
                else {
                    return res.json();
                }
            });
            setLikeCount(prev => prev + 1);
        } catch (error) {
            console.error(error);
        }
    };

    const handleModify = () => {
        navigate(`/posts/${postId}`, { state: postData });
    };

    const handleDelete = () => {
        setIsPostModalOpen(true);
    };

    const handlePostModalCancel = () => {
        setIsPostModalOpen(false);
    };

    const handlePostModalOk = async () => {
        await fetch(`${config.API_URL}/posts/${postId}`, {
            method: 'DELETE',
        }).then(res => {
            if (!res.ok) {
                throw new Error('delete like failed');
            }
            return res.json();
        });
        setIsPostModalOpen(false);
        navigate('/posts');
    };

    const handleCommentModify = async comment => {
        setEditComment(comment);
    };

    return (
        <>
            <PostArticle>
                <PostTitle>{postData.title}</PostTitle>
                <EditorDiv>
                    <EditorInfo
                        profileImg={profileSrc}
                        nickname={postData.nickname}
                        padding={'0px'}
                    />
                    <Time>{postData.timestamp}</Time>
                    {isEditor && (
                        <ModifyAndDeleteBtnBox>
                            <SetModifyAndDeleteBtn
                                label={'수정'}
                                onClick={handleModify}
                            />
                            <SetModifyAndDeleteBtn
                                label={'삭제'}
                                onClick={handleDelete}
                            />
                        </ModifyAndDeleteBtnBox>
                    )}
                </EditorDiv>
                <PostHorizontalRule />
                <PostImgBox>
                    <SetPostImg postImg={postSrc} />
                </PostImgBox>
                <PostContent>{postData.content}</PostContent>
                <SetCommunicationArea
                    likes={convertLike}
                    views={convertView}
                    comment_count={convertCommentCount}
                    onClick={updateLikes}
                />
                <SetCommentBox
                    postId={postId}
                    editComment={editComment}
                    onSave={() => setEditComment(null)}
                    updateCount={() => setCommentCount(prev => prev + 1)}
                    getCommentData={getCommentData}
                />
                {comments.map((comment, i) => (
                    <SetCommentViewBox
                        key={comment.id}
                        commentData={comment}
                        handleModify={handleCommentModify}
                        userId={userId}
                        updateCount={() => setCommentCount(prev => prev - 1)}
                        getCommentData={getCommentData}
                    />
                ))}
            </PostArticle>
            {isPostModalOpen && (
                <Modal
                    title={'게시글을 삭제하시겠습니까?'}
                    content={'삭제한 내용은 복구할 수 없습니다.'}
                    cancelOnClick={handlePostModalCancel}
                    okOnClick={handlePostModalOk}
                />
            )}
        </>
    );
}

export default PostInfo;
