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
  background-color: rgba(255, 255, 255);
  width: 70vw;
  height: 89vh;
  overflow-y: scroll;

  .managermodal {
    /* display: none; */
    position: absolute;
    border-radius: 5px;
    width: 25vw;
    height: 80vh;
    left: 20vw;
    top: 5vh;
    background-color: #fff;
    border: 1px solid rgba(86, 90, 122, 0.3);
    box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 2px;
    .noticepart {
      position: absolute;
      width: 100%;
      height: 80%;

      p {
        position: absolute;
        width: 18vw;
        height: 25vh;
        top: 5vh;
        left: 3.5vw;
        border: 1px solid rgba(86, 90, 122, 0.3);
        box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 2px inset;
        input {
          position: absolute;
          top: 10vh;
          left: 3.5vw;
          font-size: 1.5rem;
        }
      }
      div {
        position: absolute;
        width: 100%;
        top: 32vh;
        left: 3.5vw;
        width: 25vw;
        ol {
          width: 80%;
          li {
            border-bottom: solid 1px rgba(86, 90, 122, 0.3);
            width: 18vw;
            line-height: 5.5vh;
            span {
              font-size: 1.5rem;
            }
            input {
              transform: translateX(1vw);
              right: 10vw;
              font-size: 1.5rem;
              width: 14vw;
              height: 5vh;
              border: none;
            }
          }
        }
      }
    }
    .btn {
      position: absolute;
      display: flex;
      justify-content: space-between;
      width: 18vw;
      bottom: 5vh;
      left: 3.5vw;
      li {
        cursor: pointer;
        width: 7vw;
        height: 5vh;
        line-height: 5vh;
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
        border: 2px solid rgba(86, 90, 122, 0.7);
        box-sizing: border-box;
        border-radius: 5px;
        position: relative;
        /* background: linear-gradient(145deg, transparent 50%, whitesmoke 70%); */
        :hover {
          box-sizing: border-box;
          border-radius: 5px;
          border: 4px solid #565a7a;
          box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
          transition: all 0.2s;
          div {
            .rent_laptop_icon,
            .rent_mouse_icon,
            .rent_plug_icon {
              transition: all 0.2s;
              color: #565a7a;
              filter: invert(34%) sepia(7%) saturate(1954%) hue-rotate(196deg)
                brightness(96%) contrast(86%);
            }
            p {
              color: #565a7a;
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
            /* color: rgba(68, 106, 114, 0.7); */
            filter: invert(34%) sepia(7%) saturate(1954%) hue-rotate(196deg)
              brightness(96%) contrast(86%) opacity(70%);
            transition: all 0.1s;
          }
          p {
            color: rgba(86, 90, 122, 0.7);
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
  const userId = useSelector(state => state.user.userID);
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
    <>
      <Rent className="scrollBar">
        <div className="managermodal">
          <div className="noticepart">
            <p>
              <input type="file" />
            </p>
            <div>
              <ol className="noticelist">
                <li>
                  <span>이름 :</span>
                  <input type="text" />
                </li>
                <li>
                  <span>CPU :</span>
                  <input type="text" />
                </li>
                <li>
                  <span>메모리 :</span>
                  <input type="text" />
                </li>
                <li>
                  <span>GPU :</span>
                  <input type="text" />
                </li>
                <li>
                  <span>화면 :</span>
                  <input type="text" />
                </li>
                <li>
                  <span>무게 :</span>
                  <input type="text" />
                </li>
              </ol>
            </div>
          </div>
          <ol className="btn">
            <li
              onClick={() => {
                alert('추가되었음 ! ');
              }}
            >
              추가
            </li>
            <li
              onClick={() => {
                document.querySelector('.managermodal').style.display = 'none';
              }}
            >
              취소
            </li>
          </ol>
        </div>
        <ul>
          {main.map((el, index) => (
            <li key={index}>
              <Link to={`/subMain/${el.OBJECT_TYPE}`}>
                <div>
                  <img
                    src="http://localhost:4000/uploads/house-solid.svg"
                    alt=""
                    className="rent_laptop_icon"
                  />
                  <p>{el.OBJECT_NAME}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Rent>

      <Rent className="scrollBar">
        <ul>
          {main.map((el, index) => (
            <li key={index}>
              <Link to={`/subMain/${el.OBJECT_TYPE}`}>
                <div>
                  <img
                    src={`http://localhost:4000/uploads/${el.IMG_SRC}`}
                    alt=""
                    className="rent_laptop_icon"
                  />
                  <p>{el.OBJECT_NAME}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Rent>
    </>
  );
}
