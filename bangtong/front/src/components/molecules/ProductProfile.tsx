import React from "react";

// 컴포넌트
import Btn from "../atoms/Btn";
import ProfileImgBox from "../atoms/ProfileImgBox";
import authAxios from "../../utils/authAxios";
import useUserStore from "../../store/userStore";

// 이미지 소스

interface ProductProps {
  userinfo: any;
  productId: number;
}

const ProductProfile: React.FC<ProductProps> = ({ userinfo, productId }) => {
  const { id } = useUserStore();

  const makeChatRoom = () => {
    authAxios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/chatrooms/save`,
      data: {
        title: "끼얏호우",
        maker: 2,
        participant: id,
        productId,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  return (
    <div className="flex justify-between items-center mt-5">
      <ProfileImgBox src={userinfo.profileImage} profileId={userinfo.id} />
      {/* 유저 닉네임 받아오도록 조치 (현재 데이터 내 유저 정보가 없어서 미작성) */}
      <h2 className="text-xl font-bold">{userinfo.nickname}</h2>
      <Btn
        text="연락하기"
        width="w-20"
        textSize="text-sm"
        backgroundColor="bg-yellow-300"
        onClick={makeChatRoom}
      />
    </div>
  );
};

export default ProductProfile;
