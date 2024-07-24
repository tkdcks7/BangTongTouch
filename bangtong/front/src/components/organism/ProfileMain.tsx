import React from "react";

// 컴포넌트
import ProfileMenu from "../molecules/ProfileMenu";

const ProfileMain: React.FC = () => {

  return (
    <div>
      <h2 className="w-full text-xl text-left mt-5 text-lime-500 font-bold">나의 거래</h2>
      <ProfileMenu />
    </div>
  )
}

export default ProfileMain;