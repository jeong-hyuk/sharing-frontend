import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'PilseungGothic';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/PilseungGothic.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'PilseungGothic';
    padding-top: 1em;
    white-space: pre-wrap;
    text-align: center;
  }

  ul, ol {
    list-style: none;
    padding-left: 0px;
  }
`;

export default GlobalStyle;
