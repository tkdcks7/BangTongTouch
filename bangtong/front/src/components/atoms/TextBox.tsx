import React from 'react';

interface TextBoxProps {
  text: string; // 들어갈 텍스트
}

const TextBox: React.FC<TextBoxProps> = ({text}) => {
  return (
    <div className="p-2">
      <p>{text}</p>
    </div>
  );
}

export default TextBox;
