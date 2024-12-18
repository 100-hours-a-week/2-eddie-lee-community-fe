import styled from 'styled-components';

const TextLinkStyle = styled.a`
    font-size: 0.875rem;
    color: #000;
    text-align: ${props => props.align || 'center'};
    text-decoration-line: none;
    cursor: pointer;
`;

const TextLink = ({ label, onClick, align }) => {
    return (
        <TextLinkStyle onClick={onClick} align={align}>
            {label}
        </TextLinkStyle>
    );
};

export default TextLink;
