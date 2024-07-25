import React from "react";

// 컴포넌트
import ProductMap from "../molecules/ProductMap";
import InputBox from "../molecules/InputBox";

const ProductMapBox: React.FC = () => {
  return (
    <div className="mx-auto mt-5">
      <InputBox placeholder="주소 검색" buttonType="search" width={"auto"} />
      <div className="mt-5">
        <ProductMap />
      </div>
    </div>
  );
};

export default ProductMapBox;
