import React from "react";
import { Outlet } from "react-router-dom";

const ChattingPage: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ChattingPage;
