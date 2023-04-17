import React from 'react';
import ManagerLog from '../components/ManagerLog';
import Header from '../components/Header';
import UserMainMenu from '../components/UserMainMenu';

export default function MangerMain() {
  return (
    <>
      <Header />
      <UserMainMenu />
      {/* 유저메뉴는 임시 */}
      <ManagerLog />
    </>
  );
}
