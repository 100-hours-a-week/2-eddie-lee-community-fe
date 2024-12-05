import styled from "styled-components";

const TextLinkStyle = styled.a`
    font-size: 14px;
    color: #000;
    text-align: ${props => props.align || "center"};
    text-decoration-line: none;
`

const TextLink = ({label, onClick, align}) => {
    return <TextLinkStyle onClick={onClick} align={align}>{label}</TextLinkStyle>
}

export default TextLink;