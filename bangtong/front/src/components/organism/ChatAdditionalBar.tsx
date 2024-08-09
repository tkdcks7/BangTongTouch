import React from "react";

// 아이콘
import {
  VideoCameraOutlined,
  PaperClipOutlined,
  SmileOutlined,
  CalendarOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface ChatAdditionalBarProps {
  roomId: string;
}

const ChatAdditionalBar: React.FC<ChatAdditionalBarProps> = ({ roomId }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-yellow-200 fixed bottom-16 left-0 flex justify-around p-2 md:hidden">
      <button
        className="text-center"
        onClick={(e) => {
          navigate(`/chats/videochat/${roomId}`);
        }}
      >
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
