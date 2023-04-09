import React, { useState } from 'react';
import ProductTable from '../components/ProductTable';
import Header from '../components/Header';
import SideBtn from '../components/SideBtn';

export default function UserRent() {
  return (
    <>
      <Header />
      <SideBtn />
      <ProductTable />
    </>
  );
}
