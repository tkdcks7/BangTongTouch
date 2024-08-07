import React from "react";

// 이미지 소스
import Room from "../../assets/Room1.jpg";
import defaultProfile from "../../assets/defaultprofile.jpg";

const ChatBox: React.FC = () => {
  return (
    <div className="mt-10 border p-3 bg-lime-100 rounded-xl md:p-7 dark:text-black">
      <p className="font-bold">1번집</p>
      <div className="border border-gray-300 my-2" />
      <div className="flex items-center">
        <img src={Room} alt="방사진" className="w-20 h-20" />
        <div className="ml-5">
          <h2 className="text-xl font-bold">구미 진평동 626-10</h2>
          <ul className="list-disc text-sm mt-2 ml-5">
            <li>풀옵션</li>
            <li>집 정보</li>
          </ul>
        </div>
      </div>
      <div className="border border-gray-300 my-2" />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={defaultProfile}
            alt="프로필"
            className="w-10 h-10 rounded-full me-5"
          />
          <p>안녕하세요~</p>
        </div>
        <p>2</p>
      </div>
    </div>
  );
};

export default ChatBox;
