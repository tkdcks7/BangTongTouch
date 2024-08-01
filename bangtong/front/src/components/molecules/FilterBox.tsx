import React, { useState } from "react";
import axios from "axios";

// 컴포넌트
import TextBtn from "../atoms/TextBtn";
import BtnGroup from "../molecules/BtnGroup";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { ConfigProvider, Modal } from "antd";

// 이모티콘
import { SearchOutlined } from "@ant-design/icons";
import { MapPinIcon } from "@heroicons/react/20/solid";

const FilterBox: React.FC = () => {
  const [location, setLocation] = useState({ regionId: "", regionSido: "" });
  const [open, setOpen] = useState(false); // 지역 선택 모달
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [regions, setRegions] = useState([]);
  const [rentalCost, setRentalCost] = useState([0, 0]); // 월세
  const [depositCost, setDepositCost] = useState([0, 0]); // 보증금
  const [rentSupportable, setRentSupportable] = useState(false); // 월세 지원 여부
  const [funitureSupportable, setFunitureSupportable] = useState(false); // 가구 승계 여부

  const showRegionModal = () => {
    setOpen(true);

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/regions`,
    })
      .then((res) => {
        console.log(res);
        setRegions(res.data.data);
      })
      .catch((e) => console.log(e));
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleBtnClick = (region: { regionId: string; regionSido: string }) => {
    setLocation(region);
  };

  const handleRentChange = (newData: number[]) => {
    setRentalCost(newData);
  };

  const handleDepositChange = (newData: number[]) => {
    setDepositCost(newData);
  };

  // type
  const homeCategory: string[] = [
    "원룸",
    "투룸+",
    "오피스텔",
    "빌라",
    "아파트",
  ];

  // infra
  const facilities: string[] = [
    "경찰서",
    "마트",
    "버스 정류장",
    "병원/약국",
    "지하철 역",
    "카페",
    "코인 세탁소",
    "편의점",
  ];

  // ant design 글로벌 디자인 토큰
  const theme = {
    token: {
      colorBgTextHover: "#E9FFE7",
      colorPrimary: "#129B07",
      colorPrimaryBorder: "#129B07",
    },
  };

  return (
    <div className="w-80 px-5 py-10 border border-2 rounded-xl mr-5 shadow-md">
      <button
        className="w-full bg-lime-500 text-white p-2 rounded-full"
        onClick={showRegionModal}
      >
        {location.regionId ? (
          location.regionSido
        ) : (
          <div className="w-full flex items-center justify-center">
            <MapPinIcon width={20} className="me-3" />
            <p>지역을 선택해주세요.</p>
          </div>
        )}
      </button>
      <ConfigProvider theme={theme}>
        <Modal
          title="지역을 선택해주세요."
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <div className="p-2 text-center">
            {regions.map((region: { regionId: string; regionSido: string }) => (
              <button
                key={region.regionId}
                className={`p-2 border rounded-full m-1 ${
                  location && location.regionSido === region.regionSido
                    ? "border-lime-500 text-lime-500"
                    : "border-gray-400 text-gray-400 hover:border-lime-500 hover:text-lime-500"
                }`}
                onClick={() => handleBtnClick(region)}
              >
                {region.regionSido}
              </button>
            ))}
          </div>
        </Modal>
      </ConfigProvider>

      <TextBtn
        title="보증금"
        text={
          depositCost[0] || depositCost[1]
            ? `${depositCost[0]}만~${depositCost[1]}만`
            : "클릭하여 가격 설정"
        }
        min={0}
        max={3000}
        onDataChange={handleDepositChange}
      />
      <TextBtn
        title="월세 (관리비 포함)"
        text={
          rentalCost[0] || rentalCost[1]
            ? `${rentalCost[0]}만~${rentalCost[1]}만`
            : "클릭하여 가격 설정"
        }
        min={0}
        max={300}
        onDataChange={handleRentChange}
      />
      <BtnGroup title="집 유형" itemsArray={homeCategory} />
      <BtnGroup title="편의시설" itemsArray={facilities} />
      <BtnGroup title="지원 여부" itemsArray={["월세 지원", "가구도 승계"]} />
      <div className="text-end mr-2">
        <button className="mt-5 p-2 bg-lime-500 w-14 h-14 rounded-xl text-2xl text-center text-white shadow-lg">
          <SearchOutlined className="my-auto mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default FilterBox;
