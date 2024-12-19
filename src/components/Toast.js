import styled from 'styled-components';

const ToastStyle = styled.div`
    background-color: #87CEFA;
    border-radius: 15px;
    height: 3vh;
    width: 10%;
    position: absolute;
    z-index: 99;
    margin-left: 10%;
    margin-top: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ToastText = styled.p`
    color: white;
    font-size: 1.125rem;
    padding-bottom: 5px;
    text-align: center;
    margin: 0;
`;

const Toast = () => {
    return (
        <ToastStyle>
            <ToastText>수정완료</ToastText>
        </ToastStyle>
    );
};

export default Toast;
