import React, { useEffect, useState } from 'react';
import userProfile from '../pages/images/mypage_user.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

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
      p {
        :first-child {
          font-size: 1.2rem;
          font-weight: 400;
          background-color: transparent;
          border-bottom: 1px solid gray;
          position: absolute;
          bottom: 0px;
          left: 50%;
          transform: translateX(-50%);
        }
        :last-child {
          width: 40px;
          height: 40px;
          background-color: rgb(68, 106, 114);
          .profile_edit {
            width: 20px;
            height: 20px;
            color: rgb(255, 255, 255);
          }
        }
        ul {
          li {
            width: 14vw;
            height: 45px;
            line-height: 45px;
            background-color: rgb(255, 255, 255);
            border-radius: 5px;
            border-bottom: 1.5px solid rgba(68, 106, 114, 0.5);
            p {
              font-size: 1.6rem;
              margin-left: 20px;
            }
          }
        }
      }
    }
  }
  .current_situation {
    padding: 3vh 0px 0px 4vw;
    p {
      font-size: 20px;
      color: rgb(68, 106, 114);
      font-weight: 570;
      margin-top: 2vh;
    }
    ul {
      li {
        display: flex;
        background-color: rgb(68, 106, 114);
        width: 53vw;
        height: 35px;
        line-height: 6px;
        justify-content: space-around;
        margin-top: 2vh;
        border-radius: 5px;
        p {
          font-size: 16px;
          color: rgb(255, 255, 255);
          font-weight: 600;
        }
      }
    }
  }
`;

export default function UserMyPage() {
  const userId = useSelector((state) => state.user.userID);
  const [main, setMain] = useState([]);
  const [user, setUser] = useState();

  const showMain = async () => {
    try {
      const resShowMain = await axios.get(
        `http://localhost:4000/main/${userId}`,
      );
      setMain(resShowMain.data.ARTICLE); // 배열 담아줘
      setUser(resShowMain.data.NAME.USER_NAME); // 이름 담아주 ㅓ
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    showMain();
  }, []);
  return (
    <MyPage>
      <div className="user_ImgInfo">
        <div className="user_profile">
          <img src={userProfile} alt="마이페이지 기본 이미지" />
          <p>기본이미지</p>
          <p>
            <FontAwesomeIcon icon={faPen} className="profile_edit" />
          </p>
        </div>
        <ul>
          <li>
            <p>{user}</p>
          </li>
          <li>
            <p>{/*userId*/}songmy99@daum.net</p>
          </li>
          <li>
            <p>{/*전화번호*/}010-1234-5678</p>
          </li>
        </ul>
      </div>
      <div className="current_situation">
        <p>대여 현황</p>
        <ul>
          <li className="current_situation_header">
            <p>No</p>
            <p>물품명</p>
            <p>상태</p>
            <p>반납일</p>
          </li>
          <li>
            <div></div>
          </li>
        </ul>
      </div>
    </MyPage>
  );
}
