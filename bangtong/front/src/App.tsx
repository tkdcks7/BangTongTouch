import React from "react";
import Router from "./router";

const App: React.FC = () => {
  const [dark, setDark] = React.useState(false);
  const toggleDark = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="dark:bg-black dark:text-white">
      <button onClick={() => toggleDark()}>dark</button>
      <Router />
    </div>
  );
};

export default App;
