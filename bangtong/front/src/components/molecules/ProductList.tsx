import React from "react";

// 데이터
import { products } from "../../data";

// 컴포넌트
import ImgBox from "../atoms/ImgBox";

// 이미지 소스
import Room1 from "../../assets/Room1.jpg"

const ProductList: React.FC = () => {

  const roomType: { [key: string]: string } =  {
    'ONEROOM' : '원룸',
    'TWOROOM' : '투룸',
    'OPISTEL' : '오피스텔',
    'VILLA' : '빌라',
    'APART' : '아파트'
  }


  return (
    <div>
      <div>
        {products.map((item) => 
          <ImgBox
            key={item.data.productId}
            id={item.data.productId}
            title={`${roomType[item.data.productType]} ${item.data.productDeposit} / ${item.data.productRent}`}
            info={item.data.productMaintenanceInfo}
            src={Room1}
          />
        )}
      </div>
    </div>
  )
};

export default ProductList;