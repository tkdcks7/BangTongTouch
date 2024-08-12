import React from "react";
import ProductSearchButton from "../atoms/ProductSearchButton";
import ProductSearchChip from "../atoms/ProductSearchChip";
import { DatePicker } from "antd";

interface IProductSearch1Props {
  onNext: () => void;
}

const ProductSearch1: React.FC<IProductSearch1Props> = ({ onNext }) => {
  return (
    <div className="text-center">
      <h2 className={"text-xl mb-8"}>
        1. 집에 들어가는 날과 나가는 날을 선택해 주세요.
      </h2>

      <div>
        <div className={"flex flex-row gap-3 mb-2"}>
          <ProductSearchChip
            text={"들어가는 날"}
            backgroundColor={"bg-green-color"}
            color={"text-white"}
          />
          <DatePicker
            className={"text-xl grow placeholder:text-xl rounded-full px-4"}
            placeholder={"YYYY-MM-DD"}
          />
        </div>

        <div className={"flex flex-row gap-3 mb-8"}>
          <ProductSearchChip
            text={"나가는 날"}
            backgroundColor={"bg-green-color"}
            color={"text-white"}
          />
          <DatePicker
            className={"text-xl grow placeholder:text-xl rounded-full px-4"}
            placeholder={"YYYY-MM-DD"}
          />
        </div>
      </div>

      <ProductSearchButton
        color={"text-green-color"}
        borderColor={"border-green-color"}
        text={"다음"}
        hoverBackgroundColor={"bg-green-color"}
        hoverColor={"text-white"}
        onClick={onNext}
      />
    </div>
  );
};

export default ProductSearch1;
