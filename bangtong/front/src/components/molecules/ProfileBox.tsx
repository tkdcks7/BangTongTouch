import React from "react";
import useUserStore from "../../store/userStore";

// 컴포넌트
import Btn from "../atoms/Btn";
import ProfileImgBox from "../atoms/ProfileImgBox";

const ProfileBox: React.FC = () => {
  const { id, nickname, profileImage } = useUserStore();

  return (
    <div className="w-full flex justify-center items-center">
      <ProfileImgBox src={profileImage} profileId={id} />
      <div id="profileName" className="flex flex-col items-center">
        <p className="font-bold my-3 text-nowrap">{nickname}님 안녕하세요</p>
        <div className="mb-3">
          <Btn
            text="프로필 편집"
            textSize="text-sm"
            width="w-28"
            backgroundColor="bg-lime-500"
            textColor="white"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
