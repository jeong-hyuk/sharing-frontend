import React from 'react';
import config from '../chatbot/config';
import Chatbot from 'react-chatbot-kit';
import MessageParser from '../chatbot/MessageParser';
import ActionProvider from '../chatbot/ActionProvider';
import 'react-chatbot-kit/build/main.css';
import styled from 'styled-components';
import Chatbotcontent from '../chatbot/Chatbotcontent';

const Chatbotstyle = styled.div`
  position: absolute;
  z-index: 10;
  transform: translate(75vw, 30vh);
  .react-chatbot-kit-chat-container {
    position: fixed;
    width: 22vw;
    height: 80%;
    min-height: 520px;
    max-height: 680px;
    overflow: hidden;
    border-radius: 25px;
    box-shadow: rgb(0 0 0 / 30%) 0px 12px 60px 5px;
  }
`;

export default function Chatbotcontroller() {
  return (
    <div>
      {/* <Chatbotstyle>
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </Chatbotstyle> */}
      <Chatbotcontent />
    </div>
  );
}
