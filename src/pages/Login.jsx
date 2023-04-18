import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, register } from '../store/modules/user';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-regular-svg-icons';
import { faCircleArrowRight, faLock } from '@fortawesome/free-solid-svg-icons';
import kakaotalkImg from '../pages/images/kakaoIcon.png';
import { motion } from 'framer-motion';
import logo from '../img/logo2.png';

const TitlePart = styled(motion.div)`
  z-index: 2;
  background-color: #81a8e3;
  width: 35vw;
  position: absolute;
  top: -5vh;
  right: 10%;
  height: 76vh;
  box-shadow: 13px 13px 15px rgba(0, 0, 0, 10%);
  h1 {
    position: absolute;
    top: 50%;
    left: 8%;
    transform: translate(0, -50%);
    color: #fff;
    font-size: 8rem;
    font-weight: 600;
    p {
      padding-top: 10px;
      font-size: 3.5rem;
      font-weight: 400;
    }
  }
`;
const LoginStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 5px 5px 13px 15px rgba(0, 0, 0, 10%);
  width: 74vw;
  height: 66vh;

  /* #565a7a */
  .logo-part {
    position: absolute;
    top: calc((7.4vw - 10vh) / 2);
    left: calc((7.4vw - 10vh) / 2);
    width: 10vh;
    height: 10vh;
    opacity: 0.5;
    border-radius: 10px;
    img {
      position: relative;
      z-index: 1000;
      width: 10vh;
      height: 10vh;
      /* background-color: orange; */
    }
  }
  // 메인 제목 부분
  /*  */

  // 로그인 파트
  .login-part {
    width: 32%;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    h1 {
      width: 65%;
      font-size: 3.5rem;
      color: #565a7a;
      font-weight: 730;
    }
    p {
      display: flex;
      width: 65%;
      font-size: 6rem;
      color: #888888;
      border-bottom: 1px solid #888888;
      padding-top: 28px;
      padding-bottom: 6px;
      input {
        width: 100%;
        border-style: none;
        font-size: 1.5rem;

        padding-left: 7px;
        margin: 0px 5px 3px 10px;

        :focus {
          outline: none;
          border: 1px solid #888888;
          /* box-shadow: 0 0 5px #888888; */
          border-radius: 3px;
        }
      }
    }
    .register_btn {
      padding-top: 8px;
      border-style: none;
      font-size: 2.5rem;
      background-color: transparent;
      a {
        font-weight: 500;
        font-size: 2.2rem;
        color: #555555;
      }
    }

    .pw-show-hide_btn {
      border-style: none;
      background-color: transparent;

      .pw-show-hide_btn_icon {
        width: 33px;
        height: 33px;
        color: #555555;
        :hover {
          cursor: pointer;
        }
      }
    }

    .btn-part {
      display: flex;
      width: 40%;
      justify-content: space-evenly;
      position: absolute;
      bottom: -60px;
      right: 29%;
      .kakao_btn {
        border-style: none;
        background-color: #ffe767;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 25%);

        :hover {
          transform: scale(1.05);
        }
      }
      .login_btn {
        border-style: none;
        background-color: transparent;
        .menu_next_button_icon {
          width: 60px;
          height: 60px;
          color: #565a7a;
          border-radius: 50%;
          box-shadow: 4px 4px 4px rgba(0, 0, 0, 25%);
          :hover {
            cursor: pointer;
            transform: scale(1.05);
          }
        }
      }
    }
  }
`;
export default function Login() {
  const loginIdInput = useRef();
  const loginPwInput = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // KAKAO 로그인 용
  // CLIENT_ID 로 REST API 키 사용 필요
  const KAKAO_CLIENT_ID = '48194ee06abc88e308d72719bbd68805';
  const KAKAO_REDIRECT_URI = 'http://localhost:3000/oauth/callback/kakao';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  const KAKAO_LOGOUT_URI = 'http://localhost:3000';
  const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${KAKAO_CLIENT_ID}&logout_redirect_uri=${KAKAO_LOGOUT_URI}`;

  const loginUser = async () => {
    if (!loginIdInput.current.value || !loginPwInput.current.value)
      return alert('값을 입력 하세요');

    const resLogin = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: loginIdInput.current.value,
        password: loginPwInput.current.value,
      }),
    });
    // 로그인이 성공하면 응답 데이터 token 프로퍼티에 accessToken 이 전달 되어 오므로
    // 로컬 스토리지에 로그인 정보가 저장 된 토큰을 저장
    // 해당 정보를 통하여 리액트 실행 시, 토큰을 백엔드 서버에 검증하여 자동 로그인을 처리

    if (resLogin.status === 200) {
      dispatch(
        login({
          id: loginIdInput.current.value,
          // password: loginPwInput.current.value,
        }),
      );
      loginIdInput.current.value = '';
      loginPwInput.current.value = '';
      const data = await resLogin.json();
      const token = data.token;
      window.localStorage.setItem('token', token);
      alert(await resLogin.json()); // 로그인 성공 하였습니다 라는 값 받아왔음.
      navigate('/');
    } else {
      alert(await resLogin.json());
    }
  };

  // Caps Lock 표시를 위한 state 설정
  const [capsLockOn, setCapsLockOn] = useState(false);

  // 비밀번호 표시를 위한 state 설정
  const [showPassword, setShowPassword] = useState(false);

  return (
    <LoginStyle>
      <p className="logo-part">
        <img src={logo} alt="로고" />
      </p>
      {/* 메인 제목 파트 */}
      <TitlePart
        animate={{ translateX: '-24.2vw' }}
        transition={{ duration: 0.8 }}
      >
        <h1>
          Sharing
          <p>Whatever you need</p>
        </h1>
      </TitlePart>
      {/* 로그인 파트 */}
      <div className="login-part">
        <h1>Login</h1>
        <p>
          <FontAwesomeIcon icon={faEnvelope} />
          <input type="text" ref={loginIdInput} />
        </p>
        <p>
          <FontAwesomeIcon icon={faLock} />
          <input type={showPassword ? 'text' : 'password'} ref={loginPwInput} />
          <button
            className="pw-show-hide_btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FontAwesomeIcon
                className="pw-show-hide_btn_icon"
                icon={faEyeSlash}
              />
            ) : (
              <FontAwesomeIcon className="pw-show-hide_btn_icon" icon={faEye} />
            )}
          </button>
          {capsLockOn && <div>Caps Lock이 켜져 있습니다.</div>}
        </p>
        <button className="register_btn">
          <Link to="/register">sign up</Link>
        </button>

        <div className="btn-part">
          <Link to={KAKAO_AUTH_URL} className="kakao_btn">
            {/* {kakaotalkImg} */}
          </Link>
          <button className="login_btn" onClick={loginUser}>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="menu_next_button_icon"
            />
          </button>
        </div>
      </div>
    </LoginStyle>
  );
}
