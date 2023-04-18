import * as React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import Sidebar from './Sidebar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { color, style } from '@mui/system';
import { useRef } from 'react';
import e from 'cors';

const Desktopstyle = styled.div`
  position: relative;
  top: 17vh;

  .productmodal {
    display: none;
    position: absolute;
    top: 55%;
    left: 50%;
    border-radius: 5px;
    width: 22vw;
    height: 52vh;
    background-color: #fff;
    border: 1px solid rgba(86, 90, 122, 0.3);
    box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 2px;
    transform: translate(-50%, -50%);
    .noticepart {
      width: 100%;

      div {
        /* transform: translate(5vw, 6vh); */

        .noticelist {
          margin-top: 2vh;
          li {
            font-size: 1.5rem;
            line-height: 4vh;

            text-align: center;
            p {
              width: 22vw;
              height: 30vh;

              img {
                width: 90%;
                height: 100%;
                /* border: 1px solid rgba(86, 90, 122, 0.3); */
              }
            }
            .object-img {
              margin-bottom: 2vh;
            }
            .object-name {
              font-size: 1.5rem;
              line-height: 5vh;
              height: 5vh;
              font-weight: 600;
            }
          }
        }
      }
    }
    .btn {
      display: flex;
      justify-content: space-evenly;
      width: 50%;
      position: absolute;
      bottom: 2.5vh;
      left: 50%;
      transform: translate(-50%, 0);

      li {
        cursor: pointer;
        width: 4vw;
        height: 4vh;
        line-height: 4vh;
        text-align: center;
        border-radius: 5px;
        border: 1px solid gray;
        color: rgb(86, 90, 122);
        font-size: 1.6rem;
        font-weight: 600;
        :first-child {
          background-color: #565a7a;
          box-shadow: 0;
          color: #fff;
        }
      }
    }
  }

  .allcontroller {
    display: flex;
    justify-content: center;
    .leftcontroller {
      width: 66vw;
      p {
        font-size: 2rem;
        color: #565a7a;
        font-weight: 600;
        margin-bottom: 2vh;
      }
      .title {
        background-color: #565a7a;
        color: #fff;
        border-radius: 5px;
        height: 6vh;
        margin-bottom: 2vh;
        ol {
          text-align: center;
          display: flex;
          justify-content: space-around;
          li {
            font-size: 1.6rem;
            width: 22vw;
            height: 6vh;
            line-height: 6vh;
            :last-child {
              border-right: none;
            }
          }
        }
      }
      .content {
        border: 1px solid #e2e2e2;
        height: 61.5vh;
        border-radius: 5px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        ol {
          li {
            display: flex;
            justify-content: space-around;
            height: 8vh;
            line-height: 8vh;
            border-bottom: 1px solid #e2e2e2;
            transition: all 0.1s;
            cursor: pointer;
            :hover {
              transition: all 0.1s;
              background-color: rgba(86, 90, 122, 0.1);
            }
            p {
              width: 22vw;
              text-align: center;
              font-size: 1.6rem;
            }
            .object-delete {
              width: 2vw;
              height: 4vh;
              margin-top: 2vh;
              margin-right: 1vw;
              background-color: #eee;
              color: #565a7a;
              border-radius: 5px;
              font-size: 1.4rem;
              transition: all 0.1s;
              cursor: pointer;
              border-style: none;
              /* border: 0.1px solid rgba(86, 90, 122, 0.3);
              box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); */
              :hover {
                background-color: #fff;
              }
            }
          }
          border-bottom: none;
        }
        .object-input {
          position: absolute;
          bottom: 8vh;
          right: 17vw;
          font-size: 1.6rem;
          line-height: 3vh;

          input {
            font-size: 1.2rem;
            height: 3vh;
            width: 10vw;
            margin-left: 3px;
            margin-right: 20px;
            border-style: none;
            border-bottom: 1px solid rgba(86, 90, 122, 0.3);
            padding-left: 5px;
            :focus {
              outline: none;
              border-radius: 6px;
              border: 1px solid rgba(86, 90, 122, 0.5);
            }
          }
        }
      }
    }
    .product-add {
      margin-top: 12px;
      float: right;
      background-color: #565a7a;
      border-style: none;
      color: #fff;
      margin-right: 20px;

      height: 4.5vh;
      font-size: 1.5rem;
      width: 4vw;
      border-radius: 5px;
      cursor: pointer;
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
    .leftcontroller {
      width: 65vw;
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
              width: 33.333%;
              text-align: center;
              font-size: 1.6rem;
              height: 5vh;
              :first-child {
                transform: translateX(0.3vw);
              }
              :nth-child(2) {
                transform: translateX(1.7vw);
              }
              :nth-child(3) {
                transform: translateX(3vw);
              }
              :last-child {
                cursor: pointer;
                margin-top: 1vh;
                transform: translateX(6vw);
                color: #fff;
                background-color: #446a72;
                border-radius: 5px;
                font-size: 1.3rem;
                width: 4vw;
                height: 5vh;
                line-height: 5vh;
              }
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
        width: 6vw;
        height: 7vh;
        background-color: #446a72;
        margin-bottom: 2vh;
        border-radius: 5px;
      }
      .okbg {
        width: 6vw;
        height: 60vh;
        border: 1px solid #446a72;
        border-radius: 5px;
      }
    }
  }
`;
const Mobilestyle = styled.div`
  ol {
    display: flex;
    justify-content: space-between;
    width: 45vw;
    transform: translate(28vw, 15vh);
    li {
      font-size: 1.3rem;
      cursor: pointer;
      text-decoration: underline;
      :hover {
        color: #e2e2e2;
      }
    }
  }
  .okbtn {
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
    background-color: #446a72;
    transform: translateX(2vw);
    font-size: 1rem;
    width: 6vw;
    height: 5vh;
    line-height: 5vh;
  }
`;

export default function ProductTable({ page, subMainData, handleRender, id }) {
  const [rent, setRent] = useState(false);

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

  const userId = useSelector(state => state.user.userID);

  const findRent = async idx => {
    try {
      // store 에서 가져온 나의 user_id
      const type = subMainData[idx].OBJECT_TYPE;
      const code = subMainData[idx].CODE;

      const findRentObj = await axios.get(
        `http://localhost:4000/subMain/find/${userId}/${code}/${type}`,
      );

      alert(findRentObj.data);
      handleRender('1');
    } catch (error) {
      console.log('여기로왔다~~~~~~~~~~~~~~~~~');
      console.error(error);
    }
  };

  //user에서 Modal
  const [selectedCode, setSelectedCode] = useState('');
  const showModal = code => {
    const modal = document.querySelector('.productmodal');
    modal.style.display =
      modal.style.display === 'none' || modal.style.display === ''
        ? 'block'
        : 'none';
    setSelectedCode(code);
  };

  const inputObjectCode = useRef();
  const inputObjectName = useRef();

  const inputObjectStatus = useRef();
  const [render, setRender] = useState(false);

  // 물품 추가 axios
  const appendObject = async () => {
    const type = subMainData[0].OBJECT_TYPE;
    try {
      const resAddObject = await axios.post(
        `http://localhost:4000/subMain/manager/producttable/append/${type}`,
        {
          inputObjectCode: inputObjectCode.current.value,
          inputObjectName: inputObjectName.current.value,
          inputObjectStatus: inputObjectStatus.current.value,
        },
      );
      console.log('resAddObject', resAddObject);
      //setRender(cur => !cur);
      handleRender();
    } catch (error) {
      console.log(error);
      console.log('object추가 잘못됨');
    }
  };

  // 물품 삭제 axios

  const [deleteNew, setDeleteNew] = useState([]);

  const deleteObject = async code => {
    try {
      console.log(code);
      const resDeleteObject = await axios.post(
        `http://localhost:4000/subMain/manager/producttable/delete/${code}`,
      );
      // console.log(resDeleteObject);
      // setDeleteNew(resDeleteObject.data.CODE);
      // console.log(deleteNew.data);
      // setRender(cur => !cur);
      handleRender();
    } catch (error) {
      console.log(error);
      console.log('object 삭제안돼');
    }
  };

  const arr = [
    {
      code: '001',
      product_name: '노트북',
      status: '대여가능',
      btn: '대여',
    },
    {
      code: '002',
      product_name: '노트북',
      status: '대여가능',
      btn: '대여',
    },
    {
      code: '003',
      product_name: '노트북',
      status: '대여가능',
      btn: '대여',
    },
  ];

  // const red = document.querySelector('ol > li > .red');
  // red.parentNode.style.backgroundColor = 'rgba(86, 90, 122, 0.1)';
  // const parentRed = red.parentNode;
  // // parentRed.style.backgroundColor = 'rgba(86, 90, 122, 0.1)';
  // const red = useRef();
  // if (red.current !== undefined) {
  //   // console.log(red.current.parentNode);
  //   red.current.parentNode.style.backgroundColor = 'rgba(86, 90, 122, 0.1)';
  // }

  useEffect(() => {}, [render]);

  return (
    <>
      <Desktop>
        <Sidebar />
        <Desktopstyle>
          {/* 모달창 - user일때만 */}

          <div className="productmodal">
            <div className="noticepart">
              <div>
                <ol className="noticelist">
                  {subMainData.map((e, i) => {
                    if (e.CODE === selectedCode) {
                      return (
                        <li className="object-list" key={i}>
                          <p className="object-img">
                            <img
                              src={
                                e.OBJECT_IMG !== null
                                  ? 'http://localhost:4000/uploads/' +
                                    e.OBJECT_IMG
                                  : ''
                              }
                            />
                          </p>
                          물품명<p className="object-name">{e.NAME}</p>
                          <ol className="btn">
                            <li onClick={() => findRent(i)}>대여</li>
                            <li
                              onClick={() => {
                                document.querySelector(
                                  '.productmodal',
                                ).style.display = 'none';
                              }}
                            >
                              취소
                            </li>
                          </ol>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
                </ol>
              </div>
            </div>
          </div>
          {/* 물품 목록 */}
          <div className="allcontroller">
            <div className="leftcontroller">
              <p>{name} 대여</p>
              <div className="title">
                <ol>
                  <li>코드</li>
                  <li>물품명</li>
                  <li>상태</li>
                </ol>
              </div>
              <div className="content">
                <ol>
                  {subMainData.map((el, idx) => {
                    return (
                      <li
                        key={idx}
                        onClick={() => showModal(el.CODE)}
                        style={
                          el.STATUS === 0
                            ? {}
                            : { backgroundColor: 'rgba(86, 90, 122, 0.05)' }
                        }
                      >
                        <p>{el.CODE}</p>
                        <p>{el.NAME}</p>
                        {el.STATUS === 0 ? (
                          <p>대여가능</p>
                        ) : (
                          <p className="red" style={{ color: 'red' }}>
                            대여불가
                          </p>
                        )}

                        {userId == 'manager' ? (
                          <button
                            className="object-delete"
                            onClick={() => deleteObject(el.CODE)}
                          >
                            X
                          </button>
                        ) : (
                          ''
                        )}
                      </li>
                    );
                  })}
                </ol>
                {userId == 'manager' ? (
                  <div className="object-input">
                    코드 <input ref={inputObjectCode} type="text" />
                    물품명 <input ref={inputObjectName} type="text" />
                    상태 <input ref={inputObjectStatus} type="text" />
                  </div>
                ) : (
                  ''
                )}
              </div>
              {userId == 'manager' ? (
                <button className="product-add" onClick={appendObject}>
                  추가
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        </Desktopstyle>
      </Desktop>
      <Tablet>
        <Sidebar />
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
                    <p>대여</p>
                  </li>
                  <li>
                    <p>002</p>
                    <p>컴퓨터</p>
                    <p>대여가능</p>
                    <p>대여</p>
                  </li>
                  <li>
                    <p>003</p>
                    <p>컴퓨터</p>
                    <p>대여가능</p>
                    <p>대여</p>
                  </li>
                </ol>
              </div>
            </div>
            <div className="rightcontroller">
              <div className="blank"></div>
              <div className="okbg"></div>
            </div>
          </div>
        </Tabletstyle>
      </Tablet>
      <Mobile>
        Mobile
        <Mobilestyle>
          <ol>
            <li>노트북</li>
            <li>마우스</li>
            <li>멀티탭</li>
          </ol>
          {/* sx를 사용하여 table의 style지정 */}
          <TableContainer
            component={Paper}
            sx={{
              width: '70vw',
              height: '65vh',
              position: 'relative',
              left: '15vw',
              top: '20vh',
            }}
          >
            <Table>
              <TableHead
                sx={{
                  '& th': {
                    color: 'white',
                    backgroundColor: '#446A72',
                  },
                }}
              >
                {/* table에 제목 부분 */}
                <TableRow>
                  <TableCell align="center">코드</TableCell>
                  <TableCell align="center">기자재명</TableCell>
                  <TableCell align="center">상태</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              {/* table에 들어갈 데이터 */}
              <TableBody>
                {arr.map(arr => (
                  <TableRow key={arr.code}>
                    <TableCell align="center">{arr.code}</TableCell>
                    <TableCell align="center">{arr.product_name}</TableCell>
                    <TableCell align="center">{arr.status}</TableCell>
                    <TableCell align="center">
                      <div className="okbtn">{arr.btn}</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Mobilestyle>
      </Mobile>
      <Default></Default>
    </>
  );
}
