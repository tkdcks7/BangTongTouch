import React, { useEffect, useState } from "react";
import SearchMap from "./SearchMap";

interface Pos {
  lat: number;
  lng: number;
}

interface MapProps {
  height?: string;
}

const ProductMap: React.FC<MapProps> = ({ height }) => {
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
        <div>
          <div className="hidden md:block">
            <SearchMap basePos={basePosition} flag={false} height="100vh" />
          </div>
          <div className="md:hidden">
            <SearchMap
              basePos={basePosition}
              flag={false}
              width="85vw"
              height="60vh"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductMap;
