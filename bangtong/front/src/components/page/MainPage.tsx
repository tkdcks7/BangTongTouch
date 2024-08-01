import React from "react";

// 컴포넌트
import CarouselBox from "../organism/CarouselBox";
import MainChatBox from "../organism/MainChatBox";
import TextBox from "../atoms/TextBox";

const MainPage: React.FC = () => {
  return (
    <div className="w-full md:w-3/6">
      <div className="md:hidden">
        <TextBox
          text="방통터치 메인"
          color="lime-500"
          size="3xl"
          weight="bold"
        />
      </div>
      <CarouselBox />
      <MainChatBox />
    </div>
  );
};

export default MainPage;