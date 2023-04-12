import React, { useEffect, useState } from 'react';
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
  height: 89vh;
  overflow-y: scroll;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 5vh 0 0 4vw;
    li {
      list-style: none;
      width: 25vw;
      height: 37vh;
      background-color: rgb(255, 255, 255);
      margin: 0 3vw 3vw 0;
      :last-child {
        background-color: rgba(68, 106, 114, 0.2);
        border: none;
        border-radius: 5px;
      }
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
        transition: all 0.1s;
        border: 2px solid rgba(68, 106, 114, 0.7);
        box-sizing: border-box;
        border-radius: 5px;
        position: relative;
        /* background: linear-gradient(145deg, transparent 50%, whitesmoke 70%); */
        :hover {
          box-sizing: border-box;
          border-radius: 5px;
          border: 7px solid #446a72;
          box-shadow: 7px 7px 7px rgba(0, 0, 0, 25%);
          transition: all 0.1s;
          div {
            .rent_laptop_icon,
            .rent_mouse_icon,
            .rent_plug_icon {
              transition: all 0.1s;
              color: #446a72;
            }
            P {
              color: #446a72;
              transition: all 0.1s;
            }
          }
        }
        div {
          width: 100%;
          height: 100%;
          background-image: url('/images/laptop_img.jpg');
          .rent_laptop_icon,
          .rent_mouse_icon,
          .rent_plug_icon {
            width: 100px;
            height: 50px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: rgba(68, 106, 114, 0.7);
            transition: all 0.1s;
          }
          P {
            color: rgba(68, 106, 114, 0.7);
            font-weight: 700;
            font-size: 1.5rem;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 27%;
            transition: all 0.1s;
          }
        }

        :nth-child(3),
        :nth-child(4) {
          padding-top: 40px;
        }
      }
    }
  }
`;

export default function UserRent() {
  // 정혁이가 로그인 시켜줄떄 스토어에 저장해둔 userID 를 세션 으로 이용.
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
    <Rent className="scrollBar">
      <ul>
        {main.map((el, index) => (
          <li key={index}>
            <Link to={`/UserRent/${el.OBJECT_TYPE}`}>
              <div>
                <FontAwesomeIcon icon={faLaptop} className="rent_laptop_icon" />
                <p>{el.OBJECT_NAME}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Rent>
  );
}
