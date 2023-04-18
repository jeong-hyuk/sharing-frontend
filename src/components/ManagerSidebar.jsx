import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  faLaptop,
  faComputerMouse,
  faPlug,
  faHouse,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const SidebarDiv = styled.div`
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  transition: 0.4s ease;
  z-index: 2;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.3);
`;

const SidebarBtn = styled.button`
  position: relative;
  left: 300px;
  top: 50vh;
  width: 3vw;
  height: 10vh;
  z-index: 2;
  transition: 0.8s ease;
  border-radius: 0 5px 5px 0;
  border: 0px solid;
  background-color: transparent;
  overflow: hidden;
  cursor: pointer;
`;

const Sidelist = styled.div`
  position: relative;
  height: 100%;

  ul {
    height: 100%;

    .homeBtn {
      position: absolute;
      right: 3vw;
      bottom: 14vh;
      width: 120px;
      height: 50px;
      border-radius: 50px;
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
      transition: all 0.1s;
      :hover {
        background-color: #565a7a;
        box-shadow: 0;
        transition: all 0.1s;
        div {
          p,
          .sideBar_icon_home {
            color: #fff;
            transition: all 0.1s;
          }
        }
      }
    }

    div {
      display: flex;
      align-items: flex-end;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      p {
        font-size: 1.6rem;
        margin-right: 0.5vw;
      }
      .sideBar_icon_home {
        width: 25px;
        height: 25px;
        color: rgb(86, 90, 122);
      }
    }
  }
  .select {
    display: flex;
    width: 70%;
    height: 8vh;
    line-height: 8vh;
    cursor: pointer;
    position: relative;
    top: 6vh;
    margin: 0 0 0.5vh 0;
    transition: all 0.1s;
    /* border-radius: 0 50px 50px 0; */
    border-bottom: 1px solid rgb(86, 90, 122, 0.3);
    transition: all 0.1s;
    justify-content: flex-end;
    align-items: center;
    border-radius: 0 0 20px 0;
    .sideBar_icon_laptop,
    .sideBar_icon_mouse,
    .sideBar_icon_plug {
      width: 15px;
      height: 15px;
      color: #565a7a;
    }
    :hover {
      background-color: #565a7a;
      border-radius: 0 50px 50px 0;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      transition: all 0.1s;
      p {
        color: #fff;
        transition: all 0.1s;
      }
      .sideBar_icon_laptop,
      .sideBar_icon_mouse,
      .sideBar_icon_plug {
        color: #fff;
        transition: all 0.1s;
      }
    }
    p {
      color: #565a7a;
      font-size: 1.6rem;
      font-weight: 600;
      text-align: right;
      margin: 0 2vw 0 0.5vw;
      transition: all 0.1s;
    }
  }
`;
const Sidebar = ({ width = 300 }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(width);
  const { id } = useParams();

  // sidebar 디비에서 가져온 배열 저장.
  const [name, setName] = useState([]);

  const side = useRef();

  // toggleMenu 열릴때 axios 실행.
  const showSideBar = async () => {
    try {
      console.log('잘옴');
      const resShowSideBar = await axios.get(
        'http://localhost:4000/subMain/sideBar/show',
      );
      setName(resShowSideBar.data.ARTICLE);
      console.log(name);
    } catch (error) {
      console.error(error);
      console.log('단단히 잘못되었다.');
    }
  };

  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition > 0) {
      setX(0);
      setOpen(true);
      showSideBar();
    } else {
      setX(width);
      setOpen(false);
    }
  };

  return (
    <SidebarDiv
      ref={side}
      style={{
        width: `${width}px`,
        height: '100%',
        transform: `translatex(${-xPosition}px)`,
      }}
    >
      <SidebarBtn onClick={() => toggleMenu()}>
        {isOpen ? (
          <span className="material-symbols-outlined">arrow_back_ios</span>
        ) : (
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        )}
      </SidebarBtn>

      <Sidelist>
        <ul>
          {name.map((el, idx) => {
            return (
              <Link
                to={`/confirm/${el.OBJECT_TYPE}`}
                className="select"
                key={idx}
              >
                <img
                  src={`http://localhost:4000/uploads/${el.IMG_SRC}`}
                  className="sideBar_icon_laptop"
                />
                <p>{el.OBJECT_NAME}</p>
              </Link>
            );
          })}
          <Link to="/" className="homeBtn">
            <div>
              <p>HOME</p>
              <FontAwesomeIcon icon={faHouse} className="sideBar_icon_home" />
            </div>
          </Link>
        </ul>
      </Sidelist>
    </SidebarDiv>
  );
};

export default Sidebar;
