import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Room1 from "../../assets/Room1.jpg";
import Room2 from "../../assets/Room2.jpg";
import Room3 from "../../assets/Room3.jpg";

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
    <Carousel
      showArrows={true}
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
      showStatus={false}
      showIndicators={false}
      stopOnHover={true}
      swipeable={true}
      dynamicHeight={true}
    >
      {imgSrc.map((img) => {
        return (
          <div>
            <img
              src={img}
              alt="1"
              style={{ width: "100%", height: "30vh" }}
              className="rounded-2xl"
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default ImgCarousel;
