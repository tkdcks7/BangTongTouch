import React, { useState } from "react";
import Modal from "react-modal";

// 아이콘
import { CheckOutlined } from "@ant-design/icons";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const ProfileModal: React.FC = () => {
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

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <button
        className="flex items-center w-full p-4 text-left hover:bg-slate-100 rounded-xl border border-black mb-2"
        onClick={openModal}
      >
        <p>선호 검색 조건</p>
        <ChevronRightIcon className="w-4 h-4 ml-auto" />
      </button>
      <Modal
        isOpen={modalIsOpen}
        style={customStyle}
        onRequestClose={closeModal}
        contentLabel="선택된 선호 조건"
      >
        <div className="font-semibold">
          <div className="flex">
            <CheckOutlined />
            <h2 className="text-lime-500 font-bold ml-3">선택된 선호 조건</h2>
          </div>
          <div className="bg-lime-600 text-white px-4 py-2 rounded-full my-3 text-center">
            경상북도 구미시 진평동
          </div>
          <div className="flex justify-between mb-3">
            <p className="text-lime-500">보증금</p>
            <p className="w-40 text-center">100만 ~ 300만</p>
          </div>
          <div className="flex justify-between mb-3">
            <p className="text-lime-500">월세</p>
            <p className="w-40 text-center">20만 ~ 50만</p>
          </div>
          <div className="mb-3 text-center">
            <p className="text-lime-500">집 유형</p>
            <p>원룸, 아파트</p>
          </div>
          <div className="mb-3 text-center">
            <p className="text-lime-500">편의시설</p>
            <p>편의점, 버스 정류장, 지하철 역</p>
          </div>
          <div className="text-center mb-3">
            <p className="text-lime-500">지원 여부</p>
            <p>월세 지원</p>
          </div>
          <div className="text-center">
            <button className="bg-yellow-400 p-2 px-4 rounded-full text-white me-2">
              수정하기
            </button>
            <button
              className="bg-red-500 p-2 px-4 rounded-full text-white"
              onClick={closeModal}
            >
              닫기
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileModal;
