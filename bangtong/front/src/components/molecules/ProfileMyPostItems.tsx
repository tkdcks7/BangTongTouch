import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import authAxios from "../../utils/authAxios";

// Store
import useUserStore from "../../store/userStore";

// 이미지 소스
import defaultRoom from "../../assets/Room1.jpg";

const ProfileMyPostItems: React.FC = () => {
  const [postItems, setPostItems] = useState<any>([]);
  const { id } = useUserStore();

  const roomType: { [key: string]: string } = {
    ONEROOM: "원룸",
    TWOROOM: "투룸",
    OPISTEL: "오피스텔",
    VILLA: "빌라",
    APART: "아파트",
  };

  useEffect(() => {
    authAxios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/products/myproducts`,
    })
      .then((res) => {
        console.log(res);
        setPostItems(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-wrap justify-start">
      {postItems &&
        postItems.map((item: any) => (
          <div className="me-3" key={item?.productId}>
            <Link to={`/products/${item?.productId}`}>
              <img
                src={
                  item?.mediaList.length !== 0
                    ? `${process.env.REACT_APP_BACKEND_SRC_URL}/${item?.mediaList[0]?.mediaPath}`
                    : defaultRoom
                }
                alt="업로드한 매물 사진"
                width={120}
                className="rounded-xl h-20 w-32"
              />
            </Link>
            <div className="text-center">
              <p className="text-sm dark:text-white">
                {`${item?.regionReturnDto?.regionDong || "Unknown Location"} ${roomType[item?.productType] || "Unknown Type"}`}
              </p>
              <p className="text-sm dark:text-white">
                {`${item?.productDeposit || 0}/${item?.productRent || 0}`}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProfileMyPostItems;
