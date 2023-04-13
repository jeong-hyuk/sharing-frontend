import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const images = [
  {
    id: 1,
    src: require('../img/image1.jpeg'),
    width: '50px',
    height: '50px',
  },
  { id: 2, src: require('../img/image2.jpeg'), width: '50px', height: '50px' },
  { id: 3, src: require('../img/image3.png'), width: '50px', height: '50px' },
  { id: 4, src: require('../img/image4.jpeg'), width: '50px', height: '50px' },
  { id: 5, src: require('../img/image5.jpeg'), width: '50px', height: '50px' },
  { id: 6, src: require('../img/image6.jpeg'), width: '50px', height: '50px' },
  { id: 7, src: require('../img/image7.jpeg'), width: '50px', height: '50px' },
  { id: 8, src: require('../img/image8.jpeg'), width: '50px', height: '50px' },
  { id: 9, src: require('../img/image9.jpeg'), width: '50px', height: '50px' },
];

export default function FindRobot() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);
  }, []);

  const handleImageClick = (id) => {
    const image = images.find((img) => img.id === id);
    setSelectedImage(image);
    if (id === 3) {
      alert('이미지 찾기 성공');
    }
  };
  const Img = styled.img`
    width: 150px;
    height: 150px;
  `;

  const Table = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 150px);
    grid-template-rows: repeat(3, 150px);
    gap: 10px;
  `;
  return (
    <Table>
      <h1>원빈을 찾으세요 </h1>
      {images
        .filter((img) => img.id !== selectedImage?.id)
        .sort(() => Math.random() - 0.5)
        .map((img) => (
          <Img
            key={img.id}
            src={img.src}
            alt={`Image ${img.id}`}
            onClick={() => handleImageClick(img.id)}
          />
        ))}

      {selectedImage && (
        <div>
          <h2>찾은 이미지</h2>
          <Img
            src={selectedImage.src}
            alt={`Image ${selectedImage.id}`}
            onClick={() => handleImageClick(selectedImage.id)}
          />
        </div>
      )}
    </Table>
  );
}
