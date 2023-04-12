import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styled from 'styled-components';

const Mainstyle = styled.div`
  position: relative;
  .chatbotallcontroller {
    position: absolute;
    transform: translate(75vw, 35vh);
    width: 23vw;
    height: 60vh;
    background-color: #ffa6004a;
    border: 1px solid black;
    border-radius: 10%;
  }
  .footer {
    position: fixed;
    width: 23vw;
    height: 12vh;
    background-color: #c4040449;
    ol {
      li {
        p.icon {
          font-size: 3rem;
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
              <img src="-" alt="사용자" />
            </div>
            <h1>
              Hello 인영,
              <br />
              How can we help?
            </h1>
            <div>달력</div>
          </div>
          {/* <div className="msg"></div>
        <div className="help"></div> */}
          <div className="footer">
            <ol>
              <li>
                <p className="icon">
                  <FontAwesomeIcon icon={faHouse} />
                </p>
                <p>Home</p>
              </li>
              <li>
                <span className="material-symbols-outlined">forum</span>
                <span>Messages</span>
              </li>
              <li>
                <span className="material-symbols-outlined">help</span>
                <span>Help</span>
              </li>
            </ol>
          </div>
        </div>
      </Mainstyle>
    </>
  );
}
