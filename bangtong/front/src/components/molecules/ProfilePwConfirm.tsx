import React from "react";

// 컴포넌트
import InputBox from "../molecules/InputBox";

const ProfilePwConfirm: React.FC = () => {
  return (
    <form className="mt-10">
      <p className="mb-5 text-gray-500 dark:text-white">비밀번호 확인</p>
      <InputBox placeholder="비밀번호" buttonType="cancel" width={"auto"} />
      <div className="text-end">
        <button className="bg-lime-500 py-1 px-4 mt-5 rounded-full text-white">
          확인
        </button>
      </div>
    </form>
  );
};

export default ProfilePwConfirm;
