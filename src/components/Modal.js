import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';

const ModalScreen = styled.div`
    background-color: rgba(0, 0, 0, 0.5); /* 배경 투명도 */
    width: 100%;
    height: 100%;
    z-index: 90;
    position: fixed; /* 스크롤과 상관없이 화면 고정 */
    top: 0;
    left: 0;

    display: flex; /* 플렉스 컨테이너 */
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
`;

const ModalBox = styled.div`
    background-color: white;
    border-radius: 10px;
    width: 35vh;
    height: 25vh;
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* 내용도 중앙 정렬 */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* 모달 그림자 효과 */
`;

const ModalTitle = styled.p`
    font-size: 1.5rem;
    text-align: center;
    color: black;
    font-weight: bold;
    width: 100%;
    margin-top: 10%;
`;

const ModalContent = styled.p`
    font-size: 20px;
    text-align: center;
    color: black;
    width: 100%;
`;

const ModalBtnBox = styled.div`
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    height: 15%;
    margin-top: 5%;
`;

const ModalOkBtn = styled.button`
    width: 40%;
    border: none;
    border-radius: 10px;
    background-color: #87CEFA;
    color: black;
    font-size: 1.25rem;
    cursor: pointer;
`;

const ModalCancelBtn = styled.button`
    width: 40%;
    border: none;
    border-radius: 10px;
    background-color: #242424;
    color: white;
    height: 100%;
    font-size: 1.25rem;
    cursor: pointer;
`;

const SetModalBox = ({ title, content, okOnClick, cancelOnClick }) => {
    return (
        <ModalBox>
            <ModalTitle>{title}</ModalTitle>
            <ModalContent>{content}</ModalContent>
            <ModalBtnBox>
                <ModalCancelBtn onClick={cancelOnClick}>취소</ModalCancelBtn>
                <ModalOkBtn onClick={okOnClick}>확인</ModalOkBtn>
            </ModalBtnBox>
        </ModalBox>
    );
};

function Modal({ title, content, okOnClick, cancelOnClick }) {
    useEffect(() => {
        // 모달이 열리면 스크롤 비활성화
        document.body.style.overflow = 'hidden';

        return () => {
            // 모달이 닫히면 스크롤 복원
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleScreenClick = e => {
        e.stopPropagation(); // 클릭 이벤트 전파 방지
    };
    return ReactDOM.createPortal(
        <ModalScreen onClick={handleScreenClick}>
            <SetModalBox
                title={title}
                content={content}
                okOnClick={okOnClick}
                cancelOnClick={cancelOnClick}
            />
        </ModalScreen>,
        document.getElementById('modal-root'),
    );
}

export default Modal;
