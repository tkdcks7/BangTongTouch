import React from "react";
import ProductChoiceBox from "../organism/ProductChoiceBox";
import { EditOutlined, FileSearchOutlined } from "@ant-design/icons";

const ProductChoicePage: React.FC = () => {
  return (
    <div className="flex flex-row flex-wrap w-full h-full">
      <ProductChoiceBox children={<EditOutlined />} />
      <ProductChoiceBox children={<FileSearchOutlined />} />
    </div>
  );
};

export default ProductChoicePage;
