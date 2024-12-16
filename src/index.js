import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';
import backgroundImage from './assets/images/background.jpg';

const GlobalStyle = createGlobalStyle`
html, body, #root{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'NanumHimNaeRaNeunMarBoDan';
    font-size: 24px;
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.Fragment>
        <GlobalStyle />
        <App />
    </React.Fragment>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
