import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authAxios from "../../utils/authAxios";
import useUserStore from "../../store/userStore";

// 데이터
import { usersFavItems } from "../../data"; // 유저의 관심 매물 (더미데이터)

// 이미지 소스
import defaultRoom from "../../assets/Room1.jpg";

interface ProfileItemProps {
  type: "favorite" | "mine";
}

const ProfileMyFavItems: React.FC<ProfileItemProps> = ({ type }) => {
  const { id } = useUserStore();
  const [userFavItemList, setUserFavItemList] = useState([]);
  const roomType: { [key: string]: string } = {
    ONEROOM: "원룸",
    TWOROOM: "투룸",
    OPISTEL: "오피스텔",
    VILLA: "빌라",
    APART: "아파트",
  };

  useEffect(() => {
    let url: string = "";
    if (type === "favorite") {
      url = `${process.env.REACT_APP_BACKEND_URL}/interest/${id}`;
    }
    // else if (type === "mine") {url = `${process.env.REACT_APP_BACKEND_URL}/interest/${id}`}  // API 만들어지면 쿼리스트링 넣어서 조건처리
    authAxios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/interest/${id}`,
    })
      .then((response) => {
        console.log("관심 등록한 상품 정보를 가져옵니다.");
        setUserFavItemList(response.data.data);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
          console.log("요청하신 데이터를  찾을 수 없습니다.");
        }
      });
  }, []);

  // 관심 등록을 제거하는 핸들러
  const handleFavDelete = (productId: number): void => {
    const newList = userFavItemList.filter((el: any) => {
      return el.data.productId !== productId;
    });
    setUserFavItemList([...newList]);
  };

  // usersFavItems 대신 userFavItemList를 넣으면 됨
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
