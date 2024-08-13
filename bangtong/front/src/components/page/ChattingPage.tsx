import React from "react";
import { Outlet } from "react-router-dom";

// 컴포넌트
import ChatBox from "../molecules/ChatBox";

const ChattingPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="h-full w-80 hidden md:block bg-gray-50 overflow-auto"
        id="product-list"
      >
        <ChatBox />
      </div>
      <Outlet />
    </div>
  );
};

export default ChattingPage;
