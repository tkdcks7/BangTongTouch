import React from "react";
import { Link } from "react-router-dom";

// 컴포넌트
import TextBox from "../atoms/TextBox";

// 아이콘
import { UserAddOutlined } from "@ant-design/icons";

const ToSignup: React.FC = () => {
  return (
    <div className="p-5 border border-gray-300 flex flex-col items-center mt-5">
      <UserAddOutlined className="text-3xl" />
      <div className="pt-4 mx-auto text-center">
        <TextBox text="방통터치에 가입하면" size="xl" />
        <TextBox text="많은 소식을 받아 볼 수 있어요!" size="xl" />
      </div>
      <Link
        to={"/user/register"}
        className="p-2 px-6 border-2 border-lime-500 rounded-full text-lime-500 font-bold mt-5"
      >
        회원가입
      </Link>
    </div>
  );
};

export default ToSignup;
