import React, { useState, useEffect } from "react";

// 컴포넌트
import ProductMap from "./ProductMap";

// 데이터
import { products } from "../../data";

// 이미지 소스
import MapExample from "../../assets/MapExample.png";
import SearchMap from "./SearchMap";

interface Pos {
  lat: number;
  lng: number;
}

const LocationAround: React.FC = () => {
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  const [basePosition, setBasePosition] = useState<Pos>({ lat: 0, lng: 0 });
  useEffect(() => {
    setBasePosition({ lat: 37.5, lng: 127 });
    setIsDataLoaded(true);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-black">주변 편의시설</h1>
      <div className="mt-5">
        {isDataLoaded ? (
          <SearchMap
            flag={true}
            basePos={basePosition}
            cssClasses="rounded-xl"
          />
        ) : null}
      </div>
    </div>
  );
};

export default LocationAround;
