// 사용자가 입력한 데이터를 처리해줌

import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = message => {
    if (message.includes('안녕')) {
      actions.handleHello();
    } else if (message.includes('찬호')) {
      actions.handleHo();
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
