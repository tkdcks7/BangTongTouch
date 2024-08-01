import React from "react";

// 컴포넌트
import ToggleBtn from "../atoms/ToggleBtn";

interface ToggleProps {
  text: string;
  buttonId: string;
}

const ToggleBox: React.FC<ToggleProps> = ({ text, buttonId, ...props }) => {

  return (
    <div className="flex text-sm text-nowrap items-center justify-between mt-3">
      <p>{text}</p>
      <div>
        <ToggleBtn 
          buttonId={buttonId}
        />
      </div>
    </div>
  )
}

export default ToggleBox;