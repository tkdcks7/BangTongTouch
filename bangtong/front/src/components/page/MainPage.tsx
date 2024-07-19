import React from "react";

// 컴포넌트
import CarouselBox from "../organism/CarouselBox";
import ChatBox from "../organism/ChatBox";
import TextBox from "../atoms/TextBox";

const MainPage: React.FC = () => {
  return (
    <div>
      <TextBox 
        text="방통터치"
        color="lime-500"
        size="3xl"
        weight="bold"
      />
      <CarouselBox />
      <ChatBox />
    </div>
  )
}

export default MainPage