import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import UserMainMenu from '../components/UserMainMenu';
import UserRent from '../components/UserRent';
import UserMyPage from '../components/UserMyPage';
import { Route, Routes } from 'react-router-dom';

export default function UserMain({ page }) {
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    return isTablet ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };
  const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 });
    return isNotMobile ? children : null;
  };

  // 정혁이가 로그인 시켜줄떄 스토어에 저장해둔 userID 를 세션 으로 이용.
  const userId = useSelector((state) => state.user.userID);
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
      <Desktop>
        <Header />
        <UserMainMenu />
        <Routes>
          <Route path="/" element={<UserRent />} />
          <Route path="/myPage" element={<UserMyPage />} />
        </Routes>
      </Desktop>
      <Tablet>Tablet</Tablet>
      <Mobile>Mobile</Mobile>
      <Default></Default>
    </>
  );
}
