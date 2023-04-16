import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Notice = styled.div`
  position: fixed;
  top: 11vh;
  right: 0px;
  background-color: rgb(255, 255, 255);
  width: 70vw;
  height: 89vh;
  overflow-y: scroll;
  .Notice_all {
    padding: 0 0 4vh 4vw;
    p {
      font-size: 2.5rem;
      color: #556080;
      font-weight: 700;
      padding: 7vh 0px 3vh 1vw;
    }
    .notice_header {
      position: absolute;
      top: 7.5vh;
      right: 13vw;

      button {
        background-color: #565a7a;
        border-style: none;
        color: #fff;
        margin-right: 10px;
        height: 3.5vh;
        font-size: 1.5rem;
        width: 3vw;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }

  .notice_qna {
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #fff;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    width: 52vw;
    border-top: 2px solid #565a7ab3;
    .notice_q {
      position: relative;
      border: 1px solid rgba(225, 228, 230, 0.5);
      padding: 3vh 3vw 3vh 2vw;
      transition: padding-top 0.5s, padding-bottom 0.5s, height 0.5s, 0.5s;
      color: #333;
      cursor: pointer;
      font-size: 1.7rem;
      font-weight: 600;

      .checkbox-container {
        display: inline-block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 14px;
        cursor: pointer;
        font-size: 22px;
        user-select: none;

        input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .checkmark {
          position: absolute;
          top: 0;
          left: 0;
          height: 19px;
          width: 19px;
          background-color: #ddd;
          border-radius: 5px;

          &:after {
            content: '';
            position: absolute;
            display: none;
          }
        }

        input:checked ~ .checkmark {
          background-color: #81a8e3;

          &:after {
            display: block;
          }
        }

        .checkmark:after {
          left: 5px;
          top: 1.5px;
          width: 5px;
          height: 10px;
          border: solid #fff;
          border-width: 0 3px 3px 0;
          transform: rotate(45deg);
        }
      }

      .notice_icon,
      .notice_plus {
        color: #565a7a;
        position: absolute;
        right: 3vw;
        font-size: 1.7rem;
        transition: transform 0.2s ease-out;
        &.active {
          transform: rotate(180deg);
        }
      }
      &.active {
        .notice_a {
          padding: 3vh 0 0 1.9vw;
          height: auto;
          visibility: visible;
          font-size: 1.7rem;
        }
      }
    }
    .notice_a {
      padding-top: 0rem;
      padding-bottom: 0rem;
      height: 0px;
      visibility: hidden;
      transition: padding-top 0.5s, padding-bottom 0.5s, height 0.5s,
        transform 0.5s;
      color: #888;
    }
  }
  .notice-append {
    padding-bottom: 120px;
    ul {
      margin-top: 50px;
      li {
        margin-top: 20px;
        font-size: 1.7rem;
        font-weight: 600;
        textarea {
          resize: none;
          width: 52vw;

          padding: 10px;
          margin-top: 10px;
          box-sizing: border-box;
          border: solid 1px #888;
          border-radius: 5px;
          font-size: 16px;
        }
        .input-q {
          height: 10vh;
        }
        .input-a {
          height: 20vh;
        }
      }
    }
    .qna-btn {
      background-color: #565a7a;
      border-style: none;
      float: right;
      color: #fff;
      margin-top: 10px;
      margin-right: 13.6vw;

      height: 3.5vh;
      font-size: 1.5rem;
      width: 6.5vw;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;

export default function ManagerNotice() {
  const [activeIndex, setActiveIndex] = useState(null);
  const userId = useSelector(state => state.user.userID);
  const [isModalOpen, setIsModalOpen] = useState(false); // 추가 모달창

  const [render, setRender] = useState(false);
  const [text, setText] = useState([]);
  const question = useRef();
  const answer = useRef();
  // 공지사항 화면 렌더링
  const showNotice = async () => {
    try {
      const resShowNotice = await axios.get(
        `http://localhost:4000/main/manager/notice`,
      );
      setText(resShowNotice.data.ARTICLE);
    } catch (error) {
      console.error(error);
      console.log('ManagerNotice 잘못되었다.');
    }
  };
  useEffect(() => {
    showNotice();
  }, []);

  // 공지사항 추가 변수들
  const [list, setList] = useState([]);

  // 삭제버튼
  const deleteItem = () => {
    const checkedList = document.querySelectorAll(
      '.notice_qna input[type="checkbox"]:checked',
    );
    if (checkedList.length === 0) {
      alert('삭제할 항목을 선택해주세요.');
      return;
    }

    // 삭제 확인 창
    const confirmDelete = window.confirm('선택한 항목을 삭제하시겠습니까?');
    if (!confirmDelete) {
      return;
    }

    checkedList.forEach(checkbox => {
      //checkbox와 가장 가까운 부모 요소 중 클래스 이름이 notice_q인 것을 찾아서 지움
      const listItem = checkbox.closest('.notice_q');
      listItem.remove();
    });
  };

  const handleClick = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // li태그 눌렸을때, checkbox는 안눌리도록 하는 함수
  const checkBoxClick = e => {
    e.stopPropagation();
  };

  // 공지사항 추가 axios
  const appendNotice = async () => {
    try {
      const resAppendNotice = await axios.post(
        'http://localhost:4000/main/manager/notice',
        { question: question.current.value, answer: answer.current.value },
      );

      console.log(render);
    } catch (error) {
      console.error(error);
      console.log('ManagerNotice 추가 잘못되었다.');
    }
  };

  // 공지사항 추가 함수
  const appendItem = () => {
    // 추가한 내용 새로운 객체 담아줌

    appendNotice();
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Notice>
      <div className="Notice_all">
        <p>공지사항</p>
        <div className="notice_header">
          {/* {userId !== 'manager' ? (
            <button className="append_btn" onClick={showModal}>
              추가
            </button>
          ) : (
            ''
          )}
          {userId !== 'manager' ? (
            <button className="delete_btn" onClick={deleteItem}>
              삭제
            </button>
          ) : (
            ''
          )} */}
          <button className="append_btn" onClick={showModal}>
            추가
          </button>

          <button className="delete_btn" onClick={deleteItem}>
            삭제
          </button>
        </div>

        <ul className="notice_qna">
          {text.map((el, index) => (
            <li
              key={index}
              className={`notice_q ${activeIndex === index ? 'active' : ''}`}
              onClick={() => handleClick(index)}
            >
              {/* {userId === 'manager' ? (
                <label className="checkbox-container" onClick={checkBoxClick}>
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              ) : (
                ''
              )} */}
              <label className="checkbox-container" onClick={checkBoxClick}>
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
              Q. {el.QUESTION}
              <FontAwesomeIcon
                icon={activeIndex === index ? faMinus : faPlus}
                className={`notice_plus ${
                  activeIndex === index ? 'active' : ''
                }`}
              />
              <p className="notice_a">A. {el.ANSWER}</p>
            </li>
          ))}

          {/* 모달 열었을떄  */}
        </ul>
        {isModalOpen && (
          <div className="notice-append">
            <ul>
              <li>
                Question
                <br />
                <textarea
                  ref={question}
                  type="text"
                  className="input-q"
                  placeholder="질문"
                ></textarea>
              </li>
              <li>
                Answer
                <br />
                <textarea
                  ref={answer}
                  type="text"
                  className="input-a"
                  placeholder="답변"
                ></textarea>
              </li>
            </ul>
            <button className="qna-btn" onClick={appendItem}>
              공지사항 추가
            </button>
          </div>
        )}
      </div>
    </Notice>
  );
}
