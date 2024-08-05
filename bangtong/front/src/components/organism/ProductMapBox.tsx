import React, { useState } from "react";
import { productSearchStore } from "../../store/productStore";

// 컴포넌트
import ProductMap from "../molecules/ProductMap";
import InputBox from "../molecules/InputBox";
import FilterBox from "../molecules/FilterBox";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Dropdown,
  Popover,
  Radio,
  Space,
  FloatButton,
} from "antd";
import type { MenuProps } from "antd";
import ProductList from "../molecules/ProductList";

// 아이콘
import { CalendarOutlined, DownOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const ProductMapBox: React.FC = () => {
  const { productsList, setOrder, setDate } = productSearchStore();

  // ant design 글로벌 디자인 토큰
  const theme = {
    token: {
      colorBgTextHover: "#E9FFE7",
      colorPrimary: "#129B07",
      colorPrimaryBorder: "#129B07",
    },
  };

  // 이게 작동해서 날짜가 제대로 store에 저장되는지 확인 필요
  const handelChange = (dates: any) => {
    setDate(dates[0], dates[1]);
  };

  const datePicker = (
    <RangePicker
      className="w-full"
      placeholder={["입주 일자", "퇴거 일자"]}
      onChange={handelChange}
    />
  );

  // order
  // "스마트 추천", "최신 등록순", "가격 낮은 순", "집 넓은 순"
  const orderBy = ["스마트 추천", "최신 등록순", "가격 낮은 순", "집 넓은 순"];

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    setOrder(parseInt(key));
  };

  const items: MenuProps["items"] = [
    {
      label: "스마트 추천",
      key: 0,
    },
    {
      label: "최신 등록순",
      key: 1,
    },
    {
      label: "가격 낮은 순",
      key: 2,
    },
    {
      label: "집 넓은 순",
      key: 3,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    // ProductList 컴포넌트 부분 작성해주세요. store의 productsList를 map으로 띄우면 됨.
    <div className="my-20 flex items-center justify-center">
      <div className="hidden lg:block mr-5">
        <FilterBox />
      </div>
      <div className="lg:w-2/5">
        <div className="text-center">
          <div className="text-lime-600 font-bold text-center">
            <ConfigProvider theme={theme}>
              <div className="flex mb-1 justify-between items-center">
                <Popover
                  trigger="click"
                  placement="bottom"
                  title={
                    <p className="text-center mb-3">
                      희망 주거기간을 설정해주세요.
                    </p>
                  }
                  content={datePicker}
                >
                  <Button
                    type="text"
                    size="large"
                    icon={<CalendarOutlined className="text-lime-500" />}
                  ></Button>
                </Popover>
                <Radio.Group
                  defaultValue={0}
                  className="hidden md:block lg:hidden xl:block"
                >
                  {orderBy.map((item, index) => (
                    <Radio.Button value={index} onClick={() => setOrder(index)}>
                      {item}
                    </Radio.Button>
                  ))}
                </Radio.Group>
                <Dropdown
                  menu={menuProps}
                  className="md:hidden lg:block xl:hidden"
                >
                  <Button onClick={(e) => e.preventDefault()}>
                    <Space>
                      {orderBy[order]}
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
            </ConfigProvider>
          </div>
        </div>
        <div>
          <ProductMap />
        </div>
      </div>
      <ProductList />
    </div>
  );
};

export default ProductMapBox;
