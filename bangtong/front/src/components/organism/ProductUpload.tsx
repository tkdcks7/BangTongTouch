import React, { useState, useEffect } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useParams } from "react-router-dom";
import axios from "axios";
import authAxios, { formDataAxios } from "../../utils/authAxios";
import { getUserAddressNum } from "../../utils/services";
import dayjs, { Dayjs } from "dayjs";

// 컴포넌트
import InputBox from "../molecules/InputBox";
import Attachment from "../atoms/Attachment";
import Btn from "../atoms/Btn";
import OptionBtnGroup from "../molecules/OptionBtnGroup";
import RadioGroup from "../molecules/RadioGroup";
import Datepicker from "react-tailwindcss-datepicker";
import useProductOptionStore from "../../store/productStore";
import { Form, Input, DatePicker, ConfigProvider, Radio } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

// 매물 업로드에 필요한 json의 인터페이스
interface ProductUploadDto {
  productType: string;
  regionId: string;
  productAddress: string;
  productDeposit: number;
  productRent: number;
  productMaintenance: number;
  productMaintenanceInfo: string;
  productIsRentSupportable: Boolean;
  productIsFurnitureSupportable: Boolean;
  productSquare: number;
  productRoom: number;
  productOption: number;
  productAdditionalOption: string[];
  productStartDate: string;
  productEndDate: string;
  productDetailAddress: string;
  lat: number;
  lng: number;
}

const ProductUpload: React.FC = () => {
  let { id }: any = useParams(); // 상품 번호. 있으면 update, 없으면 create

  // 옵션그룹을 상태관리하기 위한 store
  const { optionObj } = useProductOptionStore();

  // 백엔드에 넘겨줄 데이터를 위한 state
  const [address, setAddress] = useState<string>("");
  const [addressDetail, setAddressDetail] = useState<string>("");
  const [deposit, setDeposit] = useState<string>("");
  const [charge, setCharge] = useState<string>("");
  const [maintanence, setMaintanence] = useState<string>("");
  const [maintanenceInfo, setMaintanenceInfo] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [room, setRoom] = useState<number>(1);
  const [furniture, setFurniture] = useState<string>("");
  const [furnitureList, setFurnitureList] = useState<string[]>([]);
  const [coordinate, setCoordinate] = useState<number[]>([]);
  const [date, setDate] = useState<[any, any]>([null, null]);

  // 사진, 영상 state
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [movieFile, setMovieFile] = useState<File | null>(null);

  // ant design Search 컴포넌트
  const { Search } = Input;

  // ant design RangePicker 컴포넌트
  const { RangePicker } = DatePicker;

  // ant design 글로벌 디자인 토큰
  const theme = {
    token: {
      colorBgTextHover: "#E9FFE7",
      colorPrimary: "#129B07",
      colorPrimaryBorder: "#129B07",
    },
  };

  // Datepicker를 위한 핸들러
  const handleValueChange = (newValue: any): void => {
    console.log("newValue:", newValue);
    setDate(newValue);
  };

  // 수정일 시, 백엔드에서 값을 받아온 후 state에 집어넣음.
  if (id) {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/products/${id}`,
      headers: {},
    })
      .then((response) => {
        setAddress(() => response.data.productAddress); // 문자열 처리를 해줘서 상세주소 분리해서 setState
        setDeposit(() => response.data.productDeposit); // 보증금
        setCharge(() => response.data.productRent); // 월세
        setMaintanence(() => response.data.productMaintenence); //관리비
        setMaintanenceInfo(() => response.data.productMaintenenceInfo); // 관리비항목
        setArea(() => response.data.productSquare); // 방 면적
        setRoom(() => response.data.productRoom); // 방 개수
        setFurniture(() => response.data.productIsFurnitureSupportable); // 승계 가능 가구 및 물품
        // setAddress(() => response.data.productIsSupportable); // 지원가능여부
        // setAddress(() => response.data.productOption); // 방 옵션
      })
      .catch((err) => console.log(err));
  }

  // 주소검색 팝업 부분
  const open = useDaumPostcodePopup();
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(data);
    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setAddress(() => fullAddress);
  };

  // 주소검색 팝업 열기
  const handleAddressPopUp = () => {
    open({ onComplete: handleComplete });
  };

  const handleRoomOption = (e: any) => {
    setRoom(() => e.target.value);
  };

  // 파일 등록 시 확장자 유효성판정 후 업로드
  const onFileChange = (fileInput: any, fileType: string) => {
    if (fileInput) {
      const extensionName = fileInput.name.split(".").pop().toLowerCase(); // 파일명에서 확장자명 추출
      if (
        ["jpg", "png", "gif"].includes(extensionName) &&
        fileType === "사진"
      ) {
        setImgFile(fileInput);
      } else if (extensionName === "mp4" && fileType === "동영상") {
        setMovieFile(fileInput);
      } else {
        window.alert(
          "지원하지 않는 형식의 파일입니다\n*확장자가 jpg, png, gif, mp4인 파일만 등록 가능"
        );
      }
    }
  };

  // 추가 옵션 등록 함수
  const handleFurnitureAppend = (e: any) => {
    if (e.key === "Enter" && furniture) {
      setFurnitureList(() => [...furnitureList, furniture]);
      setFurniture(() => "");
    }
  };

  // 추가 옵션에서 제외하는 함수
  const hadleFurnitureRemove = (val: string) => {
    setFurnitureList(() => furnitureList.filter((opt) => opt !== val));
    console.log(
      `가구 = ${furnitureList}, 자른 값 = ${furnitureList.filter((opt) => opt !== val)}`
    );
  };

  // 매물 업로드 실행 함수
  const handleUploadClick = () => {
    console.log("매물 업로드 시작!");
    // Option 처리 부분
    let option: number = 0;
    if (optionObj["풀옵션"]) {
      option = 255;
    } else {
      (Object.keys(optionObj) as (keyof typeof optionObj)[]).forEach(
        (opt, idx) => {
          optionObj[opt] ? (option += 2 ** (7 - idx)) : (option += 0);
        }
      );
    }

    // 주소로 위경도 반환
    if (address) {
      console.log("주소 있음!");
      getUserAddressNum(address).then((res) => {
        setCoordinate(res);
      });
    } else {
      window.alert("주소가 있어야 위도/경도를 반환할 수 있습니다.");
    }

    // 이부분 수정중!!!!
    const productUploadDto: ProductUploadDto = {
      productType: "ONEROOM", // 지금 값을 입력할 컴포넌트 없음
      productAddress: address,
      regionId: "1111010100", // 임시로 고정값을 넣어줬는데 로직 짜야함
      productDeposit: Number(deposit),
      productRent: Number(charge),
      productMaintenance: Number(maintanence),
      productMaintenanceInfo: maintanenceInfo,
      productIsRentSupportable: false,
      productIsFurnitureSupportable: furnitureList.length > 0,
      productSquare: Number(area),
      productRoom: Number(room),
      productOption: option,
      productAdditionalOption: furnitureList,
      productStartDate: dayjs(date[0]).format("YYYY-MM-DD"),
      productEndDate: dayjs(date[1]).format("YYYY-MM-DD"),
      productDetailAddress: addressDetail,
      lat: coordinate[0],
      lng: coordinate[1],
    };

    const formData = new FormData(); // formData 객체 생성
    const jsonBlob = new Blob([JSON.stringify(productUploadDto)], {
      type: "application/json",
    }); // blob으로 변환 후 타입 명시적으로 지정
    formData.append("productUploadDto", jsonBlob); // productUploadDto라는 key에 productUploadDto 반환

    // 이미지와 영상 업로드
    if (imgFile) {
      const imgBlob = new Blob([imgFile]);
      formData.append(`productMedia`, imgBlob, imgFile.name);
    }
    if (movieFile) {
      const blob = new Blob([movieFile]);
      formData.append(`productMedia`, blob, movieFile.name);
    }

    // 검증을 위한 부분
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    console.log(formData.get("productMedia[0]"));
    formDataAxios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/products/upload`,
      data: formData,
    })
      .then((response) => console.log(response, "detailPage로 이동합니다."))
      .catch((err) => console.log(err));
  };

  // type이 number인 input에서 우측에 상하조절 화살표가 나오지 않게 하는 설정
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
  
        /* Firefox */
        input[type='number'] {
          -moz-appearance: textfield;
        }
      `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="mt-5 md:w-3/5 lg:w-2/5 mx-auto">
      <h2 className="font-bold text-xl">매물 정보를 입력해주세요.</h2>
      <ConfigProvider theme={theme}>
        <Form id="input-container" className="mt-5">
          <Form.Item required>
            <Search
              placeholder="주소"
              size="large"
              type="text"
              value={address}
              onSearch={handleAddressPopUp}
            />
          </Form.Item>
          <Form.Item required>
            <Input
              placeholder="상세 주소를 입력해주세요"
              size="large"
              type="text"
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
            />
          </Form.Item>
          <div className="mb-5">
            <RangePicker
              size="large"
              className="w-full"
              placeholder={["승계 가능 일자", "계약 종료 일자"]}
              value={date}
              onCalendarChange={handleValueChange}
            />
          </div>
          <div className="w-full flex justify-between">
            <Form.Item required>
              <Input
                placeholder="보증금"
                size="large"
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
              />
            </Form.Item>
            <Form.Item required>
              <Input
                placeholder="월세"
                size="large"
                type="text"
                value={charge}
                onChange={(e) => setCharge(e.target.value)}
              />
            </Form.Item>
          </div>
          <div className="w-full flex justify-between">
            <Form.Item required>
              <Input
                placeholder="관리비"
                size="large"
                type="text"
                value={maintanence}
                onChange={(e) => setMaintanence(e.target.value)}
              />
            </Form.Item>
            <Form.Item required>
              <Input
                placeholder="관리비 항목"
                size="large"
                type="text"
                value={maintanenceInfo}
                onChange={(e) => setMaintanenceInfo(e.target.value)}
              />
            </Form.Item>
          </div>
          <div className="w-full flex justify-between">
            <Form.Item required>
              <Input
                placeholder="면적"
                size="large"
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </Form.Item>
          </div>
        </Form>
        <div className="mt-5" id="how-many-room">
          <p className="text-lg">방 갯수</p>
          <div className="flex justify-center items-center">
            <Radio.Group onChange={handleRoomOption} value={room}>
              <Radio value={1}>1</Radio>
              <Radio value={2}>2</Radio>
              <Radio value={3}>3개 이상</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="mt-5" id="options">
          <p className="text-lg">옵션</p>
          <OptionBtnGroup />
          {/* 추가 옵션 부분 */}
          <div className="w-full mt-5">
            <div className="flex flex-wrap justify-center">
              {furnitureList.length > 0 ? (
                furnitureList.map((opt: any) => {
                  return (
                    <div
                      className={
                        "flex items-center border border-lime-500 rounded-full m-1 px-3 py-1 text-lime-500 bg-white"
                      }
                      key={opt}
                    >
                      {opt}
                      <CloseCircleOutlined
                        onClick={() => hadleFurnitureRemove(opt)}
                        className="cursor-pointer ms-3"
                      />
                    </div>
                  );
                })
              ) : (
                <p>등록된 가구가 없습니다.</p>
              )}
            </div>
            <div className="mt-2">
              {/* 희망 가구 옵션은 가구 icon을 버튼으로 만든 그룹을 컴포넌트로 만들어 활용 */}
              <InputBox
                placeholder="희망하는 가구 거래 품목을 입력해주세요."
                type="text"
                width={"auto"}
                value={furniture}
                onChange={(e) => setFurniture(e.target.value)}
                onKeyDown={(e) => handleFurnitureAppend(e)}
              />
            </div>
          </div>
          <div id="attachment-group">
            <Attachment fileType="사진" onFileChange={onFileChange} />
            <Attachment fileType="동영상" onFileChange={onFileChange} />
          </div>
          <div className="text-center mt-5">
            <Btn
              text="등록하기"
              backgroundColor="bg-yellow-300 hover:bg-yellow-400"
              height="h-10"
              onClick={handleUploadClick}
            />
          </div>
        </div>
      </ConfigProvider>
      <div className="h-24" />
    </div>
  );
};

export default ProductUpload;
