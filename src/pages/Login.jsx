import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, register } from '../store/modules/user';

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
    window.localStorage.setItem('token', resLogin.data.token);
    if (resLogin.status === 200) {
      dispatch(
        login({
          id: loginIdInput.current.value,
          password: loginPwInput.current.value,
        }),
      );
      loginIdInput.current.value = '';
      loginPwInput.current.value = '';

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
    <>
      {/* 로그인 파트 */}
      <h1>로그인 파트</h1>
      아이디 <input type="text" ref={loginIdInput} />
      <input type={showPassword ? 'text' : 'password'} ref={loginPwInput} />
      {capsLockOn && <div>Caps Lock이 켜져 있습니다.</div>}
      비밀번호
      <button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? '숨기기' : '보기'}
      </button>
      <button onClick={loginUser}>로그인</button>
      <br />
      <button>
        <Link to="/register">회원가입</Link>
      </button>
      <br />
      <button>
        <Link to={KAKAO_AUTH_URL}>카카오 로그인</Link>
      </button>
    </>
  );
}
