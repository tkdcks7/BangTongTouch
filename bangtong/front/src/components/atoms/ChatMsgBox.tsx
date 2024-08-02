import React from 'react';

interface ChatMsgBoxProps {
  message: string;  // 채팅 메시지 내용
  date: string;     // 날짜, 시간
}

const ChatMsgBox: React.FC<ChatMsgBoxProps> = ({message, date}) => {
  return (
    <div className="bg-gray-200 border-solid p-3 rounded-lg">
      <p>{message}</p>
      <p className='text-xs text-gray-500'>{date}</p>
    </div>
  );
}

export default ChatMsgBox;