import './App.css';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Route, RouterProvider, Routes } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyle';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';
import KakaoRedirectHandler from './components/KakaoRedirectHandler';
import UserMain from './pages/UserMain';
import UserRent from './pages/UserRent';
import FindRobot from './components/FindRobot';
import axios from 'axios';
import { useEffect } from 'react';
import { login } from './store/modules/user';

function App() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch();

  // App 시작 시, 브라우저 로컬 스토리지에 저장 되어 있는 토큰이 있는지를 확인 후,
  // 해당 토큰을 백엔드에 검증. 검증이 되면 바로 로그인 처리 / 안되면 로그인 페이지로 이동
  const tokenLoginCheck = async () => {
    try {
      const resToken = await axios.post('http://localhost:4000/token', {
        token: window.localStorage.getItem('token'),
      });

      // 토큰 검증 결과를 받아서 처리, 필요 데이터는 data 에 담아서 전송되므로 필요한 정보 세팅
      console.log('app.js 토큰 확인', resToken);
      // alert(resToken.data.msg);

      // 토큰 검증이 성공 적으로 검증이 되었으므로 리덕스에 로그인 처리
      // 해당 함수로 인하여 토큰이 있는 동안은, 로그인을 하지 않아도 바로 로그인이 처리
      dispatch(
        login({
          id: resToken.data.user_ID,
        }),
      );
    } catch (err) {
      console.log(err);
      return;
    }
  };

  // 리액트 앱이 시작 되면 바로 토큰 검증 로직 실행 -> 토큰 로그인 수행
  useEffect(() => {
    tokenLoginCheck();
  }, []);

  return (
    <>
      <GlobalStyle />
      {/* <Header />
      <UserMainMenu />
      <UserRent /> */}

      <Routes>
        <Route path="/*" element={isLogin ? <UserMain /> : <Login />} />

        <Route path="/register" element={isLogin ? <Login /> : <Register />} />
        <Route
          path="/oauth/callback/kakao"
          element={<KakaoRedirectHandler />}
        />
        <Route path="/usermain" element={<UserMain />} />
        <Route path="/subMain/:id" element={<UserRent />} />
      </Routes>
    </>
  );
}

export default App;
