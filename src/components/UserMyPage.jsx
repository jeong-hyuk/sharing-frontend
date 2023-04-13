import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import userProfile from '../pages/images/mypage_user.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const MyPage = styled.div`
  position: fixed;
  top: 11vh;
  right: 0px;
  background-color: rgb(255, 255, 255);
  width: 70vw;
  height: 89vh;
  overflow-y: scroll;
  .user_ImgInfo {
    display: flex;
    align-items: flex-end;
    padding: 7vh 0 0 4vw;
    .user_profile {
      position: relative;
      margin-right: 2vw;
      img {
        width: 200px;
        height: 200px;
        margin-bottom: 3vh;
      }

      button {
        font-size: 1.2rem;
        font-weight: 400;
        background-color: transparent;
        border: 0;
        border-bottom: 1px solid gray;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
      p {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        background-color: rgb(68, 106, 114);
        border: 1px solid #fff;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        position: absolute;
        bottom: 8%;
        right: 5%;
        .profile_edit {
          width: 20px;
          height: 20px;
          color: #fff;
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }

    ul {
      li {
        width: 14vw;
        height: 45px;
        line-height: 45px;
        background-color: #fff;
        border-radius: 5px;
        border-bottom: 1.5px solid rgba(68, 106, 114, 0.5);
        p {
          font-size: 1.6rem;
          margin-left: 20px;
        }
      }
    }
  }
  .current_situation {
    padding: 3vh 0 0 4vw;
    p {
      font-size: 20px;
      color: #446a72;
      font-weight: 570;
      margin-top: 2vh;
    }
    .current_situation_header {
      display: flex;
      background-color: #446a72;
      width: 52vw;
      height: 35px;
      line-height: 6px;
      justify-content: space-around;
      margin-top: 2vh;
      border-radius: 5px;
      p {
        font-size: 16px;
        color: #fff;
        font-weight: 600;
        width: 13vw;
        text-align: center;
      }
    }
    .current_rent {
      display: flex;
      justify-content: space-around;
      background-color: #fff;
      border-radius: 5px;
      border: 1px solid #fff;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      width: 52vw;
      height: 40px;
      margin: 1vh 0 2vh 0;
      line-height: 7px;
      p {
        font-size: 15px;
        font-weight: 500;
        color: #666;
        width: 13vw;
        text-align: center;
      }
    }
  }
`;

export default function UserMyPage() {
  // 정혁이가 로그인 시켜줄떄 스토어에 저장해둔 userID 를 세션 으로 이용.
  const userId = useSelector((state) => state.user.userID);
  const [main, setMain] = useState([]);
  const [myPage, setMyPage] = useState([]);
  const [user, setUser] = useState();
  const [phoneNum, setPhoneNum] = useState();

  // 현재 날짜 계산 해보자
  const today = new Date();
  const year = today.getFullYear();
  const month = `0${today.getMonth() + 1}`.slice(-2);
  const day = `0${today.getDate()}`.slice(-2);
  const dateString = `${year}-${month}-${day}`;
  console.log(dateString);

  const showMain = async () => {
    try {
      const resShowMain = await axios.get(
        `http://localhost:4000/main/myPage/${userId}`,
      );
      console.log(resShowMain, '@@@@@@@@@@@@@@@@@@@@');
      setUser(resShowMain.data.ARTICLE[0].USER_NAME);
      setPhoneNum(resShowMain.data.ARTICLE[0].PHONE_NUMBER);
      setMain(resShowMain.data.ARTICLE);
      setMyPage(resShowMain.data.ARTICLE2);
    } catch (error) {
      console.log('여기로왔냐?');
      console.error(error);
    }
  };

  useEffect(() => {
    showMain();
  }, []);

  if (!main || !myPage) return null;

  return (
    <MyPage>
      <div className="user_ImgInfo">
        <div className="user_profile">
          {main.length >= 1 && main[0].PROFILE_IMG !== undefined ? (
            <img src={'http://localhost:4000/uploads/' + main[0].PROFILE_IMG} />
          ) : (
            <img src={userProfile} alt="마이페이지 기본 이미지" />
          )}

          <button>기본이미지</button>
          <p>
            <FontAwesomeIcon icon={faPen} className="profile_edit" />
          </p>
        </div>
        <ul>
          <li>
            <p>{user}</p>
          </li>
          <li>
            <p>{userId}</p>
          </li>
          <li>
            <p>{phoneNum}</p>
          </li>
        </ul>
      </div>
      <div className="current_situation">
        <p>대여 현황</p>
        <ul>
          <li className="current_situation_header">
            <p>코드</p>
            <p>물품명</p>
            <p>상태</p>
            <p>반납일</p>
          </li>
          <li>

            {myPage.map((el, index) => (
              <div key={index} className="current_rent">
                <p>{el.CODE}</p>
                <p>{el.NAME}</p>

                <p>{el.STATUS === 1 ? '승인대기중' : '대여중'}</p>
                <p>{`${el.END_DATE.slice(0, 10)} `}</p>
                <p>
                  {dateString >= `${el.END_DATE.slice(0, 10)}`
                    ? '연체'
                    : '연체아님'}
                </p>

              </div>
            ))}

          </li>
        </ul>
      </div>
    </MyPage>
  );
}
