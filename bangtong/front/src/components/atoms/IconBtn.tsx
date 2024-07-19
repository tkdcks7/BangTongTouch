import React, { ButtonHTMLAttributes } from "react";

interface IconBtnProps extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string; // 아이콘의 이미지 경로
  size: number; // 버튼 사이즈 (정사각형 가로x세로 동일)
  onClick?: React.MouseEventHandler;
}

const IconBtn: React.FC<IconBtnProps> = ({ imgSrc, size, ...props }) => {
  const buttonStyle: React.CSSProperties = {
    flexShrink: 0, // 축소되는 것 방지
  };
  return (
    <div
      className="rounded hover:cursor-pointer"
      style={buttonStyle}
      {...props}
    >
      <img src={imgSrc} alt="아이콘 이미지" width={size} height={size} />
    </div>
  );
};

export default IconBtn;
