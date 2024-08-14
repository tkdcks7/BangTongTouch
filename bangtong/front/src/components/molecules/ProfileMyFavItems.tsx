import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Store
import useUserStore from "../../store/userStore";

// 이미지 소스
import defaultRoom from "../../assets/Room1.jpg";
import axios from "axios";

const ProfileMyFavItems: React.FC = () => {
  const [favItems, setFavItems] = useState<any>([]);
  const { id } = useUserStore();

  const roomType: { [key: string]: string } = {
    ONEROOM: "원룸",
    TWOROOM: "투룸",
    OPISTEL: "오피스텔",
    VILLA: "빌라",
    APART: "아파트",
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/interests/${id}`,
    })
      .then((res) => {
        console.log(res);
        setFavItems(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-wrap justify-start">
      {favItems &&
        favItems.map((item: any) => (
          <div className="me-3" key={item?.productReturnDto?.productId}>
            <Link to={`/products/${item?.productReturnDto?.productId}`}>
              <img
                src={
                  item?.productReturnDto?.mediaList.length !== 0
                    ? process.env.REACT_APP_BACKEND_SRC_URL +
                      "/" +
                      item?.productReturnDto?.mediaList[0].mediaPath
                    : defaultRoom
                }
                alt="관심매물 사진"
                width={120}
                className="rounded-xl h-20 w-32"
              />
            </Link>
            <div className="text-center">
              <p className="text-sm dark:text-white">
                {`${item?.productReturnDto?.regionReturnDto?.regionDong || "Unknown Location"} ${roomType[item?.productReturnDto?.productType] || "Unknown Type"}`}
              </p>
              <p className="text-sm dark:text-white">
                {`${item?.productReturnDto?.productDeposit || 0}/${item?.productReturnDto?.productRent || 0}`}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProfileMyFavItems;
