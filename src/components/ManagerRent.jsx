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
  /* background-color: rgb(255, 255, 255); */
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
      position: relative;

      :last-child {
        /* 추가버튼이 들어갈 li */
        background-color: rgba(85, 96, 128, 0.3);
        border: none;
        border-radius: 5px;
        a {
          border: none;
          :hover {
            border: none;
            box-shadow: 4px 4px 4px rgba(0, 0, 0, 0);
            background-color: rgba(255, 255, 255, 0);
          }
          .rent_product_info {
            display: none;
            cursor: alias;
          }
        }
        .product_add_button {
          display: inline;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          transition: all 0.2s;
          p {
            font-size: 4.5rem;
            height: 50px;
            line-height: 50px;
            border-radius: 50%;
            width: 50px;
            background-color: #fff;
            box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
            color: rgb(85, 96, 128);
            text-align: center;
            font-weight: 300;
          }
          .add {
            cursor: pointer;
          }
        }
        :hover {
          .product_add_button {
            p {
              transition: all 0.2s;
              :hover {
                box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
              }
            }
          }
          .product_edit_button {
            display: none;
          }
        }
      }
      :hover {
        .product_edit_button {
          display: flex;
          transition: all 0.2s;
        }
      }
      .product_edit_button {
        /* display: flex; */
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, 110%);
        z-index: 1;
        transition: all 0.2s;
        p {
          font-size: 1.7rem;
          height: 4vh;
          line-height: 4vh;
          color: #565a7a;
        }
        .modify,
        .delete {
          display: block;
          cursor: pointer;
          width: 4vw;
          text-align: center;
          background-color: #fff;
          border-radius: 5px;
          border: 0.1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.1s;
          :hover {
            box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            transition: all 0.1s;
          }
        }
        .modify {
          margin-right: 0.5vw;
        }
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
          background-color: rgba(255, 255, 255, 0.2);
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

export default function ManagerRent() {
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
    <Rent className="scrollBar">
      <ul>
        {main.map((el, index) => (
          <li key={index} className="rent_product">
            <div className="product_edit_button">
              {/* <p className="modify">수정</p> */}
              <p className="delete">삭제</p>
            </div>

            <Link to={`/subMain/${el.OBJECT_TYPE}`}>
              <div className="rent_product_info">
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
        <li>
          <div className="product_add_button">
            <p className="add">+</p>
          </div>
          <div className="add_product_last"></div>
        </li>
      </ul>
    </Rent>
  );
}
