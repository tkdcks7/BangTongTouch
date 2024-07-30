import React from "react";

// 컴포넌트
import TextBtn from "../atoms/TextBtn";
import BtnGroup from "../molecules/BtnGroup";

// 이모티콘
import { SearchOutlined } from "@ant-design/icons";

const FilterBox: React.FC = () => {
  const homeCategory: Array<string> = [
    "원룸",
    "투룸+",
    "오피스텔",
    "빌라",
    "아파트",
  ];

  const facilities: Array<string> = [
    "경찰서",
    "마트",
    "버스 정류장",
    "병원/약국",
    "지하철 역",
    "카페",
    "코인 세탁소",
    "편의점",
  ];

  const supportMenu: Array<string> = ["월세 지원", "가구도 승계"];

  return (
    <form className="w-80 px-5 py-10 border border-2 rounded-xl mr-5 shadow-md">
      <button className="w-full bg-lime-500 text-white p-2 rounded-full">
        경상북도 구미시 진평동
      </button>
      <TextBtn title="보증금" text="100만~300만" />
      <TextBtn title="월세 (관리비 포함)" text="20만~50만" />
      <BtnGroup title="집 유형" itemsArray={homeCategory} />
      <BtnGroup title="편의시설" itemsArray={facilities} />
      <BtnGroup title="지원 여부" itemsArray={supportMenu} />
      <div className="text-end mr-2">
        <button className="mt-5 p-2 bg-lime-500 w-14 h-14 rounded-xl text-2xl text-center text-white shadow-lg">
          <SearchOutlined className="my-auto mx-auto" />
        </button>
      </div>
    </form>
  );
};

export default FilterBox;
