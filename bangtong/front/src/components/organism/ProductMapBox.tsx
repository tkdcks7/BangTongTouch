import React, { useState } from "react";

// 컴포넌트
import ProductMap from "../molecules/ProductMap";
import InputBox from "../molecules/InputBox";
import FilterBox from "../molecules/FilterBox";
import BtnGroup from "../molecules/BtnGroup";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

interface DateValue {
  startDate: Date | null;
  endDate: Date | null;
}

const ProductMapBox: React.FC = () => {
  const orderBy = ["스마트 추천", "최신 등록순", "가격 낮은 순", "집 넓은 순"];

  const [date, setDate] = useState<DateValue>({
    startDate: null,
    endDate: null,
  });

  const handleDateChange = (
    newValue: DateValueType | null,
    e?: HTMLInputElement | null
  ) => {
    if (newValue) {
      console.log("newValue:", newValue);
      setDate({
        startDate: newValue.startDate ? new Date(newValue.startDate) : null,
        endDate: newValue.endDate ? new Date(newValue.endDate) : null,
      });
    } else {
      setDate({
        startDate: null,
        endDate: null,
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="hidden lg:block">
        <FilterBox />
      </div>
      <div className="w-4/5 lg:w-2/5">
        <div className="lg:hidden mt-5">
          <InputBox
            placeholder="주소 검색"
            buttonType="search"
            width={"auto"}
          />
        </div>
        <div className="text-center">
          <div className="text-lime-600 font-bold text-center">
            <div className="mb-3 border">
              <Datepicker
                value={date}
                onChange={handleDateChange}
                showShortcuts={true}
                placeholder="입주 희망일자(yyyy-mm-dd)~퇴거 희망일자(yyyy-mm-dd)"
              />
            </div>
          </div>
          {}
        </div>
        <div>
          <ProductMap />
        </div>
      </div>
    </div>
  );
};

export default ProductMapBox;
