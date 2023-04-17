// 사용자가 입력한 데이터를 처리해줌

import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = message => {
    if (message.includes('안녕')) {
      actions.handleHello();
    } else if (message.includes('찬호')) {
      actions.handleHo();
    } else if (message.includes('유림')) {
      actions.handleLim();
    } else if (message.includes('정혁')) {
      actions.handleJung();
    } else if (message.includes('민영')) {
      actions.handleMin();
    } else if (message.includes('인영')) {
      actions.handleIn();
    } else {
      actions.handleno();
    }
  };

  return (
    <div>
      {React.Children.map(children, child => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
