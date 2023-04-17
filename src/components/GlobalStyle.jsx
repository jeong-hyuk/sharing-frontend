import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* @font-face {
    font-family: 'PilseungGothic';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/PilseungGothic.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
@import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css');
  body {
    font-family: 'PilseungGothic';
    padding-top: 1em;
    white-space: pre-wrap;
    text-align: center;
  }
*/

@font-face {
font-family: "NanumSquare";
src: url("./fonts/Roboto-Regular.ttf") format("truetype");
}

body {
    font-family: 'NanumSquare';
  }
  ul, ol {
    list-style: none;
    padding-left: 0px;
  }

  //reset
  *{margin:0; padding:0;}
  li{list-style:none;}
  img{border:0; vertical-align:top;}

  //a link
  a{text-decoration:none;}
  a:link, a:visited, a:hover, a:active{color:#333;}

  *{
    font-size: 62.5%;
  }

  //scrollBar
  div::-webkit-scrollbar {
    width: 6px;  /* 스크롤바의 너비 */
  }

  div::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: rgba(86, 90, 122, .3); /* 스크롤바의 색상 */
    
    border-radius: 10px;
  }

  div::-webkit-scrollbar-track {
    background: #f5f5f5; 
    /*스크롤바 뒷 배경 색상*/
  }

`;

export default GlobalStyle;
