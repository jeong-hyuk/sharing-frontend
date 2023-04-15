import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faComments,
  faCircleQuestion,
  faUser,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import config from '../chatbot/config';
import Chatbot from 'react-chatbot-kit';
import MessageParser from '../chatbot/MessageParser';
import ActionProvider from '../chatbot/ActionProvider';
import 'react-chatbot-kit/build/main.css';

const Mainstyle = styled.div`
  position: absolute;
  z-index: 1;
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
    transform: translate(13vw, 14vh);
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
    .help {
      display: none;
    }

    // 밑에 있는 3개의 버튼
    .footer {
      position: fixed;
      width: 100%;
      height: 15%;
      color: black;
      border-top: gray;
      border-radius: 0 0 35px 35px;
      z-index: 10;
      ol {
        cursor: pointer;
        display: flex;
        justify-content: space-around;
        font-size: 14px;
        border-top: 1px solid rgba(0, 0, 0, 0.05);
        box-shadow: rgba(237, 237, 237, 0.05) 0px 0px 25px;
        text-align: center;
        li {
          p.icon {
            font-size: 3rem;
          }
        }
      }
    }
  }
`;

export default function Chatbotcontent() {
  // const username = 'choiinyoung';
  // const apiUrl = `https://api.github.com/users/${choiinyoung}`;
  // const img = document.createElement('img');
  // img.src = profileImage;
  // document.querySelector('.profile-image-container').appendChild(img);

  // fetch(apiUrl)
  //   .then(response => response.json())
  //   .then(data => {
  //     const profileImage = data.avatar_url;
  //     console.log(profileImage);
  //   });
  return (
    <>
      <Mainstyle>
        <div
          className="chat_bot_btn"
          onClick={() => {
            const controller = document.querySelector('.chatbotallcontroller');
            controller.style.display =
              controller.style.display === 'none' ? 'block' : 'none';
          }}
        >
          <FontAwesomeIcon icon={faCommentDots} className="chat_bot_icon" />
        </div>
        <div className="chatbotallcontroller">
          <div className="main on">
            <div className="header">
              <img src="-" alt="로고" />
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
          <div className="help">f</div>
          <div className="footer">
            <ol>
              <li
                onClick={() => {
                  document.querySelector('.main').style.display = 'block';
                  document.querySelector('.msg').style.display = 'none';
                  document.querySelector('.help').style.display = 'none';
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
                  document.querySelector('.help').style.display = 'none';
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
                  document.querySelector('.help').style.display = 'block';
                }}
              >
                <p className="icon">
                  <FontAwesomeIcon icon={faCircleQuestion} />
                </p>
                <p>Help</p>
              </li>
            </ol>
          </div>
        </div>
      </Mainstyle>
    </>
  );
}
