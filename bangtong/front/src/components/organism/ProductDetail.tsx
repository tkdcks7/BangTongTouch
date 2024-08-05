import React, { useEffect, useRef, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useUserStore from "../../store/userStore";

// 컴포넌트
import ImgCarousel from "../molecules/ImgCarousel";
import Devider from "../atoms/Devider";
import ProductProfile from "../molecules/ProductProfile";
import ProductOptions from "../molecules/ProductOptions";
import ProductAdditionalOptions from "../molecules/ProductAdditionalOptions";
import LocationAround from "../molecules/LocationAround";

const ProductDetail: React.FC = () => {
  // 기본값 선언
  const tempObj = {
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
    productAdditionalOption: [],
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
  };
  let { id }: any = useParams(); // 상품 번호
  const navigate = useNavigate();
  const userId: number = useUserStore().id;

  // 로딩과 에러를 처리하는 state
  const [loading, setLoading] = useState(true);
  const [connectionFailed, setConnectionFailed] = useState(false);

  // state와 초기값 선언. 나중에 null, 0 혹은 빈 문자열로 바꿀거임.
  const [productInfo, setProductInfo] = useState(tempObj);

  // 백엔드에서 상세 페이지 정보 받아오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: `${process.env.BACKEND_URL}/products/${id}`,
          headers: {},
        });
        // status code가 200번으로 유지돼서 설정했는데, 이후 변경할 것.
        if (response.config.data) {
          setProductInfo(response.data);
        } else {
          setConnectionFailed(true);
          // navigate("/products");
        }
      } catch (err) {
        console.log(err);
        setConnectionFailed(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // 수정 페이지(작성 페이지에서 기본값이 다 설정된 페이지?)로 이동
  // Dto 때문에 userId를 비교하는 로직을 작성 못함.
  // const handleToUpdate = (): void => {
  //   if (productInfo.userId === userId) {
  //     navigate(`/products/update/${id}`)
  //   }
  // }

  // 매물 게시글 삭제 함수
  // const handleDelete = (): void => {
  //   if (productInfo.userId === userId) {
  //     axios({
  //       method: "DELETE",
  //       url: `${process.env.BACKEND_URL}/products/delete/${id}`,
  //       headers: {},
  //     })
  //       .then((response) => {
  //         console.log(response);
  //         navigate("/product");  // 삭제 후 페이지 이동
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  // 관심 매물 등록(좋아요). 관심매물 좋아요 상태도 같이 보내줄 것.
  const handleLike = (): void => {
    axios({
      method: "POST",
      url: `${process.env.BACKEND_URL}/interests/add`,
      headers: {},
    }).then((response) => {
      if ("등록여부") {
        console.log("관심 매물로 등록/취소됐습니다.");
      }
      console.log("관심 매물로 등록/취소됐습니다.");
    });
  };

  // 일자를 파싱하는 함수
  const timeParser = (time: string): number[] => {
    if (!time) {
      return [0, 0, 0];
    }
    return time.split("-").map((el) => Number(el));
  };

  // 계약일, 계약종료일을 연월일로 반환
  const [startYear, startMonth, startDay] = timeParser(
    productInfo.productStartDate
  );
  const [endYear, endMonth, endDay] = timeParser(productInfo.productEndDate);

  const remainMonth = (endYear - startYear) * 12 + (endMonth - startMonth);

  // 비트마스킹된 기본옵션들 뽑아오기
  const options: string = productInfo.productOption || "";

  // 문자열 리스트로 들어오는 추가옵션 받아오기
  const additionalOption: string[] = productInfo.productAdditionalOption || [];

  if (loading) return <div>Loading...</div>;
  // if (connectionFailed) return <div>데이터를 불러오는 데 실패했습니다.</div>;

  return (
    <div>
      <div className="mt-10 w-full md:w-2/5 mx-auto">
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
        <div className="h-20" />
      </div>
    </div>
  );
};

export default ProductDetail;
