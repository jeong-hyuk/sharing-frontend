// 챗봇에 전체 설정
import { createChatBotMessage } from 'react-chatbot-kit';
import styled from 'styled-components';
import LearningOptions from './LearningOptions';

const Chatbotheader = styled.div`
  height: 8vh;
  background-color: #001e22;
  font-size: 2.5rem;
  text-align: center;
  line-height: 8vh;
`;

const config = {
  initialMessages: [
    createChatBotMessage('안녕하세요 ! 궁금한 내용이 무엇인가요 ?', {
      widget: 'learningOptions',
    }),
  ],
  widgets: [
    {
      widgetName: 'learningOptions',
      widgetFunc: props => <LearningOptions {...props} />,
    },
  ],
  customComponents: {
    header: () => <Chatbotheader>Messages</Chatbotheader>,
    botAvatar: props => <div {...props} />,
    userAvatar: props => <div {...props} />,
  },
};

export default config;
