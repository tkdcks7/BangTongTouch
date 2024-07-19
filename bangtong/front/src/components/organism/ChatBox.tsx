import React from "react";

// 컴포넌트
import TextBox from "../atoms/TextBox";
import ChatCard from "../molecules/ChatCard";

const ChatBox: React.FC = () => {
    return (
      <div className="mt-5">
        <div className="mb-3">
          <TextBox 
            text="새로운 연락이 도착했어요!"
            weight="bold"
          />    
        </div>
        <ChatCard />
      </div>
    )
}

export default ChatBox