import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import UserMainMenu from '../components/UserMainMenu';
import UserRent from '../components/UserRent';
import UserMyPage from '../components/UserMyPage';
import UserNotice from '../components/UserNotice';
import { Route, Routes } from 'react-router-dom';
import ManagerLog from '../components/ManagerLog';
import ManagerConfirm from '../components/ManagerConfirm';
import ManagerMainMenu from '../components/ManagerMainMenu';

import ManagerNotice from '../components/ManagerNotice';
import ManagerRent from '../components/ManagerRent';

export default function ManagerMain({ page }) {
  // 정혁이가 로그인 시켜줄떄 스토어에 저장해둔 userID 를 세션 으로 이용.
  const userId = useSelector(state => state.user.userID);
  const [main, setMain] = useState([]);
  const [user, setUser] = useState();

  const showMain = async () => {
    try {
      const resShowMain = await axios.get(
        `http://localhost:4000/main/${userId}`,
      );
      setMain(resShowMain.data.ARTICLE); // 배열 담아줘
      setUser(resShowMain.data.NAME.USER_NAME); // 이름 담아주 ㅓ
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    showMain();
  }, []);
  return (
    <>
      <Header />
      <ManagerMainMenu />
      <Routes>
        <Route path="/" element={<ManagerRent />} />
        <Route path="/confirm" element={<ManagerConfirm />} />
        <Route path="/notice" element={<ManagerNotice />} />
        <Route path="/log" element={<ManagerLog />} />
      </Routes>
      {/* <ManagerLog /> */}
      {/* <ManagerConfirm /> */}
      {/* <ManagerRent /> */}
      {/* <ManagerNotice /> */}
    </>
  );
}
