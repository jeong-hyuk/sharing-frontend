import * as React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Sidebar from './Sidebar';
import ManagerSidebar from './ManagerSidebar';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const Confirm = styled.div`
  position: relative;
  top: 17vh;
  display: flex;
  justify-content: center;
  .product_confirm {
    width: 66vw;
    .product_confirm_text {
      margin-bottom: 2vh;
    }
    p {
      font-size: 2rem;
      color: #565a7a;
      font-weight: 600;
    }
    .title {
      background-color: #565a7a;
      color: #fff;
      border-radius: 5px;
      height: 5vh;
      line-height: 5vh;
      margin-bottom: 2vh;
      overflow-y: scroll;
      ol {
        text-align: center;
        display: flex;
        li {
          font-size: 1.6rem;
          width: 22vw;
          :last-child {
            border-right: none;
          }
        }
      }
    }
    .content {
      border: 1px solid #e2e2e2;
      height: 24vh;
      border-radius: 5px;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      overflow-y: scroll;
      ul {
        li {
          display: flex;
          height: 8vh;
          line-height: 8vh;
          border-bottom: 1px solid #e2e2e2;
          transition: all 0.1s;

          p {
            width: 22vw;
            text-align: center;
            font-size: 1.6rem;
            .confirm_button {
              width: 4vw;
              height: 4vh;
              background-color: #fff;
              color: #565a7a;
              border-radius: 5px;
              font-size: 1.4rem;
              transition: all 0.1s;
              /* font-weight: 600; */
              cursor: pointer;
              border: 0.1px solid rgba(86, 90, 122, 0.3);
              box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
              :hover {
                transition: all 0.1s;
                box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
              }
            }
          }
        }
        border-bottom: none;
      }
    }
  }
`;

const Return = styled.div`
  position: relative;
  top: 17vh;
  display: flex;
  justify-content: center;
  .product_return {
    width: 66vw;
    p {
      font-size: 2rem;
      color: #565a7a;
      font-weight: 600;
      margin-bottom: 2vh;
    }
    .product_return_text {
      margin-top: 3vh;
    }
    .title {
      background-color: #565a7a;
      color: #fff;
      border-radius: 5px;
      height: 5vh;
      line-height: 5vh;
      margin-bottom: 2vh;
      overflow-y: scroll;
      ol {
        text-align: center;
        display: flex;
        li {
          font-size: 1.6rem;
          width: 22vw;
          :last-child {
            border-right: none;
          }
        }
      }
    }
    .content {
      border: 1px solid #e2e2e2;
      height: 24vh;
      border-radius: 5px;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      overflow-y: scroll;
      ul {
        li {
          display: flex;
          height: 8vh;
          line-height: 8vh;
          border-bottom: 1px solid #e2e2e2;
          transition: all 0.1s;

          p {
            width: 22vw;
            text-align: center;
            font-size: 1.6rem;
            .return_button {
              width: 4vw;
              height: 4vh;
              background-color: #fff;
              color: #565a7a;
              border-radius: 5px;
              font-size: 1.4rem;
              transition: all 0.1s;
              cursor: pointer;
              border: 0.1px solid rgba(86, 90, 122, 0.3);
              box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
            }
          }
        }
        border-bottom: none;
      }
    }
  }
`;

export default function ManagerConfirm() {

  const { type } = useParams();

  const [confirmData, setConfirmData] = useState([]);
  const [secConfirmData, setSecConfirmData] = useState([]);
  const [render, setRender] = useState(false);
  // 화면이 렌더링 되었을때 백엔드와 통신하는 showConfirm 함수.
  const showConfirm = async () => {
    console.log('ㅎㅇㅎㄴ');
    try {
      const resShowConfirm = await axios.get(
        `http://localhost:4000/manager/confirm/${type}`,
      );
      setConfirmData(resShowConfirm.data.ARTICLE);
      setSecConfirmData(resShowConfirm.data.ARTICLE2);
    } catch (error) {
      console.error(error);
      console.log('showConfirm 이 잘못되었다.');
    }
  };
  // 첫 화면.
  useEffect(() => {
    showConfirm();
  }, [type, render]);

  // 승인 버튼
  const accept = async code => {
    console.log('승인버튼 클릭!');
    try {
      const resAccept = await axios.post(
        `http://localhost:4000/manager/accept/${code}`,
      );
      setRender(!render);
      console.log(resAccept.data);
    } catch (error) {
      console.error(error);
      console.log('승인 버튼 잘못되었다.');
    }
  };

  // 반납 버튼
  const acceptReturn = async code => {
    console.log('ㅎㅇ22222222222222');
    try {
      const resAccept = await axios.post(
        `http://localhost:4000/manager/acceptReturn/${code}`,
      );
      setRender(!render);
    } catch (error) {
      console.error(error);
      console.log('반납 버튼 잘못되었다.');
    }
  };

  return (
    <>
      <Header />

      <ManagerSidebar />
      <Confirm>
        <div className="product_confirm">
          <p className="product_confirm_text">승인</p>
          <div className="title">
            <ol>
              <li>코드</li>
              <li>물품명</li>
              <li>이름</li>
              <li>전화번호</li>
              <li></li>
            </ol>
          </div>
          <div className="content">
            <ul>

              {confirmData.map((el, idx) => {
                return (
                  <li key={idx}>
                    <p>{el.CODE}</p>
                    <p>{el.NAME}</p>
                    <p>{el.USER_NAME}</p>
                    <p>{el.PHONE_NUMBER}</p>
                    <p>
                      <button
                        onClick={() => accept(el.CODE)}
                        className="confirm_button"
                      >
                        승인
                      </button>
                    </p>
                  </li>
                );
              })}

            </ul>
          </div>
        </div>
      </Confirm>
      <Return>
        <div className="product_return">
          <p className="product_return_text">반납</p>
          <div className="title">
            <ol>
              <li>코드</li>
              <li>물품명</li>
              <li>이름</li>
              <li>전화번호</li>
              <li></li>
            </ol>
          </div>
          <div className="content">
            <ul>
              {secConfirmData.map((el, idx) => {
                return (
                  <li key={idx}>
                    <p>{el.CODE}</p>
                    <p>{el.NAME}</p>
                    <p>{el.USER_NAME}</p>
                    <p>{el.PHONE_NUMBER}</p>
                    <p>
                      <button
                        onClick={() => acceptReturn(el.CODE)}
                        className="return_button"
                      >
                        반납
                      </button>
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Return>
    </>
  );
}
