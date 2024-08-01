import React from "react";

// 컴포넌트
import ProductMap from "../molecules/ProductMap";
import InputBox from "../molecules/InputBox";
import FilterBox from "../molecules/FilterBox";

const ProductMapBox: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="hidden lg:block">
        <FilterBox />
      </div>
      <div className="mt-5 w-4/5 lg:w-2/5">
        <div className="lg:hidden">
          <InputBox
            placeholder="주소 검색"
            buttonType="search"
            width={"auto"}
          />
        </div>
        <div className="mt-5">
          <ProductMap />
        </div>
      </div>
    </div>
  );
};

export default ProductMapBox;
