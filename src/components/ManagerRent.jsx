import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { async } from 'q';
import { func } from 'prop-types';

const Rent = styled.div`
  position: fixed;
  top: 11vh;
  right: 0px;
  /* background-color: rgb(255, 255, 255); */
  width: 70vw;
  height: 87vh;
  overflow-y: scroll;
  .managermodal {
    display: none;
    position: absolute;
    z-index: 5;
    border-radius: 5px;
    width: 18vw;
    height: 45vh;
    left: 22vw;
    top: 10vh;
    background-color: #fff;
    border: 1px solid rgba(86, 90, 122, 0.3);
    box-shadow: rgba(0, 0, 0, 0.1) 2px 2px 4px;
    .noticepart {
      position: absolute;
      width: 15vw;
      left: 50%;
      transform: translateX(-60%);

      p {
        position: absolute;
        width: 13vw;
        height: 20vh;
        top: 4vh;
        left: 2.5vw;
        border: 1px solid rgba(86, 90, 122, 0.3);
        box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 2px inset;
        input {
          position: absolute;
          font-size: 1.2rem;
          top: 50%;
          left: 50%;
          transform: translate(-33%, -50%);
        }
      }
      div {
        position: absolute;
        top: 27vh;
        left: 50%;
        transform: translateX(-39%);
        ol {
          width: 100%;
          li {
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              font-size: 1.3rem;
              width: 2.5vw;
            }
            input {
              font-size: 1.5rem;
              line-height: 4vh;
              height: 4vh;
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
      width: 13vw;
      bottom: 4vh;
      left: 2.5vw;
      li {
        cursor: pointer;
        width: 5.5vw;
        height: 4vh;
        line-height: 4vh;
        text-align: center;
        border-radius: 5px;
        border: 1px solid gray;
        color: rgb(86, 90, 122);
        font-size: 1.3rem;
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
            /* line-height: 50px; */
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
  const [render, setRender] = useState(false);
  const productname = useRef();
  const productcode = useRef();
  const productmodal = useRef();
  const imgRef = useRef();
  const modalRef = useRef();

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

  async function handleAddimg(e) {
    const formData = new FormData();
    formData.append('image', imgRef.current.files[0]);
    formData.append(
      'data',
      JSON.stringify({
        productname: productname.current.value,
        productcode: productcode.current.value,
      }),
    );

    try {
      const resAddImg = await axios.post(
        'http://localhost:4000/manager',
        formData,
      );
      modalRef.current.style.display = 'none';
      setRender(!render);
    } catch (error) {
      console.error(error);
      console.log('이미지업로드 잘못되었다.');
    }
  }
  const handleDelete = async type => {
    try {
      const resDelete = await axios.post(
        `http://localhost:4000/manager/delete/${type}`,
      );
      console.log('%%%%%%');
      // handleRender();
      setRender(!render);
    } catch (error) {
      console.error(error);
      console.log('잘못됨');
    }
  };

  useEffect(() => {
    showMain();
  }, [render]);

  return (
    <Rent className="scrollBar">
      <div className="managermodal" ref={modalRef}>
        <div className="noticepart">
          <p>
            <input type="file" name="img" ref={imgRef} />
          </p>
          <div>
            <ol className="noticelist">
              <li>
                <span>코드 :</span>
                <input type="text" ref={productcode} />
              </li>
              <li>
                <span>이름 :</span>
                <input type="text" ref={productname} />
              </li>
            </ol>
          </div>
        </div>
        <ol className="btn">
          <li onClick={handleAddimg}>추가</li>
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
          <li key={index} className="rent_product">
            <div className="product_edit_button">
              {/* <p className="modify">수정</p> */}
              <p
                className="delete"
                onClick={() => handleDelete(el.OBJECT_TYPE)}
              >
                삭제
              </p>
            </div>

            <Link to={`/subMain/${el.OBJECT_TYPE}`}>
              <div className="rent_product_info">
                <img
                  src={'http://localhost:4000/uploads/' + el.IMG_SRC}
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
            <p
              className="add"
              onClick={() => {
                const controller = document.querySelector('.managermodal');
                controller.style.display =
                  controller.style.display === 'none' ||
                  controller.style.display === ''
                    ? 'block'
                    : 'none';
              }}
            >
              +
            </p>
          </div>
          <div className="add_product_last"></div>
        </li>
      </ul>
    </Rent>
  );
}
