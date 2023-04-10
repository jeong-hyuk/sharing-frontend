import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const SidebarDiv = styled.div`
  background-color: #000000be;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  transition: 0.4s ease;
  height: 100%;
  z-index: 99;
`;

const SidebarBtn = styled.button`
  position: relative;
  left: 280px;
  top: 50vh;
  width: 3vw;
  height: 10vh;
  z-index: 99;
  transition: 0.8s ease;
  border-radius: 0 5px 5px 0;
  border: 0px solid;
  background-color: rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
`;

const Sidelist = styled.div`
  position: relative;
  left: 2vw;
  text-align: center;
  ul {
    li {
      width: 14vw;
      height: 6vh;
      margin-bottom: 8vh;
      background-color: white;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;
const Sidebar = ({ width = 280 }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(width);
  const side = useRef();

  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition > 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(width);
      setOpen(false);
    }
  };

  return (
    <SidebarDiv
      ref={side}
      style={{
        width: `${width}px`,
        height: '100%',
        transform: `translatex(${-xPosition}px)`,
      }}
    >
      <SidebarBtn onClick={() => toggleMenu()}>
        {isOpen ? (
          <span className="material-symbols-outlined">arrow_back_ios</span>
        ) : (
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        )}
      </SidebarBtn>
      <Sidelist>
        <ul>
          <li>노트북</li>
          <li>마우스</li>
          <li>멀티탭</li>
        </ul>
      </Sidelist>
    </SidebarDiv>
  );
};

export default Sidebar;
