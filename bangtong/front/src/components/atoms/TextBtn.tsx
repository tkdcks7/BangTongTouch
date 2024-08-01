import { ConfigProvider, Input, Modal, Slider, SliderSingleProps } from "antd";
import React, { Component, useEffect, useState } from "react";

interface TextBtnProps {
  title: string;
  text: string;
  min?: number;
  max?: number;
  onDataChange?: (value: number[]) => void;
}

const TextBtn: React.FC<TextBtnProps> = ({
  title,
  text,
  min = 0,
  max = 0,
  onDataChange,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState<number[]>([min, max]);
  const [minInput, setMinInput] = useState<number>(min);
  const [maxInput, setMaxInput] = useState<number>(max);

  const handleOk = () => {
    if (onDataChange) {
      onDataChange(sliderValue);
    }
    setModalOpen(false); // Modal을 닫기 위해 추가
  };

  const rentalMarks: SliderSingleProps["marks"] = {
    0: "0",
    50: "50",
    100: "100",
    150: "150",
    200: "200",
    250: "250",
    300: "300",
  };

  const depositMarks: SliderSingleProps["marks"] = {
    0: "0",
    1000: "1000",
    2000: "2000",
    3000: "3000~",
  };

  // ant design 글로벌 디자인 토큰
  const theme = {
    token: {
      colorBgTextHover: "#E9FFE7",
      colorPrimary: "#129B07",
      colorPrimaryBorder: "#129B07",
    },
  };

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    setMinInput(value[0]);
    setMaxInput(value[1]);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMinInput(value);
    setSliderValue([value, maxInput]);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMaxInput(value);
    setSliderValue([minInput, value]);
  };

  useEffect(() => {
    setSliderValue([min, max]);
    setMinInput(min);
    setMaxInput(max);
  }, [min, max]);

  return (
    <div className="flex justify-between mt-7">
      <p className="text-lime-600 font-bold">{title}</p>
      <button onClick={() => setModalOpen(true)}>{text}</button>
      <ConfigProvider theme={theme}>
        <Modal
          title={`${title} 범위 설정 (단위: 만원)`}
          open={modalOpen}
          onOk={handleOk}
          onCancel={() => setModalOpen(false)}
        >
          <Slider
            range
            marks={title === "보증금" ? depositMarks : rentalMarks}
            defaultValue={[min, max]}
            min={min}
            max={max}
            value={sliderValue}
            step={title === "보증금" ? 100 : 10}
            keyboard
            onChange={handleSliderChange}
          />
          <div className="flex">
            <Input
              placeholder="최소값 입력"
              value={minInput}
              onChange={handleMinInputChange}
              className="me-3"
            />
            <Input
              placeholder="최대값 입력"
              value={maxInput}
              onChange={handleMaxInputChange}
            />
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default TextBtn;
