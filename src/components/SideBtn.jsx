import React, { useState } from 'react';
import styled from 'styled-components';

const Btnstyle = styled.div`
  width: 3vw;
  height: 12vh;
  transform: ${(props) =>
    !props.isOn ? 'translate(0, 30vh)' : 'translate(23vw, 30vh)'};
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 0 5px 5px 0;
  line-height: 12vh;
`;

const Tabstyle = styled.div`
  position: absolute;
  /* display: none; */
  /* transform: translateY(40vh); */
  height: 103vh;
  width: 23vw;
  background-color: #446a727e;
  z-index: 2;
`;

export default function SideBtn() {
  const [isOn, setIsOn] = useState(false);
  console.log(isOn);
  return (
    <>
      {isOn && (
        <Tabstyle>
          <div>탭창</div>
        </Tabstyle>
      )}
      <Btnstyle onClick={() => setIsOn((cur) => !cur)} isOn={isOn}>
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </Btnstyle>
    </>
  );
}
