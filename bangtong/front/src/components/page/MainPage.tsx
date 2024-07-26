import React from "react";

// 컴포넌트
import CarouselBox from "../organism/CarouselBox";
import ChatBox from "../organism/MainChatBox";
import TextBox from "../atoms/TextBox";

const MainPage: React.FC = () => {
  return (
    <div className="lg:w-4/5">
      <TextBox text="방통터치 메인" color="lime-500" size="3xl" weight="bold" />
      <CarouselBox />
      <ChatBox />
    </div>
  );
};

export default MainPage;
