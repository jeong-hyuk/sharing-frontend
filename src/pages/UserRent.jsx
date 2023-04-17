import ProductTable from '../components/ProductTable';
import Header from '../components/Header';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Chatbot from '../components/Chatbotcontroller';
import ManagerConfirm from '../components/ManagerConfirm';

export default function UserRent() {
  const [subMain, setSubMain] = useState([]);
  const [render, setRender] = useState('');

  const handleRender = param => {
    setRender(cur => cur + param);
  };

  // router 에서 받아온 parameter 값: 0001,0002 등 처리 해주는 useParams id 값에 저장.
  const { id } = useParams();
  const showObject = async () => {
    try {
      const resShowObject = await axios.get(
        `http://localhost:4000/subMain/${id}`,
      );
      // 받아온 데이터를  -> setSubMain 에 담아서 Components/ProductTable
      setSubMain(cur => resShowObject.data.ARTICLE);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    showObject();
  }, [render]);

  return (
    <>
      <Header />
      <ProductTable subMainData={subMain} handleRender={handleRender} />
    </>
  );
}
