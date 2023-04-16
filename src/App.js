import './App.css';
import { Provider, useSelector } from 'react-redux';
import { Route, RouterProvider, Routes } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyle';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';
import KakaoRedirectHandler from './components/KakaoRedirectHandler';
import UserMain from './pages/UserMain';
import UserRent from './pages/UserRent';

import MangerMain from './pages/ManagerMain';
import Chatbotcontroller from './components/Chatbotcontroller';
import AnimationRoutes from './components/AnimationRoutes';

function App() {
  const isLogin = useSelector(state => state.user.isLogin);
  const userId = useSelector(state => state.user.userID);
  console.log(userId); // 관리자 확인.

  return (
    <>
      <GlobalStyle />
      <AnimationRoutes />
    </>
  );
}

export default App;
