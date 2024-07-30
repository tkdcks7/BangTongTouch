// style 코드는 추후 css로 뺼 수 있으면 빼야함

import React from "react";

interface ToggleProps {
  buttonId: string;
}

const ToggleBtn: React.FC<ToggleProps> = ({buttonId}) => {
  return (
    <div className="flex items-center justify-center w-full">
      <label htmlFor={buttonId} className="flex items-center cursor-pointer">
        <div className="relative toggle-container">
          <input type="checkbox" id={buttonId} className="sr-only" />
          <div className="block bg-white w-14 h-8 rounded-full border-2 border-black"></div>
          <div className="dot absolute left-1 top-1 bg-black w-6 h-6 rounded-full transition"></div>
        </div>
      </label>
      <style>{`
        .toggle-container {
          transform: scale(0.7);
        }
        input:checked ~ .dot {
          transform: translateX(100%);
          background-color: #129B07;
        }
        input:checked ~ .block {
          background-color: #129B0740;
          border-color: #129B07;
        }
      `}</style>
    </div>
  );
};

export default ToggleBtn;

