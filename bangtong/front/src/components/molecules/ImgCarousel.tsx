import React from "react";
import { Carousel, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import Room1 from "../../assets/Room1.jpg";
import Room2 from "../../assets/Room2.jpg";
import Room3 from "../../assets/Room3.jpg";
import defaultHome from "../../assets/defaulthome.png";

import "../../index.css";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

interface imgSrcProps {
  //imgCarousel props 로 이미지 src 배열 전달
  imgSrcArray?: Array<string>; //전달 안했을 경우 디폴트 이미지로
  productId?: string; // 디테일페이지로 이동하기위한 PK
  isCanClick?: boolean; // 캐러셀 클릭 가능여부
  isForChat?: boolean; // 채팅창에 나타낼 캐러셀인지
  isFromBack?: boolean; // 백단에서 온 데이터인지
}

const ImgCarousel: React.FC<imgSrcProps> = ({
  imgSrcArray = [""],
  productId,
  isCanClick = true,
  isForChat = false,
  isFromBack = false,
}) => {
  const imgSrc: Array<string> = [];
  const navigate = useNavigate();

  if (imgSrcArray && imgSrcArray[0]) {
    imgSrcArray.forEach((element) => {
      imgSrc.push(element);
    });
  } else {
    imgSrc.push(defaultHome);
  }

  // 이미지에 보이는 매물로 이동하기
  const handleImgClick = () => {
    navigate(`products/${productId}`);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            arrowOffset: 20,
            arrowSize: 30,
          },
        },
      }}
    >
      <Carousel arrows autoplay draggable adaptiveHeight>
        {imgSrc.map((img: any) => {
          return (
            <div
              key={img}
              onClick={isCanClick ? handleImgClick : undefined}
              className={`${isCanClick ? "hover:cursor-pointer" : ""}`}
            >
              <img
                key={img}
                src={
                  isFromBack
                    ? process.env.REACT_APP_BACKEND_SRC_URL +
                      "/" +
                      img.mediaPath
                    : img
                }
                alt="1"
                className="rounded-xl h-60 md:h-80 w-full"
              />
            </div>
          );
        })}
      </Carousel>
    </ConfigProvider>
  );
};

export default ImgCarousel;
