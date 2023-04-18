import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faComments,
  faCircleQuestion,
  faUser,
  faCommentDots,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { FaGithub, FaBlogger } from 'react-icons/fa';
import React, { useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import config from '../chatbot/config';
import Chatbot from 'react-chatbot-kit';
import MessageParser from '../chatbot/MessageParser';
import ActionProvider from '../chatbot/ActionProvider';
import 'react-chatbot-kit/build/main.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import logo from '../img/logo.png';
import img1 from './member/chanho.png';
import img2 from './member/yu.png';
import img3 from './member/jung.png';
import img4 from './member/min.png';
import img5 from './member/inyoung.png';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Mainstyle = styled.div`
  //챗봇 전체 스타일 관리
  .chat_bot_btn {
    cursor: pointer;
    width: 45px;
    height: 45px;
    position: fixed;
    bottom: 10vh;
    left: 13vw;
    background-color: #c6e36b;
    border-radius: 50%;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 25%);
    .chat_bot_icon {
      width: 25px;
      height: 25px;
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .chatbotallcontroller {
    display: none;
    overflow: hidden;
    position: relative;
    top: 2vh;
    left: 13vw;
    width: 20vw;
    height: 70vh;
    color: #fff;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    position: relative;
    z-index: 1;
    // 첫 화면에 나오는 페이지
    .main {
      width: 100%;
      height: 85%;
      background: rgb(246, 243, 243);
      .header {
        display: flex;
        width: 100%;
        height: 30%;
        justify-content: space-around;
        background-color: #c6e36b;
        p {
          font-size: 5rem;
        }
        img {
          position: relative;
          top: 2vh;
          width: 50px;
          height: 50px;
        }
      }
      .contents {
        position: absolute;
        width: 80%;
        height: 20%;
        background-color: #fff;
        border-radius: 15px;
        z-index: 2;
        top: 10vh;
        left: 2vw;
        p {
          position: absolute;
          top: 2vh;
          left: 3vw;
          line-height: 5vh;
          font-size: 2rem;
          font-weight: 700;
          color: gray;
        }
      }
      .calendar-container {
        position: relative;
        top: 8vh;
        left: 0.5vw;
        .react-calendar {
          width: 320px;
          height: 270px;
          max-width: 100%;
          background-color: #fff;
          color: #222;
          border-radius: 8px;
          line-height: 1.125em;
          border: none;
        }
        .react-calendar__navigation button {
          color: #3e4822;
          min-width: 44px;
          background: none;
          font-size: 20px;
          margin-top: 8px;
        }
        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background-color: #f8f8fa;
        }
        .react-calendar__navigation button[disabled] {
          background-color: #f0f0f0;
        }
        abbr[title] {
          text-decoration: none;
        }
        .react-calendar__month-view__weekdays {
          text-align: center;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 3rem;
        }
        .react-calendar__month-view__days {
          font-size: 3rem;
        }
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background: #f8f8fa;
          color: #3e4822;
          border-radius: 6px;
        }
        .react-calendar__tile--now {
          background: #c6e36b;
          border-radius: 6px;
          font-weight: bold;
          color: #c6e36b;
        }
        .react-calendar__tile--now:enabled:hover,
        .react-calendar__tile--now:enabled:focus {
          background: #c6e36b;
          border-radius: 6px;
          font-weight: bold;
          color: #fff;
        }
        .react-calendar__tile--now {
          background: #c6e36b;
          border-radius: 6px;
          font-weight: bold;
          color: #fff;
        }
        .react-calendar__tile--hasActive:enabled:hover,
        .react-calendar__tile--hasActive:enabled:focus {
          background: #f8f8fa;
        }
        .react-calendar__tile--active {
          background: #c6e36b;
          border-radius: 6px;
          font-weight: bold;
          color: white;
        }
        .react-calendar__tile--active:enabled:hover,
        .react-calendar__tile--active:enabled:focus {
          background: #c6e36b;
          color: white;
        }
        .react-calendar--selectRange .react-calendar__tile--hover {
          background-color: #f8f8fa;
        }
      }
    }
    // 두번쨰 챗봇 부분
    .msg {
      display: none;
      height: 85%;
      .msgcontroller {
        height: 50%;
        .react-chatbot-kit-chat-container {
          width: 20vw;
          height: 60vh;
        }
        .react-chatbot-kit-chat-bot-message-container {
          display: flex;
          margin: 15px 0;
          justify-content: flex-start;
          img {
            border: 0px;
            vertical-align: top;
            position: relative;
            left: 0.5vw;
          }
        }
        .react-chatbot-kit-chat-bot-message {
          background-color: #b8d366;
          padding: 10px;
          border-radius: 5px;
          color: #fff;
          font-weight: medium;
          position: relative;
          width: 200px;
          margin-left: auto;
          text-align: left;
          img {
            border: 0px;
            vertical-align: top;
            position: relative;
            left: 100vw;
          }
          span {
            font-size: 1.3rem;
          }
        }
        .react-chatbot-kit-chat-bot-message-arrow {
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-right: 8px solid #b8d366;
          position: absolute;
          left: -7px;
          top: 13px;
        }
        .react-chatbot-kit-chat-btn-send {
          background-color: #b8d366;
          width: 100px;
          border: none;
          color: #fff;
          border-bottom-right-radius: 5px;
        }
        .react-chatbot-kit-chat-message-container {
          padding: 0 17.5px 10px 17.5px;
          overflow: scroll;
          height: 50vh;
        }
        .react-chatbot-kit-chat-input {
          width: 100%;
          padding: 12.5px;
          border: none;
          font-size: 1.3rem;
          border-top: 1px solid #d8d8d8;
          border-bottom-left-radius: 5px;
        }
        .learning-options-container {
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
          position: relative;
          left: 2vw;
        }
      }
    }
    .member {
      display: none;
      height: 85%;
      background: rgb(246, 243, 243);
      color: black;
      overflow-y: scroll;
      overflow-x: hidden;

      .person {
        ol {
          transform: translateX(2vw);
          li {
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            width: 80%;
            height: 11.9vh;
            line-height: 11.9vh;
            border-top: 1px solid #c6e36b;
            :first-child {
              border-top: none;
            }
            p {
              font-size: 1.5rem;
              :nth-child(2) {
                color: #769c06;
              }
            }
          }
          div {
            display: none;
            width: 80%;
            img {
              position: relative;
              left: 3vw;
              width: 10vw;
              height: 20vh;
              border-radius: 50%;
              box-shadow: rgba(0, 0, 0, 0.25) 4px 4px 4px;
            }
            p {
              position: relative;
              top: 2vh;
              font-size: 1.8rem;
              text-align: center;
            }
            .icon {
              width: 100%;
              display: flex;
              justify-content: space-around;
              a {
                font-size: 6rem;
              }
            }
          }
        }
      }
    }

    // 밑에 있는 3개의 버튼
    .footer {
      position: fixed;
      width: 20vw;
      height: 10.5vh;
      color: black;
      border-top: gray;
      border-radius: 0px 0px 16px 16px;
      background-color: rgb(246, 243, 243);
      z-index: 10;
      ol {
        cursor: pointer;
        display: flex;
        width: 100%;
        justify-content: space-around;
        font-size: 14px;
        border-top: 1px solid rgba(0, 0, 0, 0.05);
        box-shadow: rgba(237, 237, 237, 0.05) 0px 0px 25px;
        text-align: center;
        li {
          width: 100%;
          p {
            font-size: 1.3rem;
          }
          p.icon {
            font-size: 4rem;
          }
        }
      }
    }
  }
`;

export default function Chatbotcontent() {
  const [value, onChange] = useState(new Date());
  const userID = useSelector(state => state.user.userID);
  const [name, setName] = useState();
  const [render, setRender] = useState();
  const userName = async () => {
    try {
      const setUserName = await axios.get(
        `http://localhost:4000/chatBot/${userID}`,
      );
      setName(setUserName.data);
      setRender(!render);
    } catch (error) {
      console.error(error);
      console.log('챗봇 잘못되었다.');
    }
  };

  return (
    <>
      <Mainstyle>
        <div
          className="chat_bot_btn"
          onClick={() => {
            userName();
            const controller = document.querySelector('.chatbotallcontroller');
            controller.style.display =
              controller.style.display === 'none' ||
              controller.style.display === ''
                ? 'block'
                : 'none';
          }}
        >
          <FontAwesomeIcon icon={faCommentDots} className="chat_bot_icon" />
        </div>
        <div className="chatbotallcontroller">
          <div className="main on">
            <div className="header">
              <img src={logo} alt="로고" />
              <p className="icon">
                <FontAwesomeIcon icon={faUser} />
              </p>
            </div>
            <div className="contents">
              <p>
                Hello {name},
                <br />
                How can we help?
              </p>
            </div>
            <div className="calendar-container">
              <Calendar onChange={onChange} value={value} />
            </div>
          </div>
          <div className="msg">
            <div className="msgcontroller">
              <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
              />
            </div>
          </div>
          <div className="member">
            <div className="person">
              <ol>
                <li
                  onClick={() => {
                    const open = document.querySelector('.profile1');
                    open.style.display =
                      open.style.display === 'none' || open.style.display === ''
                        ? 'block'
                        : 'none';
                  }}
                >
                  <p>이찬호</p>
                  <p>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </p>
                </li>
                <div className="profile1">
                  <img src={img1} alt="이찬호" />
                  <p>zack8361</p>
                  <div className="icon">
                    <a href="https://github.com/zack8361" target="_blank">
                      <FaGithub />
                    </a>
                    <a href="https://kong8361.tistory.com" target="_blank">
                      <FaBlogger />
                    </a>
                  </div>
                </div>

                <li
                  onClick={() => {
                    const open = document.querySelector('.profile2');
                    open.style.display =
                      open.style.display === 'none' || open.style.display === ''
                        ? 'block'
                        : 'none';
                  }}
                >
                  <p>이유림</p>
                  <p>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </p>
                </li>
                <div className="profile2">
                  <img src={img2} alt="이유림" />
                  <p>yulimle</p>
                  <div className="icon">
                    <a href="https://github.com/yulimle" target="_blank">
                      <FaGithub />
                    </a>
                    <a href="https://velog.io/@yulimle" target="_blank">
                      <FaBlogger />
                    </a>
                  </div>
                </div>

                <li
                  onClick={() => {
                    const open = document.querySelector('.profile3');
                    open.style.display === 'none' || open.style.display === ''
                      ? 'block'
                      : 'none';
                  }}
                >
                  <p>김정혁</p>
                  <p>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </p>
                </li>
                <div className="profile3">
                  <img src={img3} alt="김정혁" />
                  <p>jeong-hyuk</p>
                  <div className="icon">
                    <a href="https://github.com/jeong-hyuk" target="_blank">
                      <FaGithub />
                    </a>
                    <a href="https://jack1150.tistory.com/" target="_blank">
                      <FaBlogger />
                    </a>
                  </div>
                </div>

                <li
                  onClick={() => {
                    const open = document.querySelector('.profile4');
                    open.style.display === 'none' || open.style.display === ''
                      ? 'block'
                      : 'none';
                  }}
                >
                  <p>송민영</p>
                  <p>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </p>
                </li>
                <div className="profile4">
                  <img src={img4} alt="송민영" />
                  <p>songmy1206</p>
                  <div className="icon">
                    <a href="https://github.com/songmy1206" target="_blank">
                      <FaGithub />
                    </a>
                    <a href="https://fromys.tistory.com/" target="_blank">
                      <FaBlogger />
                    </a>
                  </div>
                </div>

                <li
                  onClick={() => {
                    const open = document.querySelector('.profile5');
                    open.style.display === 'none' || open.style.display == ''
                      ? 'block'
                      : 'none';
                  }}
                >
                  <p>최인영</p>
                  <p>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </p>
                </li>
                <div className="profile5">
                  <img src={img5} alt="최인영" />
                  <p>choiinyoung</p>
                  <div className="icon">
                    <a href="https://github.com/choiinyoung" target="_blank">
                      <FaGithub />
                    </a>
                    <a href="https://velog.io/@choiinyoung" target="_blank">
                      <FaBlogger />
                    </a>
                  </div>
                </div>
              </ol>
            </div>
          </div>
          <div className="footer">
            <ol>
              <li
                onClick={() => {
                  document.querySelector('.main').style.display = 'block';
                  document.querySelector('.msg').style.display = 'none';
                  document.querySelector('.member').style.display = 'none';
                }}
              >
                <p className="icon">
                  <FontAwesomeIcon icon={faHouse} />
                </p>
                <p>Home</p>
              </li>

              <li
                onClick={() => {
                  document.querySelector('.main').style.display = 'none';
                  document.querySelector('.msg').style.display = 'block';
                  document.querySelector('.member').style.display = 'none';
                }}
              >
                <p className="icon">
                  <FontAwesomeIcon icon={faComments} />
                </p>
                <p>Messages</p>
              </li>
              <li
                onClick={() => {
                  document.querySelector('.main').style.display = 'none';
                  document.querySelector('.msg').style.display = 'none';
                  document.querySelector('.member').style.display = 'block';
                }}
              >
                <p className="icon">
                  <FontAwesomeIcon icon={faCircleQuestion} />
                </p>
                <p>member</p>
              </li>
            </ol>
          </div>
        </div>
      </Mainstyle>
    </>
  );
}
