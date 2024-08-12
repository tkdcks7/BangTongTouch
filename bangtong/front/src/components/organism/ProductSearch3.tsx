import React from "react";
import ProductSearchButton from "../atoms/ProductSearchButton";
import TextBtn from "../atoms/TextBtn";
import BtnGroup from "../molecules/BtnGroup";

interface IProductSearch3Props {
  onPrev: () => void;
}

// type
const homeCategory: string[] = ["원룸", "투룸+", "오피스텔", "빌라", "아파트"];

// 영어 type(변환해야함.)
const homeCategoryEnglish: string[] = [
  "ONEROOM",
  "OFFICE",
  "TWOROOM",
  "VILLA",
  "APARTMENT",
];

// infra
const facilities: string[] = [
  "경찰서",
  "마트",
  "버스 정류장",
  "병원/약국",
  "지하철 역",
  "카페",
  "코인 세탁소",
  "편의점",
];

const ProductSearch3: React.FC<IProductSearch3Props> = ({ onPrev }) => {
  return (
    <div className="text-center">
      <h2 className={"text-xl mb-8"}>3. 맞춤 검색 조건을 설정해 주세요.</h2>

      <div className={"mb-8"}>
        <TextBtn title="보증금" text={"선택"} />
        <TextBtn title="월세 (관리비 포함)" text={`선택`} />
        <BtnGroup title="집 유형" itemsArray={homeCategory} />
        <BtnGroup title="편의시설" itemsArray={facilities} />
      </div>

      <ProductSearchButton
        color={"text-green-color"}
        borderColor={"border-green-color"}
        text={"이전"}
        hoverBackgroundColor={"bg-green-color"}
        hoverColor={"text-white"}
        onClick={onPrev}
      />
    </div>
  );
};

export default ProductSearch3;
