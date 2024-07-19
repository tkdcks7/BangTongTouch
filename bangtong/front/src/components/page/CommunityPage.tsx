import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

// 컴포넌트
import TextBox from "../atoms/TextBox";
import CommunityMain from "../organism/CommunityMain";

const CommunityPage: React.FC = () => {
  return (
    <div className="w-full mx-3 mb-3">
      <Link to="/boards">
        <TextBox 
          text="신통방톡"
          color="lime-500"
          size="3xl"
          weight="bold"
        />
      </Link>
      <Outlet />
    </div>
  )
};

export default CommunityPage;