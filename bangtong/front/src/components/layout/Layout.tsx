import React from "react";

// 컴포넌트
import MMenuBar from "../organism/MMenuBar"; // 모바일 메뉴바 (알림, 햄버거버튼)
import MNavBar from "../organism/MNavBar"; // 모바일 네비게이션바
import PcNavBar from "../organism/PcNavBar"; // PC 네비게이션바
import PcFooter from "../organism/PcFooter"; // PC 푸터

import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="flex-row items-center justify-center">
      <div className="md:hidden">
        <MMenuBar />
      </div>
      <div className="hidden md:block">
        <PcNavBar />
      </div>
      <div className="flex flex-col items-center mx-10 mb-10 ">
        <Outlet />
      </div>
      <div className="h-20" />
      <div className="md:hidden">
        <MNavBar />
      </div>
      <div className="hidden md:block">
        <PcFooter />
      </div>
    </div>
  );
};

export default Layout;