import React from "react";

// 컴포넌트
import TextBox from "../atoms/TextBox";

// 이미지
import Message from "../../assets/Message.png";

const ChatCard: React.FC = () => {
  return (
    <div className="p-5 border border-gray-400 flex flex-col items-center">
      <img src={Message} alt="Message" width={"20vw"} height={"20vh"} />
      <div className="pt-4 mx-auto">
        <TextBox text="구미 진평동 626-10" size="xl" />
      </div>
      <div className="pt-2 mx-auto">
        <TextBox text="동향 / 여름에 시원해요" size="xs" />
      </div>
    </div>
  );
};

export default ChatCard;
