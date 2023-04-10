import ProductTable from '../components/ProductTable';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { createGlobalStyle } from 'styled-components';

export default function UserRent() {
  const Allstyle = createGlobalStyle`
    *{font-size: 16px;}
  `;
  return (
    <>
      <Allstyle />
      <Header />
      <Sidebar />
      <ProductTable />
    </>
  );
}
