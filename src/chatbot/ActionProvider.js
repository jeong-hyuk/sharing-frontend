import React from 'react';

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

  // 찬호를 입력하였을 때 실행되는 함수
  const handleHo = () => {
    const text = [
      '분노 조절을 못합니다',
      '조금 이상합니다',
      '얼굴이 어금니를 닮았습니다',
      '란호 입니다',
      'ENFP입니다',
    ];
    const botMessage = createChatBotMessage(
      text[Math.floor(Math.random() * text.length)],
    );

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // 유림을 입력하였을 때 실행되는 함수
  const handleLim = () => {
    const text = [
      '작고 소중합니다',
      '리류릴 입니다',
      '거누거누',
      '귀여운것을 좋아합니다',
      'INFP입니다',
    ];
    const botMessage = createChatBotMessage(
      text[Math.floor(Math.random() * text.length)],
    );

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // 정혁을 입력하였을 때 실행되는 함수
  const handleJung = () => {
    const text = [
      '집착이 심합니다',
      '정말 착합니다 ?',
      '캐로피입니다',
      '얼굴이 볼링공입니다',
      'ISTP입니다',
    ];
    const botMessage = createChatBotMessage(
      text[Math.floor(Math.random() * text.length)],
    );

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // 민영을 입력하였을 때 실행되는 함수
  const handleMin = () => {
    const text = [
      '송로몬 입니다',
      '깍쟁이 입니다',
      '만화를 좋아합니다',
      '루친녀 입니다',
      'INTP입니다',
    ];
    const botMessage = createChatBotMessage(
      text[Math.floor(Math.random() * text.length)],
    );

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // 인영을 입력하였을 때 실행되는 함수
  const handleIn = () => {
    const text = [
      '귀엽습니다',
      '착하고 여린 사람입니다',
      '눈썹이 조금 모자랍니다',
      'ENTP입니다',
    ];
    const botMessage = createChatBotMessage(
      text[Math.floor(Math.random() * text.length)],
    );

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
            handleHo,
            handleLim,
            handleJung,
            handleMin,
            handleIn,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
