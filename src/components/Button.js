import styled from 'styled-components';

const MainButton = styled.button`
    background-color: ${props => (props.valid ? '#87CEFA' : '#4682B4')};
    color: #fff;
    font-size: 0.875rem;
    width: 80%;
    margin: 30px auto 10px;
    height: 40px;
    border-radius: 10px;
    border: none;
`;

const SmallButton = styled.button`
    background-color: #87CEFA;
    border: none;
    border-radius: 16px;
    float: right;
    width: 20%;
    height: 80%;
    font-size: 1rem;
    color: #fff;
    margin-left: ${props => props.marginLeft || 0};
    padding: ${props => props.padding || 0};
`;

const ModifyAndDeleteBtn = styled.button`
    border-radius: 5px;
    background-color: transparent;
    box-shadow: none;
    outline: none;
    border: 1px solid #87CEFA;
`;

export const SetMainButton = ({ label, onClick, valid }) => {
    return (
        <MainButton onClick={onClick} valid={valid} disabled={!valid}>
            {' '}
            {label}{' '}
        </MainButton>
    );
};

export const SetSmallButton = ({ label, onClick, marginLeft, padding }) => {
    return (
        <SmallButton
            onClick={onClick}
            marginLeft={marginLeft}
            padding={padding}
        >
            {' '}
            {label}{' '}
        </SmallButton>
    );
};

export const SetModifyAndDeleteBtn = ({ label, onClick }) => {
    return <ModifyAndDeleteBtn onClick={onClick}> {label} </ModifyAndDeleteBtn>;
};
