import React from "react";
import useUserStore from "../../store/userStore";

interface PreferenceBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  preferenceId: number;
  preferenceName: string;
  preferenceDeposit: number;
  preferenceRent: number;
  regionAddress: string;
  handlePreferenceDetail: (prefId: number) => void;
  handlePreferenceDelete: (prefId: number) => void;
}

const PreferenceBox: React.FC<PreferenceBoxProps> = ({
  preferenceId,
  preferenceName,
  preferenceDeposit,
  preferenceRent,
  regionAddress,
  handlePreferenceDetail,
  handlePreferenceDelete,
}) => {
  const { id } = useUserStore();

  return (
    <div
      className={`mt-4 relative flex items-center justify-center 
      rounded-lg border-2 border-lime-400 bg-lime-100 w-full h-20
      transition-colors duration-500 hover:bg-lime-400 hover:cursor-pointer`}
      onClick={() => handlePreferenceDetail(preferenceId)}
    >
      <div className="flex-initial w-1/3 text-base font-bold">
        {preferenceName}
      </div>
      <div className="flex flex-initial flex-col w-2/3 text-left">
        <div className="flex-initial h-1/2">위치: {regionAddress}</div>
        <div className="flex-initial h-1/2">
          <span className="text-bold">보증금:&nbsp;</span>
          {preferenceDeposit}만원 &nbsp;&nbsp;
          <span className="text-bold">월세:&nbsp;</span> {preferenceRent}만원
        </div>
      </div>
      <div
        className="absolute right-0 top-0 hover:cursor-pointer"
        onClick={() => handlePreferenceDelete(preferenceId)}
      ></div>
    </div>
  );
};

export default PreferenceBox;
