import React from "react";

// 컴포넌트
import ImgCarousel from "../molecules/ImgCarousel";

const CarouselBox: React.FC = () => {
  return (
    <div className="mt-10">
      <p className="mb-3"><span className="font-bold">구미 진평동</span>에 새로 올라온 승계 원룸입니다.</p>
      <ImgCarousel />
    </div>
  )
}

export default CarouselBox