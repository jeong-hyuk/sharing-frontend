import * as React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import { Link } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Desktopstyle = styled.div`
  position: relative;
  top: 20vh;
  left: 14vw;
  width: 72vw;
  height: 70vh;
  text-align: center;
  .allcontroller {
    display: flex;
    height: 70vh;
    .leftcontroller {
      width: 70vw;
      .title {
        background-color: #446a72;
        color: #fff;
        border-radius: 5px;
        height: 7vh;
        margin-bottom: 2vh;
        ol {
          display: flex;
          justify-content: space-around;
          li {
            font-size: 1.6rem;
            width: 33.3333%;
            height: 7vh;
            line-height: 7vh;
            border-right: 1px solid #fff;
            :last-child {
              border-right: none;
            }
          }
        }
      }
      .content {
        border: 1px solid #446a72;
        height: 60vh;
        border-radius: 5px;
        ol {
          li {
            display: flex;
            justify-content: space-around;
            height: 7vh;
            line-height: 7vh;
            border-bottom: 1px solid gray;
            p {
              width: 33.3333%;
              text-align: center;
              font-size: 1.6rem;
              height: 5vh;
            }
            p:last-child {
              cursor: pointer;
              margin-top: 1vh;
              transform: translateX(5vw);
              color: #fff;
              background-color: #446a72;
              border-radius: 5px;
              font-size: 1.6rem;
              width: 3vw;
              height: 5vh;
              line-height: 5vh;
            }
          }
          border-bottom: none;
        }
      }
    }
    .rightcontroller {
      width: 5vw;
      height: 70vh;
      margin-left: 1vw;
      .blank {
        width: 5vw;
        height: 7vh;
        background-color: #446a72;
        margin-bottom: 2vh;
        border-radius: 5px;
      }
      .okbg {
        width: 5vw;
        height: 60vh;
        border: 1px solid #446a72;
        border-radius: 5px;
      }
    }
  }
`;

const Tabletstyle = styled.div`
  position: relative;
  top: 20vh;
  left: 14vw;
  width: 72vw;
  height: 70vh;
  text-align: center;
  .allcontroller {
    display: flex;
    height: 70vh;
    width: 100vw;
    .leftcontroller {
      /* width: 70vw; */
      .title {
        background-color: #446a72;
        color: #fff;
        border-radius: 5px;
        height: 7vh;
        margin-bottom: 2vh;
        ol {
          display: flex;
          justify-content: space-around;
          li {
            font-size: 1.6rem;
            width: 20vw;
            height: 7vh;
            line-height: 7vh;
            border-right: 1px solid #fff;
            :last-child {
              border-right: none;
            }
          }
        }
      }
      .content {
        border: 1px solid #446a72;
        height: 60vh;
        border-radius: 5px;
        ol {
          li {
            display: flex;
            justify-content: space-around;
            width: 70vw;
            height: 7vh;
            border-bottom: 1px solid gray;
            p {
              text-align: center;
              font-size: 1.6rem;
              height: 5vh;
            }
          }
          border-bottom: none;
        }
      }
    }
    .rightcontroller {
      width: 5vw;
      height: 70vh;
      margin-left: 1vw;
      .blank {
        width: 5vw;
        height: 7vh;
        background-color: #446a72;
        margin-bottom: 2vh;
        border-radius: 5px;
      }
      .okbtn {
        font-size: 1.6rem;
        width: 5vw;
        height: 60vh;
        border: 1px solid #446a72;
        border-radius: 5px;
        div {
          cursor: pointer;
          top: 10vh;
          left: 72vw;
          position: absolute;
          background-color: #446a72bb;
          border-radius: 5px;
          font-size: 1.6rem;
          width: 3vw;
          height: 5vh;
        }
      }
      .under {
      }
    }
  }
`;
export default function ProductTable({ page, subMainData }) {
  // console.log(subMainData[0].OBJECT_TYPE);
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    return isTablet ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };
  const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 });
    return isNotMobile ? children : null;
  };
  const userId = useSelector((state) => state.user.userID);

  const findRent = async () => {
    try {
      // store 에서 가져온 나의 user_id
      const type = subMainData[0].OBJECT_TYPE;
      const findRentObj = await axios.get(
        `http://localhost:4000/subMain/find/${userId}/${type}`,
      );
      console.log(findRentObj);
    } catch (error) {
      console.log('여기로왔다~~~~~~~~~~~~~~~~~');
      console.error(error);
    }
  };

  return (
    <>
      <Desktop>
        <Desktopstyle>
          <div className="allcontroller">
            <div className="leftcontroller">
              <div className="title">
                <ol>
                  <li>코드</li>
                  <li>상품명</li>
                  <li>상태</li>
                </ol>
              </div>
              <div className="content">
                <ol>
                  {subMainData.map((el, idx) => {
                    return (
                      <li key={idx}>
                        <p>{el.CODE}</p>
                        <p>{el.NAME}</p>
                        <p>{el.STATUS === 0 ? '대여가능' : '대여불가'}</p>
                        <p
                          onClick={() => {
                            findRent();
                          }}
                        >
                          {el.STATUS === 0 ? '대여' : 'X'}
                        </p>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
            <div className="rightcontroller">
              <div className="blank"></div>
              <div className="okbg"></div>
            </div>
          </div>
        </Desktopstyle>
      </Desktop>
      <Tablet>
        tablet
        <Tabletstyle>
          <div className="allcontroller">
            <div className="leftcontroller">
              <div className="title">
                <ol>
                  <li>코드</li>
                  <li>상품명</li>
                  <li>상태</li>
                </ol>
              </div>
              <div className="content">
                <ol>
                  <li>
                    <p>001</p>
                    <p>컴퓨터</p>
                    <p>대여가능</p>
                  </li>
                  <li>
                    <p>002</p>
                    <p>컴퓨터</p>
                    <p>대여가능</p>
                  </li>
                  <li>
                    <p>003</p>
                    <p>컴퓨터</p>
                    <p>대여가능</p>
                  </li>
                </ol>
              </div>
            </div>
            <div className="rightcontroller">
              <div className="blank"></div>
              <div className="okbtn">
                <div>대여</div>
              </div>
            </div>
          </div>
        </Tabletstyle>
      </Tablet>
      <Mobile>Mobile</Mobile>
      <Default></Default>
    </>
  );
}
