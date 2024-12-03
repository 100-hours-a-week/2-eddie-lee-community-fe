import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html, body, #root{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
body {
    display: flex;
    justify-content: center;
    background-color: rgba(244, 245, 247, 1);
}`;

export default GlobalStyle;
