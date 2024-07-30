import { useEffect, useState } from "react";
import SearchMap from "../molecules/SearchMap";

interface Pos {
  lat: number;
  lng: number;
}

const MapTestPage: React.FC = () => {
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
    <div className="w-full">
      {positionLoaded ? (
        <SearchMap basePos={basePosition} flag={false} />
      ) : null}
    </div>
  );
};

export default MapTestPage;
