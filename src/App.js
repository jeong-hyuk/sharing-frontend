import './App.css';
import { Provider, useSelector } from 'react-redux';
import { Route, RouterProvider, Routes } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyle';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';
import KakaoRedirectHandler from './components/KakaoRedirectHandler';

function App() {
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={isLogin ? <Main /> : <Login />} />
        <Route path="/register" element={isLogin ? <Login /> : <Register />} />
        <Route
          path="/oauth/callback/kakao"
          element={<KakaoRedirectHandler />}
        />
      </Routes>
    </>
  );
}

export default App;
