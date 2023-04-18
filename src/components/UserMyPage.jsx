import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import userProfile from '../pages/images/mypage_user.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { reduxRender } from '../store/modules/user';

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
        border-radius: 50%;
        border: 3px solid rgba(86, 90, 122, 0.5);
        box-sizing: border-box;
      }
      .profile_edit_button {
        border-bottom: 1px solid transparent;
        cursor: pointer;
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
        cursor: pointer;
      }
      p {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        background-color: #565a7a;
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
          transform: translate(-50%, -40%);
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
        border-bottom: 1.5px solid rgba(86, 90, 122, 0.5);
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
      color: #565a7a;
      font-weight: 570;
      margin-top: 2vh;
    }
    .current_situation_header {
      display: flex;
      background-color: rgba(86, 90, 122, 0.7);
      width: 55vw;
      height: 35px;
      line-height: 6px;
      justify-content: space-around;
      margin-top: 2vh;
      border-radius: 5px;
      p {
        font-size: 16px;
        color: #fff;
        font-weight: 600;
        width: 11vw;
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
      width: 55vw;
      height: 40px;
      margin: 1vh 0 2vh 0;
      line-height: 7px;
      p {
        font-size: 15px;
        font-weight: 500;
        color: #565a7a;
        width: 11vw;
        text-align: center;
      }
    }
  }
`;

export default function UserMyPage() {
  // 정혁이가 로그인 시켜줄떄 스토어에 저장해둔 userID 를 세션 으로 이용.
  const userId = useSelector(state => state.user.userID);
  const [main, setMain] = useState([]);
  const [myPage, setMyPage] = useState([]);
  const [user, setUser] = useState();
  const [phoneNum, setPhoneNum] = useState();
  const [render, setRender] = useState(false);

  const dispatch = useDispatch();

  // 현재 날짜 계산 해보자
  const today = new Date();
  const year = today.getFullYear();
  const month = `0${today.getMonth() + 1}`.slice(-2);
  const day = `0${today.getDate()}`.slice(-2);
  const dateString = `${year}-${month}-${day}`;

  // 첨부파일 추가
  const imageInput = useRef();
  const clickImageInput = () => {
    imageInput.current.click();
  };

  const showMain = async () => {
    try {
      const resShowMain = await axios.get(
        `http://localhost:4000/main/myPage/${userId}`,
      );

      setUser(resShowMain.data.ARTICLE[0].USER_NAME);
      setPhoneNum(resShowMain.data.ARTICLE[0].PHONE_NUMBER);
      setMain(resShowMain.data.ARTICLE);
      setMyPage(resShowMain.data.ARTICLE2);
    } catch (error) {
      console.log('error');
      console.error(error);
    }
  };

  if (!main || !myPage) return null;

  async function handleImage(e) {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const resHandleImage = await axios.post(
        `http://localhost:4000/main/myPage/${userId}`,
        formData,
      );
      setRender(cur => !cur);
      dispatch(reduxRender());
    } catch (error) {
      console.error(error);
      console.log('errorrrrr');
    }
  }
  const changeImage = async () => {
    try {
      const resChangeImage = await axios.post(
        `http://localhost:4000/main/mypage/common/${userId}`,
      );
      console.log('통신오류');

      setRender(cur => !cur);
      dispatch(reduxRender());
    } catch (error) {
      console.error(error);
      console.log('기본 이미지 오류');
    }
    // setMain((main) => [{ ...main[0], PROFILE_IMG: '' }]);
  };

  useEffect(() => {
    showMain();
  }, [render]);

  return (
    <MyPage>
      <div className="user_ImgInfo">
        <div className="user_profile">
          {main.length >= 1 && main[0].PROFILE_IMG !== '' ? (
            <img src={'http://localhost:4000/profile/' + main[0].PROFILE_IMG} />
          ) : (
            <img src={userProfile} alt="마이페이지 기본 이미지" />
          )}

          <button onClick={changeImage}>기본이미지</button>
          <p>
            <button className="profile_edit_button" onClick={clickImageInput}>
              <FontAwesomeIcon icon={faPen} className="profile_edit" />
            </button>
            <input
              type="file"
              name="file"
              onChange={handleImage}
              style={{ display: 'none' }}
              ref={imageInput}
            />
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
            <p>승인여부</p>
            <p>반납일</p>
            <p>상태</p>
          </li>
          <li>
            {myPage.map((el, index) => (
              <div key={index} className="current_rent">
                <p>{el.CODE}</p>
                <p>{el.NAME}</p>

                <p>{el.STATUS === 1 ? '승인대기중' : '대여중'}</p>
                <p>{`${el.END_DATE.slice(0, 10)} `}</p>
                <p style={{ color: 'orangered', fontWeight: '600' }}>
                  {dateString >= `${el.END_DATE.slice(0, 10)}` ? '연체' : ''}
                </p>
              </div>
            ))}
          </li>
        </ul>
      </div>
    </MyPage>
  );
}
