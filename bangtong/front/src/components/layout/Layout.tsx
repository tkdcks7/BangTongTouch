import React from "react";

// 컴포넌트
import MMenuBar from "../organism/MMenuBar"; // 모바일 메뉴바 (알림, 햄버거버튼)
import MNavBar from "../organism/MNavBar"; // 모바일 네비게이션바
import PcNavBar from "../organism/PcNavBar"; // PC 네비게이션바
import PcFooter from "../organism/PcFooter"; // PC 푸터

// 비 로그인 시 보여줄 페이지
import InformationPage from "../page/InformationPage/InformationPage";

import { Outlet } from "react-router-dom";

// 데이터
import useUserStore from "../../store/userStore";

const Layout: React.FC = () => {
  const { id } = useUserStore();

  return (
    <>
      {id ? (
        <div className="flex flex-col min-h-screen">
          <div className="md:hidden">
            <MMenuBar />
          </div>
          <div className="hidden md:block">
            <PcNavBar />
          </div>
          <div className="flex flex-1 flex-col items-center mx-10 mb-10">
            <Outlet />
          </div>
          <div className="md:hidden">
            <MNavBar />
          </div>
          <div className="hidden md:block">
            <PcFooter />
          </div>
        </div>
      ) : (
        <InformationPage />
      )}
    </>
  );
};

export default Layout;
