import React from "react";

// 컴포넌트
import InputBox from "../molecules/InputBox";
import { ConfigProvider, Input } from "antd";

const ProfilePwConfirm: React.FC = () => {
  // ant design 글로벌 디자인 토큰
  const theme = {
    token: {
      colorBgTextHover: "#E9FFE7",
      colorPrimary: "#129B07",
      colorPrimaryBorder: "#129B07",
    },
  };

  return (
    <form className="mt-10">
      <p className="mb-5 text-gray-500 dark:text-white">비밀번호 확인</p>
      <ConfigProvider theme={theme}>
        <Input.Password
          placeholder="비밀번호"
          allowClear
          className="rounded-full"
          size="large"
        />
      </ConfigProvider>
      <div className="text-end">
        <button className="bg-lime-500 py-1 px-4 mt-5 rounded-full text-white">
          확인
        </button>
      </div>
    </form>
  );
};

export default ProfilePwConfirm;
