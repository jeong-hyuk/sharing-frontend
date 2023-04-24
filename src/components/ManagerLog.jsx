import React from 'react';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Rent = styled.div`
  position: fixed;
  top: 11vh;
  right: 0px;
  background-color: rgb(255, 255, 255);
  width: 70vw;
  height: 90vh;
  overflow-y: scroll;
  overflow-x: hidden;
  .all_log {
    position: absolute;
    top: 6.5vh;
    left: 4vw;
    width: 52vw;
    .tab_name {
      display: flex;
      p.subtab {
        background-color: #fff;
        color: #556080;
        transition: all 0.1s;
      }
      .product_laptop,
      .product_mouse,
      .product_charger {
        font-size: 1.7rem;
        font-weight: 700;
        padding: 2vh 0 2vh 0;
        width: 8vw;
        height: 2vh;
        text-align: center;
        border-radius: 5px 5px 0 0;
        cursor: pointer;
        background-color: #556080;
        color: #fff;
        border-top: 0.5px solid #fff;
        border-left: 0.5px solid #fff;
        border-right: 0.5px solid #fff;
        transition: all 0.1s;
      }
    }
    .laptop_log,
    .mouse_log,
    .charger_log {
      width: 52vw;
      background-color: #fff;
      border-radius: 0 0 5px 5px;
      border: 1px solid #fff;
      border-top: 2px solid #556080;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      height: 71vh;
      .current_rent {
        border-bottom: 1px solid rgba(225, 228, 230, 0.5);
        div {
          margin: 2vh 1vw 2vh 1vw;
          display: flex;
          /* justify-content: space-around; */
          text-align: center;
        }
        p {
          font-size: 1.7rem;
          width: 25%;
        }
      }
    }
  }
`;

export default function ManagerLog() {
  const [selectTab, setSelectTab] = useState(0);

  // console.log(objType);
  // object map 데이터 받아오기.
  const [top, setTop] = useState([]);
  const [bottom, setBottom] = useState([]);
  const [render, setRender] = useState(false);
  // 현재 날짜 계산 해보자
  const today = new Date();
  const year = today.getFullYear();
  const month = `0${today.getMonth() + 1}`.slice(-2);
  const day = `0${today.getDate()}`.slice(-2);
  const dateString = `${year}-${month}-${day}`;
  const userId = useSelector(state => state.user.userID);

  const showObject = async () => {
    try {
      const resShowObject = await axios.get(
        'http://localhost:4000/log/showLog',
      );
      setTop(resShowObject.data.ARTICLE);
    } catch (error) {
      console.error(error);
      console.log('로그 윗부분 오류');
    }
  };

  const showOBject2 = async type => {
    try {
      const resShowObject2 = await axios.get(
        `http://localhost:4000/log/showLog/${type}`,
      );
      console.log(resShowObject2.data.ARTICLE);
      setBottom(resShowObject2.data.ARTICLE);
    } catch (error) {
      console.error(error);
      console.log('로그 밑부분 오류');
    }
  };

  useEffect(() => {
    showObject();
    showOBject2('0001');
  }, []);

  return (
    <Rent>
      <ul className="all_log">
        <li className="tab_name">
          {top.map((el, idx) => {
            return (
              <p
                key={idx}
                className={`product_charger ${
                  selectTab === idx ? 'subtab' : ''
                }`}
                onClick={() => {
                  setSelectTab(idx), showOBject2(el.OBJECT_TYPE);
                }}
              >
                {el.OBJECT_NAME}
              </p>
            );
          })}
        </li>
        <li>
          {top.map((el, topIdx) => {
            return (
              <ul
                className="mouse_log"
                style={{
                  display: selectTab === topIdx ? 'block' : 'none',
                  transition: 'all .1s',
                }}
                key={topIdx}
              >
                {bottom.map((el, idx) => {
                  return (
                    <li key={idx} className="current_rent">
                      <div>
                        <p>{el.CODE}</p>
                        <p>{el.NAME}</p>
                        {/* <p>{el.RENT_USER_ID}</p> */}
                        <p>{el.START_DATE.slice(0, 10)}</p>
                        <p>{el.END_DATE.slice(0, 10)}</p>
                        {/* <p>
                  {dateString >= `${el.END_DATE.slice(0, 10)}`
                    ? '연체'
                    : '대여'}
                </p> */}
                      </div>
                    </li>
                  );
                })}
              </ul>
            );
          })}
          ;
        </li>
      </ul>
    </Rent>
  );
}
