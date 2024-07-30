import React from "react";

// 컴포넌트
import ProductMap from "../molecules/ProductMap";
import InputBox from "../molecules/InputBox";
import FilterBox from "./FilterBox";

const ProductMapBox: React.FC = () => {
  return (
    <div className="mt-5 md:w-2/5">
      <div className="md:hidden">
        <InputBox placeholder="주소 검색" buttonType="search" width={"auto"} />
      </div>
      <div className="mt-5">
        <ProductMap />
      </div>
    </div>
  );
};

export default ProductMapBox;
