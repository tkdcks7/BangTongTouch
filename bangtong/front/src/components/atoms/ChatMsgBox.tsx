import React from 'react';

interface ChatMsgBoxProps {
  message: string;
  date: string;
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