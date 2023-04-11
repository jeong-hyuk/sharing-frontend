import { borderRadius, style } from '@mui/system';
import * as React from 'react';
import styled from 'styled-components';

// const Producttable = styled.div`
//   position: relative;
//   top: 10vh;
//   left: 12vw;
//   width: 75vw;
//   height: 70vh;
//   text-align: center;
//   background-color: #ffffff2b;
//   table {
//     border-collapse: collapse;
//     width: 75vw;
//     height: 70vh;
//     th {
//       border-right: 1px solid black;
//       background-color: #446a72;
//       height: 10vh;
//     }
//     td {
//       border-right: 1px solid black;
//       div {
//         cursor: pointer;
//         background-color: #446a72a1;
//         transform: translateX(7vw);
//         width: 5vw;
//         height: 5vh;
//         color: #fff;
//         border-radius: 3rem;
//       }
//     }
//   }
// `;

const Productstyle = styled.div`
  position: relative;
  top: 20vh;
  left: 18.5vw;
  width: 72vw;
  height: 70vh;
  text-align: center;
  .allcontroller {
    display: flex;
    height: 70vh;
    .leftcontroller {
      width: 55vw;
      .title {
        border: 1px solid #446a72;
        background-color: #446a7279;
        border-radius: 5px;
        height: 7vh;
        margin-bottom: 5.5vh;
        ol {
          display: flex;
          justify-content: space-around;
          li {
            font-size: 1.6rem;
            font-weight: bold;
            width: 20vw;
            height: 7vh;
            line-height: 7vh;
            border: 1px solid #446a72;
          }
        }
      }
      .content {
        border: 1px solid #446a72;
        border-radius: 5px;
        ol {
          display: flex;
          justify-content: space-around;
          li {
            font-size: 1.6rem;
            border: 1px solid black;
            width: 20vw;
            line-height: 10vh;
            height: 54.5vh;
          }
        }
      }
    }
    .rightcontroller {
      width: 15vw;
      height: 70vh;
      margin-left: 2vw;
      .blank {
        width: 5vw;
        height: 7vh;
        background-color: #446a7279;
        margin-bottom: 5.5vh;
        border: 1px solid #446a72;
        border-radius: 5px;
      }
      .okbtn {
        font-size: 1.6rem;
        width: 5vw;
        height: 54.5vh;
        line-height: 10vh;
        border: 1px solid #446a72;
        border-radius: 5px;
        div {
          cursor: pointer;
          position: absolute;
          background-color: #446a72bb;
          border-radius: 5px;
          font-size: 1.6rem;
          width: 3vw;
          height: 5vh;
        }
      }
    }
  }
`;

export default function ProductTable() {
  return (
    <>
      <Productstyle>
        <div className="allcontroller">
          <div className="leftcontroller">
            <div className="title">
              <ol>
                <li>코드</li>
                <li>상품명</li>
                <li>상태</li>
              </ol>
            </div>
            <div className="content">
              <ol>
                <li>001</li>
                <li>컴퓨터</li>
                <li>대여가능</li>
              </ol>
            </div>
          </div>
          <div className="rightcontroller">
            <div className="blank"></div>
            <div className="okbtn">
              <div>대여</div>
            </div>
          </div>
        </div>
      </Productstyle>
    </>
  );
}
