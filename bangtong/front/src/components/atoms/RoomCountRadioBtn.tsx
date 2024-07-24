import React from "react";

interface InputProps {
  text: string;
}

const RoomCountRadioBtn: React.FC<InputProps> = ({ text, ...props }) => {
  return (
    <label>
      <input type="radio" name="room-type" id="one" value='one-room' className="me-1 ms-3"/>
      {text}
    </label>
  )
}

export default RoomCountRadioBtn;