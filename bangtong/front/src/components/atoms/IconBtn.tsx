import React from 'react';

interface IconBtnProps {
  imgSrc: string; // 아이콘의 이미지 경로
  size: number;   // 버튼 사이즈 (정사각형 가로x세로 동일)
}

const IconBtn: React.FC<IconBtnProps> = ({imgSrc, size}) => {
  const buttonStyle: React.CSSProperties = {
    flexShrink: 0   // 축소되는 것 방지
  }
  return (
    <button className="rounded" style={buttonStyle}>
      <img src={imgSrc} alt="아이콘 이미지" width={size} height={size} />
    </button>
  );
}

export default IconBtn;