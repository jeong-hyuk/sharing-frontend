import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import store from '../store';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

// const MainStyle = styled.main`
//   box-sizing: border-box;
//   width: 100%;
//   max-width: 500px;
//   padding: 0 35px;
//   margin: auto;
//   text-align: center;
// `;

export default function Main() {
  // const handleLogin = (id) => {
  //   console.log(`로그인한 아이디: ${id}`);
  // 로그인한 아이디를 이용해 다른 작업 수행 가능
  // };
  // const page = useSelector((state) => state.mbti.page);
  // const survey = useSelector((state) => state.mbti.survey);

  return (
    <>
      {/* <Login onLogin={handleLogin} /> */}
      ㅎㅇ
    </>
  );
}
