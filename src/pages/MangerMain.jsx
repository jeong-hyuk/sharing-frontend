import React from 'react';
import ManagerLog from '../components/ManagerLog';
import Header from '../components/Header';
import UserMainMenu from '../components/UserMainMenu';
import ManagerRent from '../components/ManagerRent';

export default function MangerMain() {
  return (
    <>
      <Header />
      <UserMainMenu />
      <ManagerLog />
      <ManagerRent />
    </>
  );
}
