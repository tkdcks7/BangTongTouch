import React, { useEffect, useState } from "react";
import axios from "axios";

// 컴포넌트
import ImgCarousel from "../molecules/ImgCarousel";

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

const CarouselBox: React.FC = () => {
  const [src, setSrc] = useState<string[]>();
  const [region, setRegion] = useState<regionDto>();
  const [productId, setProductId] = useState();
  const { id } = useUserStore();

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/products/recent/${id}`,
    })
      .then((res) => {
        console.log(res);
        setSrc(res.data.data.mediaList);
        setRegion(res.data.data.productReturnDto.regionReturnDto);
        setProductId(res.data.data.productReturnDto.productId);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mt-10">
      <div className="text-center mb-1">
        <PlusSquareFilled className="text-2xl hidden md:block" />
      </div>
      <p className="mb-3 md:text-xl md:text-center">
        <span className="font-bold">
          {region?.regionGugun} {region?.regionDong}
        </span>
        에 새로 올라온 승계 원룸입니다.
      </p>
      <ImgCarousel imgSrcArray={src} productId={productId} />
    </div>
  );
};

export default CarouselBox;
