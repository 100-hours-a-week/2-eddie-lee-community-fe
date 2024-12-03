import styled from "styled-components";
import {SetSmallButton} from "../components/Button";
import {useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";

//더미 데이터
import defaultProfileImg from "../assets/images/profile_img.webp";
import PostLists from "../components/PostLists";
const data = {
    id: 0,
    title: '제목',
    likes: 123000,
    comment_count: 3,
    content: '내용용요용용',
    views: 4560000,
    timestamp: '2000-01-01 00:00:00',
    profileImg: defaultProfileImg,
    nickname: 'nickname',
}
const PostsTitle = styled.p`
    font-size: 24px;
    color: #000;
    text-align: center;
    line-height: 2;
`
const PostsBanner = styled.article`
    justify-content: center;
`

const PostsArticle = styled.article`
    width: 40%;
    margin: 0 auto;
`

const AddPostsDiv = styled.div`
    width: 100%;
    height: 40px;
`

const PostsArea = styled.section`
    background-color: transparent;
`

const PostTitle = () =>{
    return <PostsTitle>안녕하세요,<br />
        아무 말 대잔치 <strong>게시판</strong> 입니다.</PostsTitle>
}

function Posts() {
    const [posts, setPosts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const dummyPosts = [];
    const navigate = useNavigate();
    const handleCreatePost = (e) => {
        navigate('/posts/edit');
    }


    const getPosts = useCallback(()=>{
        if(loading || !hasMore) return;
        setLoading(true);
        //더미 데이터
        const newPosts = [];
        if(offset < dummyPosts.length) {
            for (let i = 0; i < 10; i++) {
                if(offset + i > dummyPosts.length) return;
                newPosts.push(dummyPosts[offset + i]);
            }
        }
        if(newPosts.length > 0) {
            setPosts((prev) => [...prev, ...newPosts]);
            setOffset((prev) => prev + newPosts.length);
        } else {
            setHasMore(false);
        }
        setLoading(false);
    }, [offset, loading, hasMore]);

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100 // 스크롤 끝에 근접하면
        ) {
            getPosts(); // 데이터 요청
        }
    }, [getPosts]);

    useEffect(() => {
        //더미 데이터 복제
        for(let i = 0; i < 50; i++){
            data.id = i;
            dummyPosts.push({...data, id: i});
        }
        getPosts();
    }, []);

    useEffect(() => {
        // 스크롤 이벤트 등록
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    return (
        <>
            <PostsBanner>
                <PostTitle/>
            </PostsBanner>
            <PostsArticle>
                <AddPostsDiv>
                    <SetSmallButton label={'게시글 작성'} onClick={handleCreatePost}/>
                </AddPostsDiv>
                <PostsArea>
                    {posts.map((post, i) =>(
                        <PostLists postData={post}/>
                    ))};
                </PostsArea>
                {loading && <p>로딩 중...</p>}
            </PostsArticle>
        </>
    )
}

export default Posts;