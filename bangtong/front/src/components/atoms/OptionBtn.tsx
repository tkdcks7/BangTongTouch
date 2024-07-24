import React from "react";

interface BtnProps {
  text: string;
}

const OptionBtn: React.FC<BtnProps> = ({ text, ...props }) => {
  return (
    <button className="text-lime-500 px-3 py-1 border border-lime-500 rounded-full m-1">
    {text}
    </button>
  )
}

export default OptionBtn;