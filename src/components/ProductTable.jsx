import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';

// 미리 3개의 데이터를 넣어둠
const arr = [
  {
    code: '001',
    product_name: '노트북',
    status: '대여가능',
    btn: '대여',
  },
  {
    code: '002',
    product_name: '노트북',
    status: '대여가능',
    btn: '대여',
  },
  {
    code: '003',
    product_name: '노트북',
    status: '대여가능',
    btn: '대여',
  },
];

export default function ProductTable() {
  return (
    <>
      {/* sx를 사용하여 table의 style지정 */}
      <TableContainer
        component={Paper}
        sx={{
          width: '70vw',
          height: '65vh',
          position: 'relative',
          left: '15vw',
          top: '10vh',
        }}
      >
        <Table>
          <TableHead
            sx={{
              '& th': {
                color: 'white',
                backgroundColor: '#446A72',
                fontWeight: 'bold',
              },
            }}
          >
            {/* table에 제목 부분 */}
            <TableRow>
              <TableCell align="center">코드</TableCell>
              <TableCell align="center">기자재명</TableCell>
              <TableCell align="center">상태</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {/* table에 들어갈 데이터 */}
          <TableBody>
            {arr.map((arr) => (
              <TableRow key={arr.code}>
                <TableCell align="center">{arr.code}</TableCell>
                <TableCell align="center">{arr.product_name}</TableCell>
                <TableCell align="center">{arr.status}</TableCell>
                <TableCell align="center">
                  <div onClick={() => console.log('대여')}>{arr.btn}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
