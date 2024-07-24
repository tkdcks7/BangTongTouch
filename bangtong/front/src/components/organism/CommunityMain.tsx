import React from "react";

// 컴포넌트
import MultiBtn from "../molecules/MultiBtn";
import ContentTable from "../molecules/ContentTable";
import InputBox from "../molecules/InputBox";
import IconBtn from "../atoms/IconBtn";
import ImgBox from "../atoms/ImgBox";

// 이미지 소스
import Pencil from "../../assets/Pencil.png"
import { Link } from "react-router-dom";

const CommunityMain: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-5 w-full">
        <InputBox 
          placeholder="게시글 검색"
          buttonType="search"
          width="100%"
          height="100%"
        />
      </div>
      <div className="my-5">
        <MultiBtn />
      </div>
      <ContentTable />
      <div className="w-full p-2 mt-5 flex justify-end">
        <Link 
          className="bg-yellow-300 p-2 rounded-xl"
          to={'write'}
        >
          <IconBtn 
            imgSrc={Pencil}
            size={30}
          />
        </Link>
      </div>
    </div> 
  )
};

export default CommunityMain;