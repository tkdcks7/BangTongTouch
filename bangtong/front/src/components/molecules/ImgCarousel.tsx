import React from "react";
import { Carousel, ConfigProvider } from "antd";
import Room1 from "../../assets/Room1.jpg";
import Room2 from "../../assets/Room2.jpg";
import Room3 from "../../assets/Room3.jpg";

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
}

const ImgCarousel: React.FC<imgSrcProps> = ({ imgSrcArray }) => {
  const imgSrc: Array<string> = [];
  if (imgSrcArray) {
    imgSrcArray.forEach((element) => {
      imgSrc.push(element);
    });
  } else {
    imgSrc.push(Room1);
    imgSrc.push(Room2);
    imgSrc.push(Room3);
  }

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
        {imgSrc.map((img) => {
          return (
            <div>
              <img
                key={img}
                src={img}
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
