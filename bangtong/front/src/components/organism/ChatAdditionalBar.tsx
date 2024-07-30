import React from "react";

// 아이콘
import {
  VideoCameraOutlined,
  PaperClipOutlined,
  SmileOutlined,
  CalendarOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const ChatAdditionalBar: React.FC = () => {
  return (
    <div className="w-full bg-yellow-200 fixed bottom-16 left-0 flex justify-around p-2 md:hidden">
      <button className="text-center">
        <VideoCameraOutlined />
        <p>라이브 시작</p>
      </button>
      <button className="text-center">
        <PaperClipOutlined />
        <p>파일 첨부</p>
      </button>
      <button className="text-center">
        <SmileOutlined />
        <p>이모티콘</p>
      </button>
      <button className="text-center">
        <CalendarOutlined />
        <p>일정 잡기</p>
      </button>
      <button className="text-center">
        <WarningOutlined />
        <p>신고하기</p>
      </button>
    </div>
  );
};

export default ChatAdditionalBar;
