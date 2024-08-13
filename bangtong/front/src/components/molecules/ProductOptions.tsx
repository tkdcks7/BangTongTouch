import React from "react";

// 컴포넌트
import OptionIcon from "../atoms/OptionIcon";

// 이미지 소스
import Stove from "../../assets/Stove.png";
import Fridge from "../../assets/Fridge.png";
import WashingMachine from "../../assets/WashingMachine.png";
import AirConditioner from "../../assets/Airconditioner.png";
import Microwave from "../../assets/Microwave.png";
import Bed from "../../assets/Bed.png";
import Tv from "../../assets/Tv.png";
import DarkModeTv from "../../assets/DarkModeTv.png";


interface ProductProps {
  dark: boolean;
  options: number;
  isPc: boolean;
}

const ProductOptions: React.FC<ProductProps> = ({ options, isPc, dark }) => {
  const optionList = [
    "텔레비전",
    "침대",
    "전자레인지",
    "에어컨",
    "세탁기",
    "냉장고",
    "가스레인지",
  ];

  const iconList = [
    dark ? DarkModeTv : Tv,
    Bed,
    Microwave,
    AirConditioner,
    WashingMachine,
    Fridge,
    Stove,
  ];

  // const darkModeIcon = [
  //   DarkModeTv,
  //   Bed,
  //   Microwave,
  //   AirConditioner,
  //   WashingMachine,
  //   Fridge,
  //   Stove,
  // ];

  const numberArray: number[] = [0, 0, 0, 0, 0, 0, 0];

  // 편의시설 비트마스킹하는 함수
  const bitMaskDecode = (num: number) => {
    let val = num;
    numberArray.forEach((el, idx) => {
      if (val >= 2 ** (7 - idx)) {
        numberArray[idx] = 1;
        val -= 2 ** (7 - idx);
      }
    });
    return val;
  };
  bitMaskDecode(options);

  return (
    <div>
      <h1 className={isPc ? "hidden" : "text-2xl font-black"}>옵션</h1>
      <div className="flex flex-wrap justify-start items-center mt-5">
        {numberArray.map((el: any, idx: number) => {
          if (el) {
            return (
              <OptionIcon
                key={optionList[idx]}
                src={iconList[idx]}
                text={optionList[idx]}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default ProductOptions;
