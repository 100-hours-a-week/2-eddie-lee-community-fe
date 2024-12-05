import styled from "styled-components";

const MainButton = styled.button`
    background-color: ${props => props.valid ? '#7f6aee' : '#ACA0EB'};
    color: #fff;
    font-size: 14px;
    width: 80%;
    margin: 30px auto 10px;
    height: 40px;
    border-radius: 10px;
    border: none;
`

const SmallButton = styled.button`
    background-color: #aca0eb;
    border: none;
    border-radius: 16px;
    float: right;
    width: 20%;
    height: 80%;
    font-size: 16px;
    color: #fff;
    margin-left: ${(props) => props.marginLeft || 0};
    padding : ${(props) => props.padding || 0};
`

const ModifyAndDeleteBtn = styled.button`
    border-radius: 5px;
    background-color: transparent;
    box-shadow: none;
    outline: none;
    border: 1px solid #aca0eb;
`

export const SetMainButton = ({label, onClick, valid}) =>{
    return <MainButton onClick={onClick} valid={valid} disabled={!valid}> {label} </MainButton>
}

export const SetSmallButton = ({label, onClick, marginLeft, padding}) =>{
    return <SmallButton onClick={onClick} marginLeft={marginLeft} padding={padding}> {label} </SmallButton>
}

export const SetModifyAndDeleteBtn = ({label, onClick}) =>{
    return <ModifyAndDeleteBtn onClick={onClick}> {label} </ModifyAndDeleteBtn>
}