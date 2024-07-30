import React from "react";
import Router from "./router";
import VideoChat from "./components/page/VideoChat";

const App: React.FC = () => {
  return (
    <div>
      <VideoChat roomId="test-1" />
      <Router />
    </div>
  );
};

export default App;
