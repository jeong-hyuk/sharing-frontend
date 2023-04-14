import React from 'react';
import MessageParser from './MessageParser';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('안녕하세요 반갑습니다 !');

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleno = () => {
    const botMessage = createChatBotMessage('잘못된 입력입니다');

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handlefirst = () => {
    const botMessage = createChatBotMessage('9 ~ 16 시까지 운영합니다', {
      widget: 'first',
    });
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handlesecond = () => {
    const botMessage = createChatBotMessage(
      '회원 가입 또는 로그인을 하신 후 메인 페이지에서 대여 서비스를 이용하시면 됩니다',
      {
        widget: 'second',
      },
    );
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handlethird = () => {
    const botMessage = createChatBotMessage(
      '저희 대여 서비스는 이용자들에게 무료로 제공 하고 있습니다',
      {
        widget: 'third',
      },
    );
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handlefourth = () => {
    const botMessage = createChatBotMessage(
      '대여를 한 장소에서 물건을 관리제에게 전달합니다',
      {
        widget: 'fourth',
      },
    );
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handlefifth = () => {
    const botMessage = createChatBotMessage(
      '일정 기간 동안 이용하지 못하게 됩니다',
      {
        widget: 'fifth',
      },
    );
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  return (
    <div>
      {React.Children.map(children, child => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleno,
            handlefirst,
            handlesecond,
            handlethird,
            handlefourth,
            handlefifth,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
