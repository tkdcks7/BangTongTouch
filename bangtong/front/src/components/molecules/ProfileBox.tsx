import React from "react";

// 컴포넌트
import Btn from "../atoms/Btn";

// 이미지 소스
import defaultprofile from "../../assets/defaultprofile.jpg"

interface ProfileProps {
  userNickname: string;
}

const ProfileBox: React.FC<ProfileProps> = ({userNickname}) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div id="profilePhoto" className="me-16">
        <img src={defaultprofile} alt="프로필 사진" width={100} height={100} className="rounded-full"/>
      </div>
      <div id="profileName" className="flex flex-col items-center">
        <p className="font-bold my-3 text-nowrap">{userNickname}님 안녕하세요</p>
        <div className="mb-3">
          <Btn
            text="프로필 편집"
            textSize="text-sm"
            width="w-28"
            backgroundColor="lime-500"
            textColor="white"
          />
        </div>
      </div>
    </div>   
  )
}

export default ProfileBox;