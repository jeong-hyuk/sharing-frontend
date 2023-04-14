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
      padding: 7vh 0px 3vh 0vw;
    }
    .notice_qna {
      background-color: #fff;
      border-radius: 5px;
      border: 1px solid #fff;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      width: 52vw;
      .notice_q {
        position: relative;
        border: 1px solid rgba(225, 228, 230, 0.5);
        padding: 3vh 3vw 3vh 3vw;
        transition: padding-top 0.5s, padding-bottom 0.5s, height 0.5s, 0.5s;
        cursor: pointer;
        font-size: 1.7rem;
        font-weight: 600;
        .notice_plus,
        .notice_minus {
          position: absolute;
          right: 3vw;
          font-size: 1.7rem;
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
      }
    }
  }
`;

export default function UserNotice() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
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
            q1
            <FontAwesomeIcon icon={faPlus} className="notice_plus" />
            <FontAwesomeIcon icon={faMinus} className="notice_minus" />
            <p className="notice_a">a1</p>
          </li>
          <li
            className={`notice_q ${activeIndex === 1 ? 'active' : ''}`}
            onClick={() => handleClick(1)}
          >
            q2
            <p className="notice_a">a2</p>
          </li>
          <li
            className={`notice_q ${activeIndex === 2 ? 'active' : ''}`}
            onClick={() => handleClick(2)}
          >
            q3
            <p className="notice_a">a3</p>
          </li>
          <li
            className={`notice_q ${activeIndex === 3 ? 'active' : ''}`}
            onClick={() => handleClick(3)}
          >
            q4
            <p className="notice_a">a4</p>
          </li>
          <li
            className={`notice_q ${activeIndex === 4 ? 'active' : ''}`}
            onClick={() => handleClick(4)}
          >
            q5
            <p className="notice_a">a5</p>
          </li>
          <li
            className={`notice_q ${activeIndex === 5 ? 'active' : ''}`}
            onClick={() => handleClick(5)}
          >
            q6
            <p className="notice_a">a6</p>
          </li>
          <li
            className={`notice_q ${activeIndex === 6 ? 'active' : ''}`}
            onClick={() => handleClick(6)}
          >
            q7
            <p className="notice_a">a7</p>
          </li>
          <li
            className={`notice_q ${activeIndex === 7 ? 'active' : ''}`}
            onClick={() => handleClick(7)}
          >
            q8
            <p className="notice_a">a8</p>
          </li>
        </ul>
      </div>
    </Notice>
  );
}
