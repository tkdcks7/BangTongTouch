import React from "react";
import ProductSearchButton from "../atoms/ProductSearchButton";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface IProductSearch2Props {
  onPrev: () => void;
  onNext: () => void;
}

const ProductSearch2: React.FC<IProductSearch2Props> = ({ onPrev, onNext }) => {
  return (
    <div className="text-center">
      <h2 className={"text-xl mb-8"}>2. 어디에 살고 싶은지 말해 주세요.</h2>

      <Input
        placeholder={"주소 검색"}
        suffix={<SearchOutlined />}
        className="rounded-full mb-8 px-4 focus:border-green-color hover:border-green-color"
      />

      <div className={"flex flex-row gap-3 text-center justify-center"}>
        <ProductSearchButton
          color={"text-green-color"}
          borderColor={"border-green-color"}
          text={"이전"}
          hoverBackgroundColor={"bg-green-color"}
          hoverColor={"text-white"}
          onClick={onPrev}
        />
        <ProductSearchButton
          color={"text-green-color"}
          borderColor={"border-green-color"}
          text={"다음"}
          hoverBackgroundColor={"bg-green-color"}
          hoverColor={"text-white"}
          onClick={onNext}
        />
      </div>
    </div>
  );
};

export default ProductSearch2;
