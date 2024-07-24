import React from "react";
import { Link } from "react-router-dom";

// 데이터
import { products } from "../../data";

// 컴포넌트
import ImgBox from "../atoms/ImgBox";
import IconBtn from "../atoms/IconBtn";

// 이미지 소스
import Room1 from "../../assets/Room1.jpg"
import Pencil from "../../assets/Pencil.png"

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
      <div className="w-full p-2 mt-5 flex justify-end">
        <Link 
          className="bg-yellow-300 p-2 rounded-xl"
          to={'upload'}
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

export default ProductList;