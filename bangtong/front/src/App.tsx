import React from "react";
import Router from "./router";

const App: React.FC = () => {
  return (
    <div className="dark:bg-gray-800 dark:text-white">
      <Router />
    </div>
  );
};

export default App;
