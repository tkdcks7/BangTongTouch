import React, { useState } from "react";
import useProductOptionStore from "../../store/productStore";

// 이미지 소스
import Fulloption from "../../assets/FullOptionIcon.svg";
import Stove from "../../assets/Stove.png";
import Fridge from "../../assets/Fridge.png";
import WashingMachine from "../../assets/WashingMachine.png";
import AirConditioner from "../../assets/Airconditioner.png";
import Microwave from "../../assets/Microwave.png";
import Bed from "../../assets/Bed.png";
import Tv from "../../assets/Tv.png";

interface ProductOption {
  풀옵션: boolean;
  가스레인지: boolean;
  냉장고: boolean;
  세탁기: boolean;
  에어컨: boolean;
  전자레인지: boolean;
  침대: boolean;
  티비: boolean;
}

interface BtnProps {
  text: keyof ProductOption;
}

const OptionBtn: React.FC<BtnProps> = ({ text, ...props }) => {
  const { optionObj, setProductOption } = useProductOptionStore();

  const imgObj: any = {
    풀옵션: Fulloption,
    가스레인지: Stove,
    냉장고: Fridge,
    세탁기: WashingMachine,
    에어컨: AirConditioner,
    전자레인지: Microwave,
    침대: Bed,
    티비: Tv,
  };
  const imgSrc = imgObj[text];
  const isDisabled = optionObj["풀옵션"] && text !== "풀옵션"; // 풀옵션이 아닌 버튼의 비활성화를 위한 값

  return (
    <button
      onClick={() => setProductOption(text)}
      className={
        "flex flex-col items-center border border-lime-500 rounded-full m-1 px-3 py-2 " +
        (optionObj[text] ? " bg-lime-500 text-white" : "text-lime-500 bg-white")
      }
      disabled={isDisabled}
    >
      <img src={imgSrc} alt="" className="w-8 h-8" />
      <span>{text}</span>
    </button>
  );
};

export default OptionBtn;
