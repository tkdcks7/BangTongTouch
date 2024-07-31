import React, { useState } from "react";
import axios from "axios";

// 컴포넌트
import TextBtn from "../atoms/TextBtn";
import BtnGroup from "../molecules/BtnGroup";
import { Modal } from "antd";

// 이모티콘
import { SearchOutlined } from "@ant-design/icons";
import { MapPinIcon } from "@heroicons/react/20/solid";

const FilterBox: React.FC = () => {
  const [location, setLocation] = useState({ regionId: "", regionSido: "" });
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [regions, setRegions] = useState([]);

  const showModal = () => {
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

  const homeCategory: Array<string> = [
    "원룸",
    "투룸+",
    "오피스텔",
    "빌라",
    "아파트",
  ];

  const facilities: Array<string> = [
    "경찰서",
    "마트",
    "버스 정류장",
    "병원/약국",
    "지하철 역",
    "카페",
    "코인 세탁소",
    "편의점",
  ];

  const supportMenu: Array<string> = ["월세 지원", "가구도 승계"];

  return (
    <div className="w-80 px-5 py-10 border border-2 rounded-xl mr-5 shadow-md">
      <button
        className="w-full bg-lime-500 text-white p-2 rounded-full"
        onClick={showModal}
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
              className={`p-2 border rounded-full m-1 ${location && location.regionSido === region.regionSido ? "border-lime-500 text-lime-500" : "border-gray-400 text-gray-400 hover:border-lime-500 hover:text-lime-500"}`}
              onClick={() => handleBtnClick(region)}
            >
              {region.regionSido}
            </button>
          ))}
        </div>
      </Modal>
      <TextBtn title="보증금" text="100만~300만" />
      <TextBtn title="월세 (관리비 포함)" text="20만~50만" />
      <BtnGroup title="집 유형" itemsArray={homeCategory} />
      <BtnGroup title="편의시설" itemsArray={facilities} />
      <BtnGroup title="지원 여부" itemsArray={supportMenu} />
      <div className="text-end mr-2">
        <button className="mt-5 p-2 bg-lime-500 w-14 h-14 rounded-xl text-2xl text-center text-white shadow-lg">
          <SearchOutlined className="my-auto mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default FilterBox;
