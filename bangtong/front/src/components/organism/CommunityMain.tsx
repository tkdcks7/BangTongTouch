import React from "react";

// 컴포넌트
import MultiBtn from "../molecules/MultiBtn";
import ContentTable from "../molecules/ContentTable";
import InputBox from "../molecules/InputBox";

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
    </div> 
  )
};

export default CommunityMain;