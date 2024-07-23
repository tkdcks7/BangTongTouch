import React from "react";

// 이미지 소스
import MapExample from '../../assets/MapExample.png'

const LocationAround: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-black">주변 편의시설</h1>
      <img src={MapExample} alt="지도" className="mt-5 w-full rounded-xl" />
    </div>
  )
}

export default LocationAround;