import { createGlobalStyle } from 'styled-components';
import backgroundImage from '../assets/images/background.jpg';

const GlobalStyle = createGlobalStyle`
html, body, #root{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'NanumDaSiSiJagHae', sans-serif;
    font-size: clamp(16px, 2.5vw, 24px);
}
body {
    display: flex;
    justify-content: center;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
}
button, input, textarea, select {
    font-family: inherit; /* 부모 요소(body)의 글꼴을 상속 */
}

::placeholder {
    font-family: inherit; /* placeholder에도 동일한 글꼴 적용 */
    color: #999; /* 추가 스타일 */
}`;

export default GlobalStyle;
