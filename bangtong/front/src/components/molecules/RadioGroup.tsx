import React from "react";

// 컴포넌트
import RoomCountRadioBtn from "../atoms/RoomCountRadioBtn";

const RadioGroup: React.FC = () => {
  return (
    <div id="radio-group" className="flex justify-center items-center">
      <RoomCountRadioBtn
        text="1"
      />
      <RoomCountRadioBtn
        text="2"
      />
      <RoomCountRadioBtn
        text="3개 이상"
      />
    </div>
  )
}

export default RadioGroup;