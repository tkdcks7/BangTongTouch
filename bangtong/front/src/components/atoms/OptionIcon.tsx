import React from "react";

interface OptionProps {
  src: string;
  text: string;
  show: string;
}

const OptionIcon: React.FC<OptionProps> = ({src, text ,show}) => {
  
  let isShow: string;

  if (show === '0') {
    isShow = 'hidden'
  } else {
    isShow = ''
  }
  
  return (
    <div className={`m-2 flex flex-col items-center ${isShow}`}>
      <img src={src} alt={text} width={50} />
      <p>{text}</p>
    </div>
  )
}

export default OptionIcon;