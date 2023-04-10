import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import { faComputerMouse } from '@fortawesome/free-solid-svg-icons';
import { faPlug } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Header from '../components/Header';

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
    top: 5vh;
    li {
      list-style: none;
      width: 100%;
      height: 7vh;
      line-height: 7vh;
      background-color: rgba(68, 106, 114, 0.2);
      border-radius: 5px;
      margin-bottom: 20px;
      padding: 0;
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
        text-decoration: none;
        text-align: center;
        font-size: 1.5rem;
        transition: all 0.1s;
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

const Rent = styled.div`
  position: fixed;
  top: 11vh;
  right: 0px;
  background-color: rgb(255, 255, 255);
  width: 70vw;
  height: 89vh;
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
        border: 2px solid #446a72;
        box-sizing: border-box;
        border-radius: 5px;
        position: relative;
        :hover {
          box-sizing: border-box;
          border-radius: 5px;
          border: 7px solid #446a72;
          box-shadow: 7px 7px 7px rgba(0, 0, 0, 25%);
          transition: all 0.1s;
          div {
            background-color: #446a72;
            .rent_laptop_icon,
            .rent_mouse_icon,
            .rent_plug_icon {
              transition: all 0.1s;
              color: #fff;
            }
            P {
              color: #fff;
              transition: all 0.1s;
            }
          }
        }
        div {
          width: 100%;
          height: 100%;
          .rent_laptop_icon,
          .rent_mouse_icon,
          .rent_plug_icon {
            width: 100px;
            height: 50px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: rgba(68, 106, 114, 1);
            transition: all 0.1s;
          }
          P {
            color: #446a72;
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

export default function UserMain() {
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    return isTablet ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };
  const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 });
    return isNotMobile ? children : null;
  };
  return (
    <>
      <Desktop>
        <Header />
        <Menu>
          <ul>
            <li>
              <a href="">기자재대여</a>
            </li>
            <li>
              <a href="">마이페이지</a>
            </li>
            <li>
              <a href="">공지사항</a>
            </li>
          </ul>
          <div className="menu_button">
            <a href="" className="menu_prev_button">
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="menu_prev_button_icon"
              />
            </a>
            <a href="" className="menu_next_button">
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="menu_next_button_icon"
              />
            </a>
          </div>
        </Menu>
        <Rent>
          <ul>
            <li>
              <a href="./UserRent">
                <div>
                  <FontAwesomeIcon
                    icon={faLaptop}
                    className="rent_laptop_icon"
                  />
                  <p>LAPTOP</p>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div>
                  <FontAwesomeIcon
                    icon={faComputerMouse}
                    className="rent_mouse_icon"
                  />
                  <p>MOUSE</p>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div>
                  <FontAwesomeIcon icon={faPlug} className="rent_plug_icon" />
                  <p>CHARGER</p>
                </div>
              </a>
            </li>
            <li></li>
          </ul>
        </Rent>
      </Desktop>
      <Tablet>Tablet</Tablet>
      <Mobile>Mobile</Mobile>
      <Default></Default>
    </>
  );
}
