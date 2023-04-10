import { borderRadius } from '@mui/system';
import * as React from 'react';
import styled from 'styled-components';

const Producttable = styled.div`
  position: relative;
  top: 10vh;
  left: 12vw;
  width: 75vw;
  height: 70vh;
  text-align: center;
  background-color: #ffffff2b;
  table {
    border-collapse: collapse;
    width: 75vw;
    height: 70vh;
    th {
      border-right: 1px solid black;
      background-color: #446a72;
      height: 10vh;
    }
    td {
      border-right: 1px solid black;
      div {
        cursor: pointer;
        background-color: #446a72a1;
        transform: translateX(7vw);
        width: 5vw;
        height: 5vh;
        color: #fff;
        border-radius: 3rem;
      }
    }
  }
`;

const Sharebtn = styled.div``;

export default function ProductTable() {
  return (
    <>
      <Producttable>
        <table>
          <tr className="enter1">
            <th>코드</th>
            <th>이름</th>
            <th>상태</th>
            <th></th>
          </tr>
          <tr>
            <td>001</td>
            <td>컴퓨터</td>
            <td>대여가능</td>
            <td>
              <div>대여</div>
            </td>
          </tr>
          <tr>
            <td>002</td>
            <td>마우스</td>
            <td>대여가능</td>
            <td>
              <div>대여</div>
            </td>
          </tr>
          <tr>
            <td>003</td>
            <td>멀티탭</td>
            <td>대여가능</td>
            <td>
              <div>대여</div>
            </td>
          </tr>
        </table>
      </Producttable>
    </>
  );
}
