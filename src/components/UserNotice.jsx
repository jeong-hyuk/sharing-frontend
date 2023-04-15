import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const Notice = styled.div`
  position: fixed;
  top: 11vh;
  right: 0px;
  background-color: rgb(255, 255, 255);
  width: 70vw;
  height: 89vh;
  overflow-y: scroll;
  .Notice_all {
    padding: 0 0 4vh 4vw;
    p {
      font-size: 2.5rem;
      color: #556080;
      font-weight: 700;
      padding: 7vh 0px 3vh 1vw;
    }
    .notice_qna {
      background-color: #fff;
      border-radius: 5px;
      border: 1px solid #fff;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      width: 52vw;
      border-top: 2px solid #565a7ab3;
      .notice_q {
        position: relative;
        border: 1px solid rgba(225, 228, 230, 0.5);
        padding: 3vh 3vw 3vh 3vw;
        transition: padding-top 0.5s, padding-bottom 0.5s, height 0.5s, 0.5s;
        color: #333;
        cursor: pointer;
        font-size: 1.7rem;
        font-weight: 600;
        .notice_icon,
        .notice_plus {
          color: #565a7a;
          position: absolute;
          right: 3vw;
          font-size: 1.7rem;
          transition: transform 0.2s ease-out;
          &.active {
            transform: rotate(180deg);
          }
        }
        &.active {
          .notice_a {
            padding: 3vh 0 0 0;
            height: auto;
            visibility: visible;
            font-size: 1.7rem;
          }
        }
      }
      .notice_a {
        padding-top: 0rem;
        padding-bottom: 0rem;
        height: 0px;
        visibility: hidden;
        transition: padding-top 0.5s, padding-bottom 0.5s, height 0.5s,
          transform 0.5s;
        color: #888;
      }
    }
  }
`;

export default function UserNotice() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Notice>
      <div className="Notice_all">
        <p>공지사항</p>
        <ul className="notice_qna">
          <li
            className={`notice_q ${activeIndex === 0 ? 'active' : ''}`}
            onClick={() => handleClick(0)}
          >
            Q. 율임눈아는 언제 키가 클까요?
            <FontAwesomeIcon
              icon={activeIndex === 0 ? faMinus : faPlus}
              className={`notice_plus ${activeIndex === 0 ? 'active' : ''}`}
            />
            <p className="notice_a">A. 눈아의 성장판은 닫혔습니다.</p>
          </li>
          <li
            className={`notice_q ${activeIndex === 1 ? 'active' : ''}`}
            onClick={() => handleClick(1)}
          >
            Q. 디자인 색은 언제 정해지나요?
            <FontAwesomeIcon
              icon={activeIndex === 1 ? faMinus : faPlus}
              className={`notice_plus ${activeIndex === 1 ? 'active' : ''}`}
            />
            <p className="notice_a">A. ..</p>
          </li>
          <li
            className={`notice_q ${activeIndex === 2 ? 'active' : ''}`}
            onClick={() => handleClick(2)}
          >
            Q. 오늘의 할 일은 무엇인가요?
            <FontAwesomeIcon
              icon={activeIndex === 2 ? faMinus : faPlus}
              className={`notice_plus ${activeIndex === 2 ? 'active' : ''}`}
            />
            <p className="notice_a">A. 관리자 페이지 UI를 시작해야합니다.</p>
          </li>
          <li
            className={`notice_q ${activeIndex === 3 ? 'active' : ''}`}
            onClick={() => handleClick(3)}
          >
            Q.
            <FontAwesomeIcon
              icon={activeIndex === 3 ? faMinus : faPlus}
              className={`notice_plus ${activeIndex === 3 ? 'active' : ''}`}
            />
            <p className="notice_a">A.</p>
          </li>
          <li
            className={`notice_q ${activeIndex === 4 ? 'active' : ''}`}
            onClick={() => handleClick(4)}
          >
            Q.
            <FontAwesomeIcon
              icon={activeIndex === 4 ? faMinus : faPlus}
              className={`notice_plus ${activeIndex === 4 ? 'active' : ''}`}
            />
            <p className="notice_a">A.</p>
          </li>
          <li
            className={`notice_q ${activeIndex === 5 ? 'active' : ''}`}
            onClick={() => handleClick(5)}
          >
            Q.
            <FontAwesomeIcon
              icon={activeIndex === 5 ? faMinus : faPlus}
              className={`notice_plus ${activeIndex === 5 ? 'active' : ''}`}
            />
            <p className="notice_a">A.</p>
          </li>
          <li
            className={`notice_q ${activeIndex === 6 ? 'active' : ''}`}
            onClick={() => handleClick(6)}
          >
            Q.
            <FontAwesomeIcon
              icon={activeIndex === 6 ? faMinus : faPlus}
              className={`notice_plus ${activeIndex === 6 ? 'active' : ''}`}
            />
            <p className="notice_a">A.</p>
          </li>
          <li
            className={`notice_q ${activeIndex === 7 ? 'active' : ''}`}
            onClick={() => handleClick(7)}
          >
            Q.
            <FontAwesomeIcon
              icon={activeIndex === 7 ? faMinus : faPlus}
              className={`notice_plus ${activeIndex === 7 ? 'active' : ''}`}
            />
            <p className="notice_a">A.</p>
          </li>
        </ul>
      </div>
    </Notice>
  );
}
