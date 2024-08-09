import React, { useState } from "react";
import { Link } from "react-router-dom";

// 데이터
import { usersFavItems } from "../../data"; // 유저의 관심 매물 (더미데이터)

// 이미지 소스
import defaultRoom from "../../assets/Room1.jpg";

const ProfileMyFavItems: React.FC = () => {
  const roomType: { [key: string]: string } = {
    ONEROOM: "원룸",
    TWOROOM: "투룸",
    OPISTEL: "오피스텔",
    VILLA: "빌라",
    APART: "아파트",
  };

  return (
    <div className="flex flex-wrap justify-center">
      {usersFavItems.map((item) => (
        <div className="me-3" key={item.data.productId}>
          <Link to={`/products/${item.data.productId}`}>
            <img
              src={defaultRoom}
              alt="관심매물 사진"
              width={120}
              className="rounded-xl"
            />
          </Link>
          <div>
            <p className="text-sm">{`${item.data.boardRegion.regionDong} ${roomType[item.data.productType]}`}</p>
            <p className="text-sm">{`${item.data.productDeposit}/${item.data.productRent}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileMyFavItems;
