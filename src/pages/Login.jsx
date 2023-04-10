
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

  return (
    <>
      {/* 로그인 파트 */}
      <h1>로그인 파트</h1>
      아이디 <input type="text" ref={loginIdInput} />
      <br />
      <br />
      비밀번호 <input type="password" ref={loginPwInput} />
      <br />
      <br />
      <button onClick={loginUser}>로그인</button>
      <Link to="/register">회원가입</Link>
      <br />
      <br />
      <Link to={KAKAO_AUTH_URL}>카카오 로그인</Link>
    </>
  );
}

// const resRegister = await fetch('http://localhost:4000/user/register', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     id: registerIdInput.current.value,
//     password: registerPwInput.current.value,
//   }),
// });

// if (resRegister.status !== 200) return alert(await resRegister.json());

// alert(await resRegister.json());
// dispatch(
//   login({
//     id: registerIdInput.current.value,
//     password: registerPwInput.current.value,
//   }),
// );

//   import axios from 'axios';
// import React, { useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { login } from '../store/modules/user';

// export default function Login() {
//   const registerIdInput = useRef();
//   const registerPwInput = useRef();

//   const dispatch = useDispatch();

//   const registerUser = async () => {
//     if (!registerIdInput.current.value || !registerPwInput.current.value)
//       return alert('필수 값을 입력해 주세요');

//     const resRegister = await axios.post(
//       'http://localhost:4000/user/register',
//       {
//         id: registerIdInput.current.value,
//         password: registerPwInput.current.value,
//       },
//     );

//     if (resRegister.status !== 200) return alert(resRegister.data);

//     alert(resRegister.data);
//     dispatch(
//       login({
//         id: registerIdInput.current.value,
//         password: registerPwInput.current.value,
//       }),
//     );
//   return (
//     <>
//       {/* 로그인 파트 */}
//       <h1>로그인 파트입니다</h1>
//       아이디 : <input type="text" />
//       <br />
//       <br />
//       비밀번호 : <input type="password" />
//       <br />
//       <br />
//       <button>로그인</button> <Link to="">카카오 로그인</Link>
//       <br />
//       <br />
//       {/* 회원 가입 파트 */}
//       <h1>회원 가입 파트입니다</h1>
//       아이디 : <input type="text" ref={registerIdInput} />
//       <br />
//       <br />
//       비밀번호 : <input type="password" ref={registerPwInput} />
//       <br />
//       <br />
//       <button onClick={registerUser}>회원 가입</button>
//       <br />
//       <br />
//     </>
//   );
// }
