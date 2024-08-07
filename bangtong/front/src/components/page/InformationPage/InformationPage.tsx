import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// 컴포넌트
import Btn from "../../atoms/Btn";

// css 스타일
import "./InformationPage.css";

// 이미지 소스
import homeImg from "../../../assets/homeImg.png";
import BlackLogo from "../../../assets/BlackLogo.png";

const InformationPage: React.FC = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const navigate = useNavigate();

  useEffect(() => {
    const animation = animate(count, 100, { duration: 10 });

    return animation.stop;
  }, []);

  // signup 페이지로 이동하는 함수
  const handleSignUpBtnClick = (e: any) => {
    navigate("/user/register");
  };

  // login 페이지로 이동하는 함수
  const handleLogInBtnClick = (e: any) => {
    navigate("/user/login");
  };

  return (
    <main className="h-lvh w-lvw" id="back-ground">
      <div className="flex justify-between items-center w-full h-20 px-5 hidden md:flex fixed top-0 left-0">
        <Link to="/" className="text-start">
          <img src={BlackLogo} alt="로고" className="w-40" />
        </Link>
        <div className="flex">
          <div className="me-3">
            <Btn
              text="로그인"
              backgroundColor="bg-lime-500"
              onClick={handleLogInBtnClick}
            />
          </div>
          <div>
            <Btn
              text="회원가입"
              backgroundColor="bg-yellow-200"
              onClick={handleSignUpBtnClick}
            />
          </div>
        </div>
      </div>
      <h1 id="main-text">
        간편한 승계생활, <span className="green">방통터치</span>와 함께
        시작하세요.
      </h1>
      <div className="flex items-center" id="sub-text">
        <h2 className="me-3">
          현재 방통터치에는
          <motion.span id="count">{rounded}</motion.span>
          개의 매물이 등록되어 있습니다.
        </h2>
      </div>
    </main>
  );
};

export default InformationPage;
