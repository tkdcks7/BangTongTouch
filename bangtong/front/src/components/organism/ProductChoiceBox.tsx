import React from "react";

interface IProductChoiceBoxProps {
  children?: React.ReactNode;
}

const ProductChoiceBox: React.FC<IProductChoiceBoxProps> = ({ children }) => {
  return <div className={"size-48 rounded-2xl shadow-lg"}>{children}</div>;
};

export default ProductChoiceBox;
