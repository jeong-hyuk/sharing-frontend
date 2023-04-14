// 버튼 목록

import React from 'react';
import styled from 'styled-components';

const Learningstyle = styled.div`
  .learning-options-container {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .learning-option-button {
    padding: 0.5rem;
    border-radius: 25px;
    background: transparent;
    border: 1px solid green;
    margin: 5px;
    cursor: pointer;
  }
`;

const LearningOptions = props => {
  const options = [
    {
      text: '챗봇 운영시간',
      handler: props.actionProvider.handlefirst,
      id: 1,
    },
    { text: '대여', handler: props.actionProvider.handlesecond, id: 2 },
    { text: '대여 요금', handler: props.actionProvider.handlethird, id: 3 },
    { text: '반납', handler: props.actionProvider.handlefourth, id: 4 },
    {
      text: '연체 되었을 때',
      handler: props.actionProvider.handlefifth,
      id: 5,
    },
  ];

  const optionsMarkup = options.map(option => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return (
    <Learningstyle>
      <div className="learning-options-container">{optionsMarkup}</div>
    </Learningstyle>
  );
};

export default LearningOptions;
