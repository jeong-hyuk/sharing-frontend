import React, { useEffect, useState } from 'react';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Chatbotcontent from '../chatbot/Chatbotcontent';

const Menu = styled.div`
  position: absolute;
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
        font-weight: 600;
        transition: all 0.1s;
        border-right: 3px solid #565a7a;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 25%);
        border-radius: 5px;
        :link,
        :visited,
        :active {
          color: #333;
        }
        :hover {
          color: #fff;
          background-color: #565a7a;
          border-radius: 5px;
          transition: all 0.1s;
          font-weight: 600;
        }
        .menu_active {
          background-color: #565a7a;
          color: #fff;
          border-radius: 5px;
          font-weight: 600;
        }
      }
    }
  }
  .menu_button {
    display: flex;
    width: 100%;
    height: calc(100vh - 11vh);
    .chat_bot {
      width: 45px;
      height: 45px;
      position: absolute;
      bottom: 4vh;
      left: 13vw;
      background-color: #c6e36b;
      border-radius: 50%;
      box-shadow: 4px 4px 4px rgba(0, 0, 0, 25%);
      .chat_bot_icon {
        width: 25px;
        height: 25px;
        color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`;

export default function ManagerMainMenu() {
  const userId = useSelector(state => state.user.userID);
  const [main, setMain] = useState([]);
  const [user, setUser] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [activeMenu, setActiveMenu] = useState(0);

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
    <Menu>
      <ul>
        <li>
          <Link
            to="/"
            className={activeMenu === 0 ? 'menu_active' : ''}
            onClick={() => setActiveMenu(0)}
          >
            RENT
          </Link>
        </li>
        <li>
          <Link to="/confirm">CONFIRM</Link>
        </li>
        <li>
          <Link to="/notice">NOTICE</Link>
        </li>
        <li>
          <Link to="/log">LOG</Link>
        </li>
      </ul>
      <div>
        <Chatbotcontent />
        <Link to="/" className="chat_bot">
          <FontAwesomeIcon icon={faCommentDots} className="chat_bot_icon" />
        </Link>
      </div>
    </Menu>
  );
}
