import React, { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// 컴포넌트 불러오기
import IconBtn from "../atoms/IconBtn";
import Btn from "../atoms/Btn";

// 이미지 소스
import Bell from "../../assets/Bell.png";
import Logo from "../../assets/Logo.png";

// Store
import useUserStore from "../../store/userStore";

const PcNavBar: React.FC = () => {
  const { id } = useUserStore();
  const navigate = useNavigate();

  // login 페이지로 이동하는 함수
  const handleLogInBtnClick = (e: any) => {
    navigate("/user/login");
  };

  // logout 실행 함수
  const handleLogOutBtnClick = (e: any) => {
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_BACKEND_URL}/users/logout`,
      headers: {},
    })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex justify-between w-full bg-white p-5 mb-10">
      <Link to="/" className="text-start">
        <img src={Logo} alt="로고" width={150} />
      </Link>
      <div className="flex items-center justify-between">
        <NavLink
          className={({ isActive }) =>
            "text-lg mx-3 text-nowrap " +
            (isActive ? "text-black" : "text-gray-400")
          }
          to="/products"
        >
          방통터치
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            "text-lg mx-3 text-nowrap " +
            (isActive ? "text-black" : "text-gray-400")
          }
          to="/chats"
        >
          채팅
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            "text-lg mx-3 text-nowrap " +
            (isActive ? "text-black" : "text-gray-400")
          }
          to="/profile"
        >
          마이방통
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            "text-lg mx-3 text-nowrap " +
            (isActive ? "text-black" : "text-gray-400")
          }
          to="/boards"
        >
          신통방톡
        </NavLink>
        <div className="mx-7">
          <IconBtn imgSrc={Bell} size={30} />
        </div>

        {/* 로그인 되면 로그아웃 버튼이 뜨도록 */}
        <div className="mx-1">
          {id ? (
            <Btn
              text="로그아웃"
              backgroundColor="red-400"
              onClick={handleLogOutBtnClick}
            />
          ) : (
            <Btn
              text="로그인"
              backgroundColor="yellow-300"
              onClick={handleLogInBtnClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PcNavBar;
