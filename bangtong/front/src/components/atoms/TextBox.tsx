import React from 'react';

interface TextBoxProps {
  text: string; // 들어갈 텍스트
  size?: string; // 텍스트 크기 (xs, sm, base, lg, xl, 2xl, ...)
}

const TextBox: React.FC<TextBoxProps> = ({text, size="sm"}) => {
  return (
    <div className={`text-${size}`}>
      <p>{text}</p>
    </div>
  );
}

export default TextBox;
