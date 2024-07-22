import React from "react";
import { Params, useParams } from "react-router-dom";

// 데이터
import { products } from "../../data";

// 컴포넌트
import ImgBox from "../atoms/ImgBox";
import ImgCarousel from "../molecules/ImgCarousel";
import TextBox from "../atoms/TextBox";

// 이미지 소스
import defaultprofile from "../../assets/defaultprofile.jpg"

const ProductDetail: React.FC = () => {

  let {id} = useParams<{id: string}>(); // 상품 번호

  // id가 undefined인 경우
  if (id === undefined) {
    return <p>잘못된 접근입니다.</p>;
  }

  // productId가 id인 게시글 찾기
  const product = products.find(obj => obj.data.productId === parseInt(id as string, 10))

  return (
    <div>
      <div className="mt-10">
        <ImgCarousel />
        <div className="flex justify-between mt-5">
          <img src={defaultprofile} alt="유저 프로필" className="w-10 rounded-full"/>
        </div>
      </div>
    </div>
  )
};

export default ProductDetail;