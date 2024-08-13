import React from "react";
import { Outlet } from "react-router-dom";

const ChattingPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-lvh w-80"></div>
      <Outlet />
    </div>
  );
};

export default ChattingPage;
