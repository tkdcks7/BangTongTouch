import React, { useState } from "react";
import SearchBar from "../molecules/SearchBar";

const TestPage: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  return (
    <SearchBar
      placeholder="검색바"
      size="large"
      type="password"
      width={400}
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
};

export default TestPage;
