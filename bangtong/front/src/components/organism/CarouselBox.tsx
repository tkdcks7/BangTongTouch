import React, { useEffect } from "react";

// 컴포넌트
import ImgCarousel from "../molecules/ImgCarousel";

// 이모티콘
import { PlusSquareFilled } from "@ant-design/icons";
import axios from "axios";

// 데이터
import useUserStore from "../../store/userStore";

const CarouselBox: React.FC = () => {
  const { id } = useUserStore();

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/products/recent/${id}`,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="mt-10">
      <div className="text-center mb-1">
        <PlusSquareFilled className="text-2xl hidden md:block" />
      </div>
      <p className="mb-3 md:text-xl md:text-center">
        <span className="font-bold">구미 진평동</span>에 새로 올라온 승계
        원룸입니다.
      </p>
      <ImgCarousel />
    </div>
  );
};

export default CarouselBox;
