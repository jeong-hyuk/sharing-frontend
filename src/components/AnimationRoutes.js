import React from 'react';
import { Route, Routes, useLocation } from 'react-router';
import UserMain from '../pages/UserMain';
import Login from '../pages/Login';
import KakaoRedirectHandler from './KakaoRedirectHandler';
import Register from '../pages/Register';
import { useSelector } from 'react-redux';
import UserRent from './UserRent';
import { AnimatePresence } from 'framer-motion';

export default function AnimationRoutes() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const location = useLocation();
  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/*" element={isLogin ? <UserMain /> : <Login />} />

          <Route
            path="/register"
            element={isLogin ? <Login /> : <Register />}
          />
          <Route
            path="/oauth/callback/kakao"
            element={<KakaoRedirectHandler />}
          />
          <Route path="/usermain" element={<UserMain />} />
          <Route path="/subMain/:id" element={<UserRent />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
