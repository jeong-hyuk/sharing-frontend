import React, { useReducer, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/modules/user';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleArrowRight,
  faLock,
  faPhone,
  faSignature,
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { motion } from 'framer-motion';

const RegisterStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 5px 5px 13px 15px rgba(0, 0, 0, 10%);
  width: 74vw;
  height: 66vh;
  // 로고 파트
  .logo-part {
    position: absolute;
    top: calc((7.4vw - 10vh) / 2);
    left: calc((7.4vw - 10vh) / 2);
    width: 10vh;
    height: 10vh;
    background-color: #81a8e3;
    opacity: 0.5;
    border-radius: 10px;
  }
  // 메인 제목 부분
  .title-part {
    z-index: 2;
    /* background-color: #556080; */
    background-color: #81a8e3;
    width: 35vw;
    position: absolute;
    top: -5vh;
    left: 10%;
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
  }
  // 회원가입 파트
  .register-part {
    width: 32%;
    position: absolute;
    left: 12%;
    top: 45%;
    transform: translate(0, -50%);
    h1 {
      width: 65%;
      font-size: 3.5rem;
      color: #565a7a;
      margin-bottom: 15px;
      font-weight: 730;
    }
    p {
      display: flex;
      width: 65%;
      font-size: 5rem;
      color: #888888;
      border-bottom: 1px solid #888888;
      padding-top: 20px;
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
    button {
      position: absolute;
      right: 36%;
      margin-top: 23px;

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
`;
export default function Register() {
  const registerIdInput = useRef();
  const registerPwInput = useRef();
  const passwordConfirmInput = useRef();
  const phoneNumber = useRef();
  const userName = useRef();

  const [idValue, setIdValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordConfirmValue, setPasswordConfirmValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [phoneNumberValue, setPhoneNumberValue] = useState('');

  const inputFocus = event => {
    const id = event.target.id;
    switch (id) {
      case 'id-input':
        setIdValue('아이디를 입력하세요');
        break;
      case 'password-input':
        setPasswordValue('비밀번호를 입력하세요');
        break;
      case 'password-repeat':
        setPasswordConfirmValue('비밀번호 재확인');
        break;
      case 'name-input':
        setNameValue('이름을 입력하세요');
        break;
      case 'phoneNumber-input':
        setPhoneNumberValue('전화번호를 입력하세요');
        break;
      default:
        break;
    }
  };

  const handleInputChange = event => {
    const id = event.target.id;
    const value = event.target.value;

    switch (id) {
      case 'id-input':
        setIdValue(value);
        break;
      case 'password-input':
        setPasswordValue(value);
        break;
      case 'password-repeat':
        setPasswordConfirmValue(value);
        break;
      case 'name-input':
        setNameValue(value);
        break;
      case 'phoneNumber-input':
        setPhoneNumberValue(value);
        break;
      default:
        break;
    }
  };
  const inputBlur = event => {
    const id = event.target.id;
    switch (id) {
      case 'id-input':
        setIdValue('');
        break;
      case 'password-input':
        setPasswordValue('');
        break;
      case 'password-repeat':
        setPasswordConfirmValue('');
        break;
      case 'name-input':
        setNameValue('');
        break;
      case 'phoneNumber-input':
        setPhoneNumberValue('');
        break;
      default:
        break;
    }
  };
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  // const checkDuplicateUser = async () => {
  //   try {
  //     if (!registerIdInput.current.value) return alert('ID 를 입력해 주세요');

  //     const resRegister = await axios.post('http://localhost:4000/duplicate', {
  //       id: registerIdInput.current.value,
  //     });

  //     alert(resRegister.data);
  //   } catch (err) {
  //     alert(err.response.data);
  //   }
  // };
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

  // const checkEmail = () => {
  //   const emailValue = registerIdInput.current.value;
  //   if (
  //     !/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(emailValue)
  //   ) {
  //     alert('이메일 형식이 올바르지 않습니다.');
  //     return false;
  //   }
  //   return true;
  // };

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

    // if (!checkEmail()) {
    //   return;
    // }
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
    <RegisterStyle>
      <p className="logo-part"></p>
      <motion.div
        animate={{ translateX: '24.2vw' }}
        transition={{ duration: 0.8 }}
        className="title-part"
      >
        <h1>
          Sharing
          <p>Whatever you need</p>
        </h1>
      </motion.div>
      <div className="register-part">
        <h1>Sign Up</h1>
        <p>
          <FontAwesomeIcon icon={faEnvelope} />
          <input
            id="id-input"
            type="text"
            ref={registerIdInput}
            placeholder={idValue}
            onFocus={inputFocus}
            onBlur={inputBlur}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <FontAwesomeIcon icon={faLock} />
          <input
            id="password-input"
            type="password"
            ref={registerPwInput}
            placeholder={passwordValue}
            onFocus={inputFocus}
            onBlur={inputBlur}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <FontAwesomeIcon icon={faLock} />
          <input
            id="password-repeat"
            type="password"
            ref={passwordConfirmInput}
            placeholder={passwordConfirmValue}
            onFocus={inputFocus}
            onBlur={inputBlur}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <FontAwesomeIcon icon={faSignature} />
          <input
            id="name-input"
            type="text"
            ref={userName}
            placeholder={nameValue}
            onFocus={inputFocus}
            onBlur={inputBlur}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <FontAwesomeIcon icon={faPhone} />
          <input
            id="phoneNumber-input"
            type="text"
            ref={phoneNumber}
            placeholder={phoneNumberValue}
            onFocus={inputFocus}
            onBlur={inputBlur}
            onChange={handleInputChange}
          />
        </p>
        <button onClick={registerUser}>
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            className="menu_next_button_icon"
          />
        </button>
      </div>
    </RegisterStyle>
  );
}
