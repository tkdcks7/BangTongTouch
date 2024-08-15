import React, { useEffect, useState } from "react";
import authAxios from "../../utils/authAxios";

// 컴포넌트
import CarouselBox from "../organism/CarouselBox";
import MainChatBox from "../organism/MainChatBox";
import TextBox from "../atoms/TextBox";
import Loading from "../atoms/Loading";
import ImgCarousel from "../molecules/ImgCarousel";
import { Carousel } from "antd";

const MainPage: React.FC = () => {
  const [products, setProducts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    authAxios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/products/recent/product`,
    })
      .then((res) => {
        console.log(res);
        setProducts(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full md:w-3/6 bg-white dark:bg-gray-800 text-black dark:text-white">
          <div className="md:hidden">
            <TextBox
              text="방통터치 메인"
              color="lime-500"
              size="3xl"
              weight="bold"
            />
          </div>
          <CarouselBox />
          <Carousel arrows autoplay draggable>
            {products.length > 0 ? (
              products.map((product: any) => (
                <div>
                  <img
                    src={
                      process.env.REACT_APP_BACKEND_SRC_URL +
                      product.mediaList[0].mediaPath
                    }
                    alt="매물 사진"
                    className="hover:cursor-pointer object-fill w-full h-[350px]"
                  />
                </div>
              ))
            ) : (
              <div className="h-[350px] bg-gray-50 flex content-center">
                <p className="text-center my-auto text-xl font-bold">
                  등록된 매물이 없습니다.
                </p>
              </div>
            )}
          </Carousel>

          <MainChatBox />
          <div className="h-24" />
        </div>
      )}
    </>
  );
};

export default MainPage;
