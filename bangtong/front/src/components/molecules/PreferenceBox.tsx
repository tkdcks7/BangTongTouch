import React from "react";
import useUserStore from "../../store/userStore";

interface PreferenceBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  preferenceId: number;
  preferenceName: string;
  handlePreferenceDetail: (prefId: number) => void;
  handlePreferenceDelete: (prefId: number) => void;
}

const PreferenceBox: React.FC<PreferenceBoxProps> = ({
  preferenceId,
  preferenceName,
  handlePreferenceDetail,
  handlePreferenceDelete,
}) => {
  const { id } = useUserStore();

  return (
    <div
      className={`mt-4 relative flex items-center justify-center 
      rounded-lg border-2 border-lime-400 bg-none w-full h-20
      transition-colors duration-500 hover:bg-lime-400 hover:cursor-pointer`}
      onClick={() => handlePreferenceDetail(preferenceId)}
    >
      <div>선호설정리스트이름 {preferenceName}</div>
      <div
        className="absolute right-0 top-0 hover:cursor-pointer"
        onClick={() => handlePreferenceDelete(preferenceId)}
      ></div>
    </div>
  );
};

export default PreferenceBox;
