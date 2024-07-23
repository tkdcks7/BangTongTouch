import React from "react";
import { Outlet } from "react-router-dom";

// 컴포넌트
import ProfileMain from "../organism/ProfileMain";

const ProfilePage: React.FC = () => {

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default ProfilePage;