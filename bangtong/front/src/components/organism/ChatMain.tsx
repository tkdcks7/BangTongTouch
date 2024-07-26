import React from "react";

// 컴포넌트
import TextBox from "../atoms/TextBox";
import ChatBox from "../molecules/ChatBox";

const ChatMain: React.FC = () => {
  return (
    <div className="w-max">
      <TextBox text="1:1 채팅 목록" color="lime-500" size="3xl" weight="bold" />
      <ChatBox />
    </div>
  );
};

export default ChatMain;
