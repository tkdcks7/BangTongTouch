import React, { useEffect, useRef, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// 컴포넌트
import ImgCarousel from "../molecules/ImgCarousel";
import Devider from "../atoms/Devider";
import ProductProfile from "../molecules/ProductProfile";
import ProductOptions from "../molecules/ProductOptions";
import ProductAdditionalOptions from "../molecules/ProductAdditionalOptions";
import LocationAround from "../molecules/LocationAround";

const ProductDetail: React.FC = () => {
  let { id }: any = useParams(); // 상품 번호
  const [productInfo, setProductInfo] = useState({
    productId: 1,
    productType: "ONEROOM",
    productAddress: "147-51",
    productDeposit: 10,
    productRent: 2000,
    productMaintenance: 5,
    productMaintenanceInfo: "수도세 포함, 전기세 미포함",
    productIsRentSupportable: true,
    productIsFurnitureSupportable: true,
    productSquare: 44.55,
    productRoom: 2,
    productOption: "1111111",
    productAdditionalOption: [
      "원하시는 추가 옵션이 있다면 문의 부탁드립니다.",
      "없으면 주지마세요",
    ],
    productIsBanned: false,
    productIsDeleted: false,
    productPostDate: "2024-07-19 04:01:15.256",
    productStartDate: "2024-08-01",
    productEndDate: "2024-12-30",
    boardRegion: {
      regionId: "1111010900",
      regionSido: "서울특별시",
      regionGugun: "종로구",
      regionDong: "누상동",
    },
  });

  const navigate = useNavigate();

  // 백엔드에서 상세 페이지 정보 받아오기
  useEffect(() => {
    if (id !== undefined && !isNaN(id)) {
      axios({
        method: "GET",
        url: `http://127.0.0.1:8080/products/${id}`,
        headers: {},
      })
        .then((response) => {
          setProductInfo({ ...response.data });
        })
        .catch((err) => console.log("Detail page 호출 실패", err));
    } else {
      navigate("/products");
    }
  }, []);

  // 일자를 파싱하는 함수
  const timeParser = (time: string): number[] => {
    return time.split("-").map((el) => Number(el));
  };

  // 계약일, 계약종료일을 연월일로 반환
  const [startYear, startMonth, startDay] = timeParser(
    productInfo.productStartDate
  );
  const [endYear, endMonth, endDay] = timeParser(productInfo.productEndDate);

  const remainMonth = (endYear - startYear) * 12 + (endMonth - startMonth);

  // 비트마스킹된 기본옵션들 뽑아오기
  const options: string = productInfo.productOption;

  // 문자열 리스트로 들어오는 추가옵션 받아오기
  const additionalOption: string[] = productInfo.productAdditionalOption;

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
              <p>월세 / 보증금 (만)</p>
              <p>{`${productInfo.productDeposit} / ${productInfo.productRent}`}</p>
            </div>
            <div className="flex justify-between font-bold border-b-2 border-gray mb-2">
              <p>관리비 (만)</p>
              <p>{`${productInfo.productMaintenance}`}</p>
            </div>
            <div className="flex justify-between font-bold border-b-2 border-gray mb-2">
              <p>승계 기간 (남은 계약기간)</p>
              <p>{`${remainMonth}개월`}</p>
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
        <ProductOptions options={options} />
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
  );
};

export default ProductDetail;
