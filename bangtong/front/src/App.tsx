import React from "react";
import Router from "./router";
import VideoChatPage from "./components/page/VideoChatPage";

const App: React.FC = () => {
  return (
    <div>
      <VideoChatPage />
      <Router />
    </div>
  );
};

export default App;
