import React from "react"

// 컴포넌트
import Btn from "../atoms/Btn";

// 이미지 소스
import defaultprofile from "../../assets/defaultprofile.jpg"

const ProductProfile: React.FC = () => {
  return (
    <div className="flex justify-between items-center mt-5">
      <img src={defaultprofile} alt="유저 프로필" className="w-10 rounded-full"/>
      {/* 유저 닉네임 받아오도록 조치 (현재 데이터 내 유저 정보가 없어서 미작성) */}
      <h2 className="text-xl font-bold">
        유저 닉네임 
      </h2>
      <Btn
        text="연락하기"
        width="w-20"
        textSize="text-sm"
        backgroundColor="yellow-300"
      />
    </div>
  )
}

export default ProductProfile;