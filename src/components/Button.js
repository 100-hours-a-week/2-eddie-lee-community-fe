import styled from "styled-components";

const MainButton = styled.button`
    background-color: #7f6aee;
    color: #fff;
    font-size: 14px;
    width: 80%;
    margin: 30px auto 10px;
    height: 40px;
    border-radius: 10px;
    border: none;
`

export const SetMainButton = (label, onClick) =>{
    return <MainButton onClick={onClick}>label={label} </MainButton>
}