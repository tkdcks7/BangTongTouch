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
  options: string;
  dark: boolean;

}

const ProductOptions: React.FC<ProductProps> = ({ options, dark }) => {
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

  for (let i = 0; i < 7; i++) {
    if (options[i] === "1") {
      numberArray[i] = 1;
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-black">옵션</h1>
      <div className="flex flex-wrap justify-start items-center mt-5">
        {numberArray.map((el: any, idx: number) => {
          return (
            <OptionIcon
              src={iconList[idx]}
              text={optionList[idx]}
              show={el ? "" : "hidden"}
            />
          );
        })}
        {/* <OptionIcon src={AirConditioner} text="에어컨" show={options[0]} />
        <OptionIcon src={Stove} text="가스레인지" show={options[1]} />
        <OptionIcon src={Fridge} text="냉장고" show={options[2]} />
        <OptionIcon src={WashingMachine} text="세탁기" show={options[3]} />
        <OptionIcon src={Microwave} text="전자레인지" show={options[4]} />
        <OptionIcon src={Bed} text="침대" show={options[5]} />
        <OptionIcon src={Tv} text="텔레비전" show={options[6]} /> */}
      </div>
    </div>
  );
};

export default ProductOptions;
