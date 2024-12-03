import styled from "styled-components";

const TextLinkStyle = styled.a`
    font-size: 14px;
    color: #000;
    text-align: center;
    text-decoration-line: none;
`

const TextLink = ({label, onClick}) => {
    return <TextLinkStyle onClick={onClick}>{label}</TextLinkStyle>
}

export default TextLink;