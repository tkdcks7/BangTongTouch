import React, { useEffect, useState } from "react";
import SearchMap from "./SearchMap";
import { Button, ConfigProvider, Modal } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import FilterBox from "./FilterBox";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // ant design 글로벌 디자인 토큰
  const theme = {
    token: {
      colorBgTextHover: "#E9FFE7",
      colorPrimary: "#129B07",
      colorPrimaryBorder: "#129B07",
    },
  };

  return (
    <div>
      {positionLoaded ? (
        <div>
          <div className="lg:hidden relative">
            <SearchMap
              basePos={basePosition}
              flag={false}
              width="350px"
              height="500px"
            />
            <ConfigProvider theme={theme}>
              <Button
                type="primary"
                className="w-10 h-10 absolute bottom-5 right-5 shadow-lg"
                onClick={() => setIsModalOpen(true)}
              >
                <FilterOutlined />
              </Button>
              <Modal
                title="매물 필터"
                open={isModalOpen}
                footer=""
                width={350}
                onCancel={() => setIsModalOpen(false)}
                className="flex justify-center"
              >
                <FilterBox />
              </Modal>
            </ConfigProvider>
          </div>
          <div className="hidden lg:block">
            <SearchMap basePos={basePosition} flag={false} height="800px" />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductMap;
