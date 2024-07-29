import React from "react";

// 컴포넌트
import RollBackBtn from "../atoms/RollBackBtn";
import ChatMsgBox from "../atoms/ChatMsgBox";

// 이미지 소스
import defaultProfile from "../../assets/defaultprofile.jpg";
import InputBox from "../molecules/InputBox";

const ChatDetail: React.FC = () => {
  return (
    <div>
      <RollBackBtn />
      <div className="flex mt-10">
        <img
          src={defaultProfile}
          alt="프로필 사진"
          className="w-10 h-10 rounded-full me-3"
        />
        <ChatMsgBox message="안녕하세요~" date="2024-07-26 17:41" />
      </div>
      <div className="mt-10">
        <InputBox placeholder="채팅 입력" width={"auto"} buttonType="send" />
      </div>
      <button className="p-2 px-4 bg-yellow-400 rounded-full">+</button>
    </div>
  );
};

export default ChatDetail;
