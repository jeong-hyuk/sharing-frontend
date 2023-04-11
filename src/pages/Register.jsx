import React, { useReducer, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/modules/user';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const registerIdInput = useRef();
  const registerPwInput = useRef();
  const passwordConfirmInput = useRef();
  const phoneNumber = useRef();
  const userName = useRef();

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  //push 수정
  const checkPassword = () => {
    if (registerPwInput.current.value.length < 8) {
      alert('비밀번호는 8글자 이상이어야 합니다.');
      return false;
    }
    if (registerPwInput.current.value !== passwordConfirmInput.current.value) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }
    return true;
  };

  const checkEmail = () => {
    const emailValue = registerIdInput.current.value;
    if (
      !/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(emailValue)
    ) {
      alert('이메일 형식이 올바르지 않습니다.');
      return false;
    }
    return true;
  };

  const checkName = () => {
    if (/\d/.test(userName.current.value)) {
      alert('이름에는 숫자가 들어갈 수 없습니다.');
      return false;
    }
    return true;
  };

  const checkPhoneNumber = () => {
    const phoneValue = phoneNumber.current.value;
    if (!/^\d{11}$/.test(phoneValue)) {
      alert('전화번호는 11자리 숫자여야 합니다.');
      return false;
    }
    return true;
  };

  const registerUser = async () => {
    if (
      !registerIdInput.current.value ||
      !registerPwInput.current.value ||
      !phoneNumber.current.value ||
      !userName.current.value
    )
      return alert('값을 입력 하세요');

    if (!checkPassword()) {
      return;
    }

    if (!checkName()) {
      return;
    }

    if (!checkPhoneNumber()) {
      return;
    }

    if (!checkEmail()) {
      return;
    }
    const resRegister = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: registerIdInput.current.value,
        password: registerPwInput.current.value,
        name: userName.current.value,
        phone: phoneNumber.current.value,
      }),
    });
    if (resRegister.status === 200) {
      // 성공 했따. 라는 의미입니다.
      dispatch(
        login({
          id: registerIdInput.current.value,
          password: registerPwInput.current.value,
          name: userName.current.value,
          phone: phoneNumber.current.value,
        }),
      );
      registerIdInput.current.value = '';
      registerPwInput.current.value = '';
      userName.current.value = '';
      phoneNumber.current.value = '';
      window.location.href = '/';
      // navigate('/');
      return alert(await resRegister.json());
    } else {
      return alert(await resRegister.json());
    }
  };

  return (
    <>
      <h1>회원가입 파트</h1>
      아이디 <input type="text" ref={registerIdInput} />
      <br />
      <br />
      비밀번호 <input type="password" ref={registerPwInput} />
      <br />
      <br />
      비밀번호 확인 <input type="password" ref={passwordConfirmInput} />
      <br />
      <br />
      전화번호 <input type="text" ref={phoneNumber} />
      <br />
      <br />
      이름 <input type="text" ref={userName} />
      <br />
      <br />
      <button onClick={registerUser}>회원가입</button>
    </>
  );
}
