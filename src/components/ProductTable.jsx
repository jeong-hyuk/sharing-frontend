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
            :last-child {
              border-right: none;
            }
          }
        }
      }
      .content {
        border: 1px solid #e2e2e2;
        height: 60vh;
        border-radius: 5px;
        box-shadow: 0 2px 0 0 gray;
        ol {
          li {
            display: flex;
            justify-content: space-around;
            height: 8vh;
            line-height: 8vh;
            border-bottom: 1px solid #e2e2e2;
            p {
              width: 33.333%;
              text-align: center;
              font-size: 1.6rem;
              height: 5vh;
              :first-child {
                transform: translateX(0.3vw);
              }
              :nth-child(2) {
                transform: translateX(1.3vw);
              }
              :nth-child(3) {
                transform: translateX(2.5vw);
              }
              :last-child {
                cursor: pointer;
                margin-top: 2vh;
                margin-bottom: 2vh;
                transform: translate(6vw, -1vh);
                color: #fff;
                background-color: #446a72;
                border-radius: 5px;
                font-size: 1.3rem;
                width: 5.5vw;
                height: 7vh;
                line-height: 7vh;
              }
            }
          }
          border-bottom: none;
        }
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

  const findRent = async (idx) => {
    try {
      // store 에서 가져온 나의 user_id
      const type = subMainData[idx].OBJECT_TYPE;
      const code = subMainData[idx].CODE;
      console.log(code);
      const findRentObj = await axios.get(
        `http://localhost:4000/subMain/find/${userId}/${code}/${type}`,
      );
      alert(findRentObj.data);
    } catch (error) {
      console.log('여기로왔다~~~~~~~~~~~~~~~~~');
      console.error(error);
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

  return (
    <>
      <Desktop>
        <Sidebar />
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
                            findRent(idx);
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
                {arr.map((arr) => (
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
