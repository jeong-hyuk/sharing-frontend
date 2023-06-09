import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ManagerNotice from './ManagerNotice';

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
  const userId = useSelector(state => state.user.userID);
  const [items, setItems] = useState([]);

  const handleClick = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const checkBoxClick = e => {
    e.stopPropagation();
  };
  return <ManagerNotice />;
}
