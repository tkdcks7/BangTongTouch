import React from "react";

// 컴포넌트
import TextBox from "../atoms/TextBox";
import ChatBox from "../molecules/ChatBox";

const ChatMain: React.FC = () => {
  return (
    <div className="w-max">
      <div className="md:hidden">
        <TextBox
          text="1:1 채팅 목록"
          color="lime-500"
          size="3xl"
          weight="bold"
        />
      </div>
      <ChatBox />
    </div>
  );
};

export default ChatMain;
