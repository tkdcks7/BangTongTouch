import React, { useState } from "react";

// 컴포넌트
import ProductMap from "../molecules/ProductMap";
import InputBox from "../molecules/InputBox";
import FilterBox from "../molecules/FilterBox";
import BtnGroup from "../molecules/BtnGroup";
import { Button, ConfigProvider, DatePicker, Popover, Radio } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const ProductMapBox: React.FC = () => {
  // ant design 글로벌 디자인 토큰
  const theme = {
    token: {
      colorBgTextHover: "#E9FFE7",
      colorPrimary: "#129B07",
      colorPrimaryBorder: "#129B07",
    },
  };

  const popoverTitle = (
    <p className="text-center mb-3">희망 주거기간을 설정해주세요.</p>
  );

  const datePicker = (
    <RangePicker className="w-full" placeholder={["입주 일자", "퇴거 일자"]} />
  );

  // order
  const orderBy = ["스마트 추천", "최신 등록순", "가격 낮은 순", "집 넓은 순"];

  return (
    <div className="my-20 flex items-center justify-center">
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
            <ConfigProvider theme={theme}>
              <div className="flex mb-1 justify-between items-center">
                <Popover
                  trigger="click"
                  placement="bottom"
                  title={popoverTitle}
                  content={datePicker}
                >
                  <Button
                    type="primary"
                    icon={<CalendarOutlined className="text-white" />}
                  ></Button>
                </Popover>
                <Radio.Group defaultValue={orderBy[0]}>
                  <Radio.Button value={orderBy[0]}>{orderBy[0]}</Radio.Button>
                  <Radio.Button value={orderBy[1]}>{orderBy[1]}</Radio.Button>
                  <Radio.Button value={orderBy[2]}>{orderBy[2]}</Radio.Button>
                  <Radio.Button value={orderBy[3]}>{orderBy[3]}</Radio.Button>
                </Radio.Group>
              </div>
            </ConfigProvider>
          </div>
        </div>
        <div>
          <ProductMap />
        </div>
      </div>
    </div>
  );
};

export default ProductMapBox;
