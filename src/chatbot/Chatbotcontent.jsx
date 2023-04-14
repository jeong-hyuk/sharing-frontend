import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faComments,
  faCircleQuestion,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styled from 'styled-components';
import config from '../chatbot/config';
import Chatbot from 'react-chatbot-kit';
import MessageParser from '../chatbot/MessageParser';
import ActionProvider from '../chatbot/ActionProvider';
import 'react-chatbot-kit/build/main.css';

const Mainstyle = styled.div`
  //챗봇 전체 스타일 관리
  .chatbotallcontroller {
    overflow: hidden;
    transform: translate(50vw, 22vh);
    width: 20vw;
    height: 70vh;
    color: #fff;
    box-shadow: 0 0 0.5px 0.5px gray;
    border-radius: 15px;
    .on {
      display: block;
    }
    // 첫 화면에 나오는 페이지
    .main {
      width: 100%;
      height: 85%;
      background: linear-gradient(black, #d4d2d2, #fff);
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
  return (
    <>
      <Mainstyle>
        <div className="chatbotallcontroller">
          <div className="main on">
            <div className="header">
              <img src="-" alt="로고" />
              <p className="icon">
                <FontAwesomeIcon icon={faUser} />
              </p>
            </div>
            <div className="content">
              <p>
                Hello 인영,
                <br />
                How can we help?
              </p>
            </div>
            <div>달력</div>
          </div>
          {/* <div className="msg">
            <div className="msgcontroller">
              <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
              />
            </div>
          </div> */}
          <div className="help"></div>
          <div className="footer">
            <ol>
              <li>
                <p className="icon">
                  <FontAwesomeIcon icon={faHouse} />
                </p>
                <p>Home</p>
              </li>
              <li>
                <p className="icon">
                  <FontAwesomeIcon icon={faComments} />
                </p>
                <p>Messages</p>
              </li>
              <li>
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
