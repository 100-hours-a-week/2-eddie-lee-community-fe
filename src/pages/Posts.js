import styled from 'styled-components';
import { SetSmallButton } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import config from '../config';
import PostLists from '../components/PostLists';

const PostsTitle = styled.p`
    font-size: 1.5rem;
    color: #000;
    text-align: center;
    line-height: 2;
`;
const PostsBanner = styled.article`
    justify-content: center;
`;

const PostsArticle = styled.article`
    width: 40%;
    margin: 0 auto;
`;

const AddPostsDiv = styled.div`
    width: 100%;
    height: 40px;
`;

const PostsArea = styled.section`
    background-color: transparent;
`;

const PostTitle = () => {
    return (
        <PostsTitle>
            안녕하세요, 오늘은 어떠셨나요?
            <br />
            당신의 하루를 <strong>공유</strong> 해주세요.
        </PostsTitle>
    );
};

function Posts() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef(null);

    const ITEMS_PER_PAGE = 5;

    const navigate = useNavigate();
    const handleCreatePost = e => {
        navigate('/posts/edit');
    };

    const getPosts = async page => {
        try {
            const response = await fetch(
                `${config.API_URL}/posts?page=${page}`,
                {
                    method: 'GET',
                },
            );
            const newPosts = await response.json();
            setPosts(prev => [...prev, ...newPosts]);
            setHasMore(newPosts.length === ITEMS_PER_PAGE);
        } catch (err) {
            console.error(err);
        }
    };

    const observerCallback = useCallback(
        entries => {
            const target = entries[0];
            if (target.isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        },
        [hasMore],
    );

    useEffect(() => {
        const observer = new IntersectionObserver(observerCallback, {
            root: null, // 뷰포트 기준
            rootMargin: '0px',
            threshold: 1.0, // 100% 보일 때 트리거
        });

        // loaderRef에 Observer 연결
        if (loaderRef.current) observer.observe(loaderRef.current);

        // 컴포넌트 언마운트 시 Observer 해제
        return () => observer.disconnect();
    }, [observerCallback]);

    useEffect(() => {
        getPosts(page);
    }, [page]);

    return (
        <>
            <PostsBanner>
                <PostTitle />
            </PostsBanner>
            <PostsArticle>
                <AddPostsDiv>
                    <SetSmallButton
                        label={'게시글 작성'}
                        onClick={handleCreatePost}
                    />
                </AddPostsDiv>
                <PostsArea>
                    {posts.map((post, i) => (
                        <PostLists key={post.id} postData={post} />
                    ))}
                </PostsArea>
                {hasMore && (
                    <div
                        ref={loaderRef}
                        style={{ height: '50px', background: 'lightgray' }}
                    >
                        Loading...
                    </div>
                )}
            </PostsArticle>
        </>
    );
}

export default Posts;
