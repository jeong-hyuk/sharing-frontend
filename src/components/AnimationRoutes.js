import React from 'react';
import { Route, Routes, useLocation } from 'react-router';
import UserMain from '../pages/UserMain';
import Login from '../pages/Login';
import KakaoRedirectHandler from './KakaoRedirectHandler';
import Register from '../pages/Register';
import { useSelector } from 'react-redux';
import UserRent from '../pages/UserRent';
import { AnimatePresence } from 'framer-motion';
import Chatbotcontroller from './Chatbotcontroller';
import MangerMain from '../pages/ManagerMain';
import ManagerNotice from './ManagerNotice';
import ManagerConfirm from './ManagerConfirm';

import Header from './Header';
import ManagerRent from './ManagerRent';


export default function AnimationRoutes() {
  const isLogin = useSelector(state => state.user.isLogin);
  const userId = useSelector(state => state.user.userID);
  const location = useLocation();

  return (
    <>
      <AnimatePresence>
        {userId === 'manager' ? (
          <Routes>
            <Route path="/*" element={isLogin ? <UserMain /> : <Login />} />
            <Route path="/subMain/:id" element={<UserRent />} />


            <Route path="/confirm/:type" element={<ManagerConfirm />} />


          </Routes>
        ) : (
          <Routes>
            <Route path="/*" element={isLogin ? <UserMain /> : <Login />} />
            <Route path="/subMain/:id" element={<UserRent />} />
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
        )}
      </AnimatePresence>
    </>
  );
}
