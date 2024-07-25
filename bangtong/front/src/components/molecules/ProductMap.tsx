import React, { useEffect, useState } from "react";
import SearchMap from "./SearchMap";

interface Pos {
  lat: number;
  lng: number;
}

const ProductMap: React.FC = () => {
  const [positionLoaded, setPositionLoaded] = useState<boolean>(false);
  const [basePosition, setBasePosition] = useState<Pos>({ lat: 0, lng: 0 });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setBasePosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setPositionLoaded(true);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  return (
    <div>
      {positionLoaded ? (
        <SearchMap basePos={basePosition} flag={false} />
      ) : null}
    </div>
  );
};

export default ProductMap;
