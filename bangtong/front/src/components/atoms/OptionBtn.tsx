import React, { useState } from "react";

interface BtnProps {
  text: string;
}

const OptionBtn: React.FC<BtnProps> = ({ text, ...props }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  return (
    <button
      onClick={() => setIsClicked(!isClicked)}
      className={
        "border border-lime-500 rounded-full m-1 px-3 py-1 " +
        (isClicked ? " bg-lime-500 text-white" : "text-lime-500 bg-white")
      }
    >
      {text}
    </button>
  );
};

export default OptionBtn;
