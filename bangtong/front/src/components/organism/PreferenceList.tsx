import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import authAxios from "../../utils/authAxios";
import { productSearchStore, preferenceStore } from "../../store/productStore";

// 컴포넌트
import PreferenceBox from "../molecules/PreferenceBox";
import ProfileModal from "../molecules/ProfileModal";

interface PreferenceI {
  preferenceId: number;
  preferenceName: string;
  regionId: string;
  regionAddress: string;
  preferenceDeposit: number;
  preferenceRent: number;
  preferenceType: string;
  preferenceInfra: number;
  preferenceStartDate: string;
  preferenceEndDate: string;
}

const PreferenceList: React.FC = () => {
  const { id } = useUserStore();
  const [preferenceArr, setPreferenceArr] = useState<PreferenceI[]>([]);
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(0);

  const { setPreference } = preferenceStore();

  function closeModal() {
    setModalIsOpen(false);
  }

  // 진입 시 설정 전체를 백에서 불러옴
  useEffect(() => {
    authAxios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/preferences/${id}/list`,
    })
      .then((response) => {
        console.log("목록을 불러옵니다.");
        console.log(response.data.data);
        setPreferenceArr([...response.data.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  // 클릭 시 선호 상세 모달을 띄우는 핸들러
  const handlePreferenceDetail = (prefId: number): void => {
    console.log("선호 상세 모달 띄우기!");
    setSelectedId(prefId);
    setModalIsOpen(true);
  };

  // 클릭 시 선호 생성 모달을 띄우는 핸들러
  const handlePreferenceCreate = (): void => {
    console.log("선호 상세 모달 띄우기!");
    setSelectedId(0);
    setModalIsOpen(true);
  };

  // 클릭 시 삭제하는 핸들러
  const handlePreferenceDelete = (prefId: number): void => {
    console.log("선호 설정 삭제");
    authAxios({
      method: "DELETE",
      url: `${process.env.REACT_APP_BACKEND_URL}/preferences/delete/${prefId}`,
    })
      .then((response) => {
        console.log("삭제를 진행합니다..");
        setPreferenceArr(
          preferenceArr.filter((el) => el.preferenceId !== prefId)
        ); // preferenceId가 삭제될 prefId가 아닌 놈만 반환
      })
      .catch((err) => console.log(err));
  };

  const handlePreferenceApplicate = (prefId: number) => {
    console.log("선호설정 등록");
    preferenceArr.forEach((el, idx) => {
      if (el.preferenceId === prefId) {
        setPreference(preferenceArr[idx]);
      }
    });
  };

  const addpreferenceArr = (prefArr: any) => {
    setPreferenceArr([...preferenceArr, prefArr]);
  };

  return (
    <>
      <div className="w-full flex text-nowrap items-center justify-between mt-5">
        <h2 className="text-xl text-left text-lime-500 font-bold">
          나의 선호 설정 관리
        </h2>
        <div>
          <button
            className="bg-yellow-400 ml-auto py-1 px-4 rounded-md text-white"
            onClick={handlePreferenceCreate}
          >
            만들기
          </button>
          &nbsp;&nbsp;
          <button
            className="bg-gray-400 ml-auto py-1 px-4 rounded-md text-white"
            onClick={() => navigate(`/profile/${id}`)}
          >
            메뉴로
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-5 items-center justify-center text-center">
        {preferenceArr.map((pref: PreferenceI) => {
          return (
            <PreferenceBox
              key={pref.preferenceId}
              preferenceId={pref.preferenceId}
              preferenceName={pref.preferenceName}
              preferenceDeposit={pref.preferenceDeposit}
              preferenceRent={pref.preferenceRent}
              regionAddress={pref.regionAddress}
              handlePreferenceDetail={handlePreferenceDetail}
              handlePreferenceApplicate={handlePreferenceApplicate}
              handlePreferenceDelete={handlePreferenceDelete}
            />
          );
        })}
      </div>
      <ProfileModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        selectedId={selectedId}
        addpreferenceArr={addpreferenceArr}
      />
    </>
  );
};

export default PreferenceList;
