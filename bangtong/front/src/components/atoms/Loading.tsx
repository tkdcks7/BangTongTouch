import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loading: React.FC = () => {
  return (
    <>
      <Spin indicator={<LoadingOutlined />} size="large" fullscreen />
    </>
  );
};

export default Loading;
