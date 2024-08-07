import React, { useState, useEffect } from "react";

interface BtnGroupProps {
  title?: string;
  itemsArray: Array<string>;
}

const BtnGroup: React.FC<BtnGroupProps> = ({ title, itemsArray }) => {
  const [bitmask, setBitmask] = useState(0);

  const handleButtonClick = (index: number) => {
    // 인덱스를 반전시켜 가장 높은 자리수부터 시작하도록 합니다.
    const reversedIndex = itemsArray.length - 1 - index;
    setBitmask((prevBitmask) => prevBitmask ^ (1 << reversedIndex));
  };

  useEffect(() => {
    // bitmask가 변경될 때마다 콘솔에 2진수 형태로 출력
    console.log(bitmask.toString(2).padStart(itemsArray.length, "0"));
  }, [bitmask, itemsArray.length]);

  return (
    <div className="mt-7">
      <p className="text-center text-lime-600 font-bold">{title}</p>
      <div className="mt-2">
        {itemsArray.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleButtonClick(index)}
            className={`p-2 px-4 border rounded-full m-1 dark:text-white ${
              (bitmask & (1 << (itemsArray.length - 1 - index))) !== 0
                ? "border-lime-400 text-lime-400"
                : "text-gray-400 hover:border-lime-400 hover:text-lime-400"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BtnGroup;
