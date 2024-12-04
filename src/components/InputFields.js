import styled from "styled-components";
import config from "../config"

const InputFields = styled.input`
    margin-top: 5px;
    font-size: 15px;
    border-radius: 5px;
    height: 30px;

    ::placeholder{
        font-size: 14px;
        color: #000;
        padding: 10px;
    }
`

const HelperTextStyle = styled.p`
    color: red;
    font-weight: bold;
    margin: 5px;
    font-size: 14px;
`

const InputLabels = styled.label`
    margin-top: 20px;
    font-weight: bold;
    margin-bottom: 5px;
`

const InputTitle = styled.input`
    height: 30px;
    padding: 10px;
    border-color: #00000029;
    border-left: none;
    border-right: none;
    resize: none;
    background-color: transparent;
    ::placeholder{
        font-size: 16px;
        margin: 10px;
        color: black;
        font-weight: bold;
    }
`

const InputContent = styled.textarea`
    padding: 10px;
    border-color: #00000029;
    border-left: none;
    border-right: none;
    resize: none;
    background-color: transparent;
    ::placeholder{
        font-size: 15px;
        color: black;
    }
`

export const InputLabel = ({label}) => {
    return <InputLabels>{label}</InputLabels>;
}

export const InputField = ({placeholder, inputListener, type}) => {
    return <InputFields placeholder={placeholder} onInput={inputListener} type={type}/>;
}

export const HelperText = ({label}) =>{
    return <HelperTextStyle>{label}</HelperTextStyle>;
}

export const InputPostTitle = ({placeholder, onInput}) => {
    return <InputTitle type={"text"} maxLength={26} placeholder={placeholder} onInput={onInput}/>
}

export const InputPostContent = ({placeholder, onInput}) => {
    return <InputContent type={"textbox"} rows={14} placeholder={placeholder} onInput={onInput}/>
}

export const InputFile = ({onChange}) => {
    return <input type={"file"} accept={"image/*"} onChange={onChange}/>
}