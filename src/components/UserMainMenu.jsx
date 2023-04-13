import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleArrowRight,
  faCircleArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Menu = styled.div`
  position: fixed;
  top: 11vh;
  background-color: #fff;
  width: 30vw;
  height: calc(100vh - 11vh);
  ul {
    width: 50%;
    position: absolute;
    right: 2vw;
    top: 7vh;
    li {
      list-style: none;
      width: 100%;
      height: 7vh;
      line-height: 7vh;
      /* background-color: rgba(68, 106, 114, 0.01); */
      background-color: #fbfeff;
      /* border-radius: 5px; */
      margin-bottom: 25px;
      padding: 0;
      display: flex;
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
        text-decoration: none;
        text-align: center;
        font-size: 1.5rem;
        transition: all 0.1s;
        border-right: 7px solid #446a72;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 25%);
        border-radius: 5px;
        :link,
        :visited,
        :active {
          color: #333;
        }
        :hover {
          color: #fff;
          background-color: #446a72;
          border-radius: 5px;
          transition: all 0.1s;
          font-weight: 600;
        }
      }
    }
  }
  .menu_button {
    display: flex;
    width: 100%;
    height: calc(100vh - 120px);
    a {
      width: 50px;
      height: 50px;
      position: absolute;
      .menu_prev_button_icon,
      .menu_next_button_icon {
        width: 40px;
        height: 40px;
        color: #446a72;
        border-radius: 50%;
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 25%);
      }
    }
    .menu_prev_button {
      bottom: 4vh;
      left: 13vw;
    }
    .menu_next_button {
      bottom: 4vh;
      right: 2vw;
    }
  }
`;

export default function UserMainMenu() {
  // 정혁이가 로그인 시켜줄떄 스토어에 저장해둔 userID 를 세션 으로 이용.
  const userId = useSelector((state) => state.user.userID);
  const [main, setMain] = useState([]);
  const [user, setUser] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const showMain = async () => {
    try {
      const resShowMain = await axios.get(
        `http://localhost:4000/main/${userId}`,
      );
      setMain(resShowMain.data.ARTICLE); // 배열 담아줘
      setUser(resShowMain.data.NAME.USER_NAME); // 이름 담아주 ㅓ
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    showMain();
  }, []);

  return (
    <Menu>
      <ul>
        <li>
          <Link to="/" className="menu_active">
            기자재대여
          </Link>
        </li>
        <li>
          <Link to="/myPage">마이페이지</Link>
        </li>
        <li>
          <Link to="/notice">공지사항</Link>
        </li>
      </ul>
      <div className="menu_button">
        <Link to="/" className="menu_prev_button">
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            className="menu_prev_button_icon"
          />
        </Link>
        {/* <a href="" className="menu_next_button">
        <FontAwesomeIcon
          icon={faCircleArrowRight}
          className="menu_next_button_icon"
        />
      </a> */}

        <Link to="/" className="menu_next_button">
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            className="menu_next_button_icon"
          />
        </Link>
      </div>
    </Menu>
  );
}
