import React, { useEffect, useState } from "react";
import authAxios from "../../utils/authAxios";

// 컴포넌트
import ImgCarousel from "../molecules/ImgCarousel";
import { Carousel } from "antd";

// 이모티콘
import { PlusSquareFilled } from "@ant-design/icons";

// 데이터
import useUserStore from "../../store/userStore";

interface regionDto {
  regionSido: string;
  regionGugun: string;
  regionDong: string;
  regionId: number;
}

interface CarouselBoxProps {
  product: {
    regionReturnDto: regionDto;
    mediaList: string[];
    productId: number;
  };
}

const CarouselBox: React.FC<CarouselBoxProps> = ({ product }) => {
  const { id } = useUserStore();

  return (
    <div className="mt-10">
      <div className="text-center mb-1">
        <PlusSquareFilled className="text-2xl hidden md:block" />
      </div>
      <p className="mb-3 md:text-xl md:text-center">
        <span className="font-bold">
          {product?.regionReturnDto?.regionGugun}{" "}
          {product?.regionReturnDto?.regionDong}
        </span>
        에 새로 올라온 승계 원룸입니다.
      </p>
    </div>
  );
};

export default CarouselBox;
