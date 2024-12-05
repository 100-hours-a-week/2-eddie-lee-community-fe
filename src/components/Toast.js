import styled from "styled-components";

const ToastStyle = styled.div`
    background-color: #aca0eb;
    border-radius: 15px;
    height: 2%;
    width: 10%;
    position: absolute;
    z-index: 99;
    margin-left: 10%;
    margin-top: 50%;
`

const ToastText = styled.p`
    color: white;
    font-size: 18px;
    padding-bottom: 5px;
    text-align: center;
    margin: 0;
    margin-top: 5%;
`

const Toast = () => {
    return(
        <ToastStyle>
            <ToastText>수정완료</ToastText>
        </ToastStyle>
    )
}

export default Toast;