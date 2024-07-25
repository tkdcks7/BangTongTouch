import React from "react";

// 컴포넌트
import InputBox from "../molecules/InputBox";
import DropDown from "./DropDown";

const ProfileEdit: React.FC = () => {

  return (
    <div className="border border-black p-10 rounded-xl mt-5">
      <InputBox
        placeholder="새 비밀번호"
        buttonType="cancel"
        width={"auto"}
      />
      <InputBox
        placeholder="새 비밀번호 확인"
        buttonType="cancel"
        width={"auto"}
      />
      <InputBox
        placeholder="휴대폰 번호 수정"
        buttonType="cancel"
        width={"auto"}
      />
      <div className="flex items-center justify-between">
        <DropDown />
        <InputBox
          placeholder="휴대폰 번호"
          buttonType="cancel"
          width={"auto"}
        />
      </div>
      <div className="flex text-nowrap items-center">
        <InputBox 
          placeholder="인증번호 입력"
          width={"auto"}
        />
        <button className="bg-lime-500 h-10 px-4 rounded-full text-white ms-10">확인</button>
      </div>
      <div className="text-center mt-3">
        <button className="bg-lime-500 text-white py-2 w-60 rounded-full">수정 완료</button>
      </div>
    </div>
  )
}

export default ProfileEdit;