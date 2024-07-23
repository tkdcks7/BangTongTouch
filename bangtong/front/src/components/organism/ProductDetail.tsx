import React from "react";
import { Params, useParams } from "react-router-dom";

// 데이터
import { products } from "../../data";

// 컴포넌트
import ImgCarousel from "../molecules/ImgCarousel";
import Devider from "../atoms/Devider";
import ProductProfile from "../molecules/ProductProfile";
import ProductOptions from "../molecules/ProductOptions";
import ProductAdditionalOptions from "../molecules/ProductAdditionalOptions";
import LocationAround from "../molecules/LocationAround";

const ProductDetail: React.FC = () => {

  let {id} = useParams<{id: string}>(); // 상품 번호

  // id가 undefined인 경우
  if (id === undefined) {
    return <p>잘못된 접근입니다.</p>;
  }

  // productId가 id인 게시글 찾기
  const product = products.find(obj => obj.data.productId === parseInt(id as string, 10))

  // 계약 시작일의 년도, 월 찾기
  const startDate = product?.data?.productStartDate;

  // 계약 종료일의 년도, 월 찾기
  const endDate = product?.data?.productEndDate;

  let startYear = 0
  let startMonth = 0
  let startDay = 0

  let endYear = 0
  let endMonth = 0
  let endDay = 0

  if (startDate) {
    const startParts = startDate.split("-")

    startYear = parseInt(startParts[0]);
    startMonth = parseInt(startParts[1]);
    startDay = parseInt(startParts[2]);
  } else {
    console.log("startDate is undefined");
  }

  if (endDate) {
    const endParts = endDate.split("-")

    endYear = parseInt(endParts[0]);
    endMonth = parseInt(endParts[1]);
    endDay = parseInt(endParts[2]);
  } else {
    console.log("endDate is undefined");
  }

  let remainPeriod = endMonth - startMonth;

  // 남은 계약기간 추출
  if (endYear - startYear > 0) {
    remainPeriod += 12 * (endYear - startYear)
  }
  
  // 비트마스킹된 기본옵션들 뽑아오기
  const options = product?.data.productOption as string

  // 문자열 리스트로 들어오는 추가옵션 받아오기
  const additionalOption = product?.data.productAdditionalOption

  return (
    <div>
      <div className="mt-10">
        <ImgCarousel />
        {/* 유저 프로필, 연락하기 */}
        <ProductProfile />
        <p className="mt-2">간단한 설명 (유저 입력)</p>
        {/* 구분선 */}
        <Devider />
        {/* 기본정보 */}
        <div id="basicInformation">
          <h2 className="text-2xl font-black">기본정보</h2>
          <div className="mt-5">
            <div className="flex justify-between font-bold border-b-2 border-gray mb-2">
              <p>월세</p>
              <p>{`${product?.data.productDeposit} / ${product?.data.productRent}`}</p>
            </div>
            <div className="flex justify-between font-bold border-b-2 border-gray mb-2">
              <p>관리비</p>
              <p>{`${product?.data.productMaintenance}`}</p>
            </div>
            <div className="flex justify-between font-bold border-b-2 border-gray mb-2">
              <p>승계 기간 (남은 계약기간)</p>
              <p>{`${remainPeriod}개월`}</p>
            </div>
            <div className="flex justify-between font-bold border-b-2 border-gray mb-2">
              <p>입주 가능일</p>
              <p>{`${startYear}년 ${startMonth}월 ${startDay}일`}</p>
            </div>
            <div className="flex justify-between font-bold border-b-2 border-gray mb-2">
              <p>계약 종료일</p>
              <p>{`${endYear}년 ${endMonth}월 ${endDay}일`}</p>
            </div>
          </div>
        </div>
        {/* 구분선 */}
        <Devider />
        {/* 옵션 */}
        <ProductOptions 
          options={options}
        />
        {/* 구분선 */}
        <Devider />
        {/* 추가옵션 */}
        <ProductAdditionalOptions 
          additionalOptions={additionalOption as Array<string>}
        />
        {/* 구분선 */}
        <Devider />
        <LocationAround />
      </div>
    </div>
  )
};

export default ProductDetail;