import ProductTable from '../components/ProductTable';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import { useEffect } from 'react';

export default function UserRent() {
  const showObject = async () => {
    try {
      const resShowObject = await axios.get(
        'http://localhost:4000/subMain/00001',
      );
      console.log(resShowObject.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    showObject();
  }, []);

  const Allstyle = createGlobalStyle`
    /* *{font-size: 16px;} */
  `;
  return (
    <>
      <Allstyle />
      <Header />
      <ProductTable />
    </>
  );
}
