import styled from 'styled-components';
import config from '../config';

const InputFields = styled.input`
    margin-top: 5px;
    font-size: 1rem;
    border-radius: 5px;
    height: 30px;

    ::placeholder {
        font-size: 0.875rem;
        color: #000;
        padding: 10px;
    }
`;

const HelperTextStyle = styled.p`
    color: maroon;
    font-weight: bold;
    margin: 5px;
    font-size: 0.875rem;
`;

const InputLabels = styled.label`
    margin-top: 20px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const InputTitle = styled.input`
    height: 30px;
    padding: 10px;
    border-color: #00000029;
    border-left: none;
    border-right: none;
    resize: none;
    background-color: transparent;
    &::placeholder {
        font-size: 1rem;
        margin: 10px;
        color: #B0C4DE;
    }
`;

const InputContent = styled.textarea`
    padding: 10px;
    border-color: #00000029;
    border-left: none;
    border-right: none;
    resize: none;
    background-color: transparent;
    &::placeholder {
        font-size: 1rem;
        color: #B0C4DE;
    }
`;

export const InputLabel = ({ label }) => {
    return <InputLabels>{label}</InputLabels>;
};

export const InputField = ({ placeholder, inputListener, type, onBlur }) => {
    return (
        <InputFields
            placeholder={placeholder}
            onInput={inputListener}
            type={type}
            onBlur={onBlur}
        />
    );
};

export const HelperText = ({ label }) => {
    return <HelperTextStyle>{label}</HelperTextStyle>;
};

export const InputPostTitle = ({ placeholder, onInput, value }) => {
    return (
        <InputTitle
            type={'text'}
            maxLength={26}
            placeholder={placeholder}
            onInput={onInput}
            value={value}
        />
    );
};

export const InputPostContent = ({ placeholder, onInput, value }) => {
    return (
        <InputContent
            type={'textbox'}
            rows={14}
            placeholder={placeholder}
            onInput={onInput}
            value={value}
        />
    );
};

export const InputFile = ({ onChange }) => {
    return <input type={'file'} accept={'image/*'} onChange={onChange} />;
};
