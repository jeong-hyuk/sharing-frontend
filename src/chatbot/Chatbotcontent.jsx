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
import logo from '../img/logo.png';
import img1 from './member/chanho.png';
// import img2 from './member/yu.png';
// import img3 from './member/jung.png';
// import img4 from './member/min.png';
// import img5 from './member/young.png';

const Mainstyle = styled.div`
  position: absolute;
  z-index: 5;
  //챗봇 전체 스타일 관리
  .chat_bot_btn {
    cursor: pointer;
    width: 45px;
    height: 45px;
    position: fixed;
    bottom: 5vh;
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
    top: 18vh;
    left: 13vw;
    width: 20vw;
    height: 70vh;
    color: #fff;
    box-shadow: 0 0 0.5px 0.5px gray;
    border-radius: 15px;
    // 첫 화면에 나오는 페이지
    .main {
      width: 100%;
      height: 85%;
      background: linear-gradient(#618ffc, #d4d2d2, #fff);
      .header {
        display: flex;
        height: 15%;
        justify-content: space-around;
        p {
          font-size: 5rem;
          transform: translateX(2vw);
        }
      }
      .content {
        height: 30%;
        p {
          font-size: 2.5rem;
          font-weight: 700;
          transform: translate(2.5vw, 5vh);
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
        .react-chatbot-kit-chat-message-container {
          padding: 0 17.5px 10px 17.5px;
          overflow: scroll;
          height: 50vh;
        }
      }
    }
    .member {
      display: none;
      height: 85%;
      background-color: #fff;
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
            border-top: 1px solid rgba(0, 0, 0, 0.08);
            p {
              font-size: 1.5rem;
            }
          }
          div {
            display: none;
            width: 80%;
            p {
              font-size: 1.5rem;
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
      border-radius: 0px 0px 20px 20px;
      background-color: rgb(255, 255, 255);
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
  return (
    <>
      <Mainstyle>
        <div
          className="chat_bot_btn"
          onClick={() => {
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
                Hello 인영,
                <br />
                How can we help?
              </p>
            </div>
            <div>달력</div>
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
                    <a href="https://kong8361.tistory.com/" target="_blank">
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
                  <img src="./member/yu.png" alt="이유림" />
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
                    open.style.display =
                      open.style.display === 'none' ? 'block' : 'none';
                  }}
                >
                  <p>김정혁</p>
                  <p>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </p>
                </li>
                <div className="profile3">
                  <img src="./member/jung.png" alt="김정혁" />
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
                    open.style.display =
                      open.style.display === 'none' ? 'block' : 'none';
                  }}
                >
                  <p>송민영</p>
                  <p>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </p>
                </li>
                <div className="profile4">
                  <img src="./member/min.png" alt="송민영" />
                  <p>songmy1206</p>
                  <div className="icon">
                    <a href="https://github.com/songmy1206" target="_blank">
                      <FaGithub />
                    </a>
                    <a href="https://jack1150.tistory.com/" target="_blank">
                      <FaBlogger />
                    </a>
                  </div>
                </div>

                <li
                  onClick={() => {
                    const open = document.querySelector('.profile5');
                    open.style.display =
                      open.style.display === 'none' ? 'block' : 'none';
                  }}
                >
                  <p>최인영</p>
                  <p>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </p>
                </li>
                <div className="profile5">
                  <img src="./member/chanho.png" alt="최인영" />
                  <p>choiinyoung</p>
                  <div className="icon">
                    <a href="https://github.com/choiinyoung" target="_blank">
                      <FaGithub />
                    </a>
                    <a href="https://jack1150.tistory.com/" target="_blank">
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
