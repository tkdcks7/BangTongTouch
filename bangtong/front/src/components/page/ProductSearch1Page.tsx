import React from "react";
import ProductSearchSideBar from "../molecules/ProductSearchSideBar";
import { Modal } from "antd";

const ProductSearch1Page: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Modal open={isOpen} className="bg-white h-screen">
      <ProductSearchSideBar />
    </Modal>
  );
};

export default ProductSearch1Page;
