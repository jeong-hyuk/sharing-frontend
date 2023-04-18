import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import companyLogo from '../pages/images/userIcon.png';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import { logout } from '../store/modules/user';
import KakaoRedirectHandler from './KakaoRedirectHandler';

const vibration = keyframes`
  0% {
    transform: rotate(10deg);
  }
  25% {
    transform: rotate(0deg);
  }
  50%{
    transform: rotate(-10deg);
  }
  75%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(10deg);
  }
`;
const CommonHeader = styled.div`
  position: fixed;
  width: 100%;
  height: 11vh;
  background-color: #81a8e3;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
  z-index: 3;
  .UserHeader {
    width: 70%;
    height: 11vh;
    margin: 0px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header_logo {
    position: relative;
    left: 2vw;
    width: 65px;
    height: 65px;
  }
  .user_info_header {
    display: flex;
    align-items: center;
    .header_alram {
      height: 3vh;
      color: #fff;
    }
    .header_alramred {
      height: 3vh;
      color: white;
      animation: ${vibration} 0.25s infinite;
    }

    .user_NameEmail {
      margin: 0px 20px;
      .user_logout_name {
        text-align: left;
        margin: 0;
        font-size: 1.5rem;
        color: #fff;
      }
      span {
        strong {
          font-size: 1.5rem;
        }
        :last-child {
          font-size: 0.5rem;
          color: #333;
          margin-left: 10px;
        }
        :first-child {
          font-size: 1.4rem;
          color: #f5f5f5;
        }
      }
      p {
        text-align: left;
        margin: 0;
        font-size: 1.4rem;
        color: #fff;
      }
    }
    .user_info_img {
      color: #fff;
      img {
        height: 5vh;
      }
    }
  }
`;

export default function Header() {
  const userId = useSelector(state => state.user.userID);
  const [main, setMain] = useState([]);
  const [user, setUser] = useState('');
  const [date, setDate] = useState([]);
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();

  // 현재 날짜 계산
  const today = new Date();
  const year = today.getFullYear();
  const month = `0${today.getMonth() + 1}`.slice(-2);
  const day = `0${today.getDate()}`.slice(-2);
  const dateString = `${year}-${month}-${day}`;

  const KAKAO_CLIENT_ID = '48194ee06abc88e308d72719bbd68805';
  const KAKAO_REDIRECT_URI = 'http://localhost:3000/oauth/callback/kakao';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  const KAKAO_LOGOUT_URI = 'http://localhost:3000';
  const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${KAKAO_CLIENT_ID}&logout_redirect_uri=${KAKAO_LOGOUT_URI}`;

  const showMain = async () => {
    try {
      const resShowMain = await axios.get(
        `http://localhost:4000/main/${userId}`,
      );
      setMain(resShowMain.data.ARTICLE); // 배열 담아줘
      setUser(resShowMain.data.NAME.USER_NAME); // 이름 담아줘

      // 현재 날짜 받아오기.
      const delay = resShowMain.data.DATE.filter(
        el => el.END_DATE.slice(0, 10) <= dateString,
      );

      if (delay.length >= 1) setChange(true);

      // if (el.END_DATE.slice(0, 10) <= dateString) {
      //   setChange(!change);
      // }

      // setDate(resShowMain.data.DATE);
    } catch (error) {
      console.error(error);
    }
  };

  const kakaoUser = true;

  const nomalLogout = () => {
    window.localStorage.removeItem('token');
    dispatch(logout());
  };

  useEffect(() => {
    showMain();
  }, []);
  return (
    <>
      <CommonHeader>
        <div className="UserHeader">
          <img src={logo} alt="로고" className="header_logo" />
          <div className="user_info_header">
            <a href="">
              {change === true ? (
                <FontAwesomeIcon icon={faBell} className="header_alramred" />
              ) : (
                <FontAwesomeIcon icon={faBell} className="header_alram" />
              )}
              {/* <FontAwesomeIcon icon={faBell} className="header_alram" /> */}
              {/* <FontAwesomeIcon icon={faBell} className="header_alramred" /> */}
            </a>
            <div className="user_NameEmail">
              <div className="user_logout_name">
                <span>
                  <strong>{user}</strong>&nbsp;님
                </span>
                <span>
                  {/* {kakaoUser ? (
                    <a href={KAKAO_LOGOUT_URL}>로그아웃</a>
                  ) : ( */}
                  <a href="javascript:void(0)" onClick={nomalLogout}>
                    로그아웃
                  </a>
                  {/* )} */}
                  {/* <a href="javascript:void(0)" onClick={nomalLogout}>
                    로그아웃
                  </a> */}
                </span>
              </div>
              <p className="">{userId}</p>
            </div>
            <Link to="/myPage" className="user_info_img">
              <img src={companyLogo} alt="프로필" />
            </Link>
          </div>
        </div>
      </CommonHeader>
    </>
  );
}
