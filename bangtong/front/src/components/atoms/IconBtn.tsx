import React from 'react';

interface IconBtnProps {
  imgSrc: string;
}

const IconBtn: React.FC<IconBtnProps> = ({imgSrc}) => {
  return (
    <div className="w-10 h-10">
      <button className="bg-white-500 hover:bg-gray-400 text-white font-bold rounded">
        <img src={imgSrc} alt="아이콘 이미지" />
      </button>
    </div>
  );
}

export default IconBtn;