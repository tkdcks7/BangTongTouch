import React from "react";

interface TextBtnProps {
  title: string;
  text: string;
}

const TextBtn: React.FC<TextBtnProps> = ({ title, text }) => {
  return (
    <div className="flex justify-between mt-7">
      <p className="text-lime-600 font-bold">{title}</p>
      <button>{text}</button>
    </div>
  );
};

export default TextBtn;
