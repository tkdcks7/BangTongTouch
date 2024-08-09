import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import Modal from "react-modal";
import { motion } from "framer-motion";

// 아이콘
import {
  CheckOutlined,
  EditOutlined,
  CloseSquareFilled,
} from "@ant-design/icons";
import { MapPinIcon } from "@heroicons/react/20/solid";

import axios from "axios";
import authAxios from "../../utils/authAxios";

// 컴포넌트
import TextBtn from "../atoms/TextBtn";
import BtnGroup from "../molecules/BtnGroup";
import { ConfigProvider, Modal as AntModal } from "antd";
import { productSearchStore } from "../../store/productStore";

interface ModalI {
  modalIsOpen: boolean;
  selectedId: number;
  closeModal: () => void;
}
const ProfileModal: React.FC<ModalI> = ({
  modalIsOpen,
  selectedId,
  closeModal,
}) => {
  const customStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const { id } = useUserStore();
  const naviagte = useNavigate();

  // 모달창에 뜨기 위한 state
  const [preferenceName, setPreferenceName] = useState<string>("");

  // 지역설정 부분
  const [locationTitle, setLocationTitle] = useState<string>("");
  const [open, setOpen] = useState(false); // 지역 선택 모달
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [regions, setRegions] = useState([]); // 지역 선택 모달에 뜰 버튼들 갱신

  const {
    order,
    maxDeposit,
    maxRent,
    homeType,
    infra,
    address,
    rentSupportable,
    furnitureSupportable,
    startDate,
    endDate,
    setDeposit,
    setRent,
    setHomeType,
    setAddress,
    setRentSupportable,
    setFurnitureSupportable,
    setInfra,
    setDate,
  } = productSearchStore();

  // 영어 type(변환해야함.)
  const homeCategoryEnglish: string[] = [
    "ONEROOM",
    "OFFICE",
    "TWOROOM",
    "VILLA",
    "APARTMENT",
  ];

  // 문자열로 된 infra 정보로 store의 infra 배열을 변화시키는 함수
  const infraSetter = (char: string): void => {
    for (let i = 0; i < char.length; i++) {
      if (char[i] === "1") {
        setInfra(i);
      }
    }
  };

  // 배열을 문자열로 전환하는 함수
  const infraStringfier = (inputArr: number[]): string => {
    const arr: string[] = [];
    inputArr.forEach((el) => arr.push(String(el)));
    return arr.join("");
  };

  // 선호 옵션을 선택할 때마다(selectedId가 변경될 때마다) 다른 전송 후 모달에서 해당 ID의 선호 옵션을 띄워줌
  useEffect(() => {
    console.log("모달 useEffect 실행됨 주소는...");
    console.log(
      `${process.env.REACT_APP_BACKEND_URL}/preferences/${selectedId}`
    );
    authAxios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/preferences/${selectedId}`,
    })
      .then((response) => {
        const result = response.data.data;
        console.log(response);
        setAddress(result.regionId);
        setPreferenceName(result.preferenceName);
        setDeposit(0, result.preferenceDeposit);
        setRent(0, result.preferenceRent);
        setLocationTitle(result.regionAddress);
        setHomeType(
          homeCategoryEnglish.findIndex((el) => el === result.preferenceType)
        );
        infraSetter(result.preferenceInfra); // 반복문을 돌면서 infra 배열을 바꿔줌
        setDate(result.preferenceStartDate, result.preferenceEndDate);
        const regionId = result.regionId;
        // regionId를 보내서 주소 상세를 받아온다.
        authAxios({
          method: "GET",
          url: `${process.env.REACT_APP_BACKEND_URL}/preferences/${regionId}`,
        })
          .then((res) => {
            console.log(res);
            // 받아온 상세 주소를 조립해 표시될 상세 주소를 변경한다.
            const newLocationTitle =
              res.data.data.region.regionSido +
              " " +
              res.data.data.region.regionDong +
              " " +
              res.data.data.region.regionGun;
            setLocationTitle(newLocationTitle);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [selectedId]);

  // 지역 설정 모달 오픈 핸들러
  const showRegionModal = () => {
    setOpen(true);

    // 광역시 및 도 단위 지역 요청
    authAxios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/regions`,
    })
      .then((res) => {
        console.log(res);
        console.log(`받아온 지역은 ${res} 입니다.`);
        setRegions(res.data.data);
      })
      .catch((e) => console.log(`지역을 못받아옴. ${e}`));
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setLocationTitle("");
    setOpen(false);
  };

  // 광역지자체 단위 버튼을 눌렀을 시
  const handleSidoClick = (regionId: string, regionSido: string) => {
    setLocationTitle(() => regionSido);
    // 지역설정 모달에 기초지자체 단위를 띄움
    authAxios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/regions/${regionId}`,
    })
      .then((res) => {
        console.log(res);
        console.log(`받아온 하위지역은 ${res.data.data} 입니다.`);
        setRegions(res.data.data);
      })
      .catch((err) => console.log(`지역을 못받아옴. ${err}`));
  };

  // 기초지자체 단위 버튼을 눌렀을 시
  const handleGugunClick = (regionId: string, regionGugun: string) => {
    setLocationTitle(() => locationTitle + " " + regionGugun);
    // 읍면동 단위 버튼을 받아온다.
    authAxios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/regions/gugun/${regionId}`,
    })
      .then((res) => {
        console.log(res);
        console.log(`받아온 최하위지역은 ${res.data.data} 입니다.`);
        setRegions(res.data.data);
      })
      .catch((err) => console.log(`지역을 못받아옴. ${err}`));
  };

  // 읍면동 단위 버튼을 눌렀을 시
  const handleDongClick = (regionId: string, regionDong: any) => {
    setLocationTitle(() => locationTitle + " " + regionDong);
    setAddress(regionId);
    setOpen(false); // 모달 닫기
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

  // 방 타입을 반환하는 함수
  const roomTypeConverter = (numArr: number[]) =>
    homeCategoryEnglish[numArr.findIndex((el) => el)]; // 1인 index(0이 아닌 index) 반환

  // 선호 설정 수정
  const handleUpdate = (): void => {
    const dataSet = {
      name: preferenceName,
      region: address,
      deposit: maxDeposit,
      rent: maxRent,
      type: roomTypeConverter(homeType),
      infra: infraStringfier(infra),
      startDate,
      endDate,
    };
    authAxios({
      method: "PUT",
      url: `${process.env.REACT_APP_BACKEND_URL}/preferences/modify/${selectedId}`,
      data: dataSet,
    })
      .then((response) => {
        console.log("성공적으로 변경됐습니다.");
        console.log(response);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        window.alert("변경 사항이 반영되지 않았습니다.");
      });
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        style={customStyle}
        onRequestClose={closeModal}
        contentLabel="선택된 선호 조건"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: [0, 0.5, 0.2, 1],
          }}
        >
          <div className="w-80 relative px-5 py-10 border-2 rounded-xl shadow-md max-h-[80vh] overflow-y-auto">
            <div
              className="absolute top-1 right-1 hover:cursor-pointer"
              onClick={closeModal}
            >
              <CloseSquareFilled
                width={40}
                style={{ color: "red", fontSize: "24px" }}
              />
            </div>
            <h1 className="text-lime-500 text-center font-bold ml-3 text-xl">
              {preferenceName}
            </h1>
            <hr className="border-2" />
            <br />
            <button
              className="w-full bg-lime-500 text-white p-2 rounded-full"
              onClick={showRegionModal}
            >
              {locationTitle ? (
                locationTitle
              ) : (
                <div className="w-full flex items-center justify-center">
                  <MapPinIcon width={20} className="me-3" />
                  <p>지역을 선택해주세요.</p>
                </div>
              )}
            </button>
            <ConfigProvider theme={theme}>
              <AntModal
                title="지역을 선택해주세요."
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
              >
                <div className="p-2 text-center">
                  {regions.map(
                    (region: {
                      regionId: string;
                      regionSido?: string;
                      regionGugun?: string;
                      regionDong?: string;
                    }) => (
                      <button
                        key={region.regionId}
                        className={`p-2 border rounded-full m-1 border-gray-400 text-gray-400 hover:border-lime-500 hover:text-lime-500
                  `}
                        onClick={() => {
                          if (region.regionSido) {
                            handleSidoClick(region.regionId, region.regionSido);
                          } else if (region.regionGugun) {
                            handleGugunClick(
                              region.regionId,
                              region.regionGugun
                            );
                          } else {
                            handleDongClick(region.regionId, region.regionDong);
                          }
                        }}
                      >
                        {region.regionSido
                          ? region.regionSido
                          : region.regionGugun
                            ? region.regionGugun
                            : region.regionDong}
                      </button>
                    )
                  )}
                </div>
              </AntModal>
            </ConfigProvider>

            <TextBtn title="보증금" text={`~${maxDeposit}만`} />
            <TextBtn title="월세" text={`~${maxRent}만`} />
            <BtnGroup title="집 유형" itemsArray={homeCategory} />
            <BtnGroup title="편의시설" itemsArray={facilities} />
            <div className="text-end mr-2">
              <button
                className="mt-5 p-2 bg-yellow-500 w-14 h-14 rounded-xl text-2xl text-center text-white shadow-lg"
                onClick={handleUpdate}
              >
                <EditOutlined className="my-auto mx-auto" />
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                className="mt-5 p-2 bg-lime-500 w-14 h-14 rounded-xl text-2xl text-center text-white shadow-lg"
                onClick={handleUpdate}
              >
                <CheckOutlined className="my-auto mx-auto" />
              </button>
            </div>
          </div>
        </motion.div>
      </Modal>
    </>
  );
};

export default ProfileModal;
