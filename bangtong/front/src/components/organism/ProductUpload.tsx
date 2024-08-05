import React, { useState, useEffect } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useParams } from "react-router-dom";
import axios from "axios";
import authAxios from "../../utils/authAxios";
import dayjs from "dayjs";
import { getUserAddressNum } from "../../utils/services";

// 컴포넌트
import InputBox from "../molecules/InputBox";
import Attachment from "../atoms/Attachment";
import Btn from "../atoms/Btn";
import OptionBtnGroup from "../molecules/OptionBtnGroup";
import RadioGroup from "../molecules/RadioGroup";
import useProductOptionStore from "../../store/productStore";
import { Button, DatePicker, Popover } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

// 매물 업로드에 필요한 json의 인터페이스
interface ProductUploadDto {
  type: String;
  regionId: String;
  address: String;
  deposit: number;
  rent: number;
  maintenance: number;
  maintenanceInfo: String;
  isRentSupportable: Boolean;
  isFurnitureSupportable: Boolean;
  square: number;
  room: number;
  option: number;
  additionalOption: String[];
  startDate: Date;
  endDate: Date;
  AddressDetail: String;
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
  const [remainDate, setRemainDate] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [furniture, setFurniture] = useState<string>("");
  const [furnitureList, setFurnitureList] = useState<string[]>([]);

  // 사진, 영상 state
  const [imgFile, setImgFile] = useState(null);
  const [movieFile, setMovieFile] = useState(null);

  // Datepicker를 위한 state
  const [date, setDate] = useState(["0000-00-00", "0000-00-00"]);

  // 날짜 선택창
  const { RangePicker } = DatePicker;

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
        setImgFile(() => fileInput);
      } else if (extensionName === "mp4" && fileType === "영상") {
        setMovieFile(() => fileInput);
      } else {
        window.alert(
          "지원하지 않는 형식의 파일입니다\n*확장자가 jpg, png, gif, mp4인 파일만 등록 가능"
        );
      }
    }
  };

  const handelChange = (dates: any) => {
    setDate([dates[0], dates[1]]);
  };

  const datePicker = (
    <RangePicker
      className="w-full"
      placeholder={["입주 가능일", "계약종료일"]}
      onChange={handelChange}
    />
  );

  //   productAddress: String,
  //   productDeposit: Integer,
  //   productRent: Integer,
  //   productMaintenence: Integer,
  //   productMaintenenceInfo: Integer,
  //   productSquare: Float,
  //   productRoom: Integer,
  //   productOption: String,
  //   productIsSupportable: Boolean,
  //   productIsFurnitureSupportable: Boolean,
  //   productAdditionalOption: String,
  //   productStartDate: String,
  //   productEndDate: String
  //   productPostDate: String,
  //   productIsBanned: Boolean,
  //   productIsDeleted: Boolean,

  // 추가 옵션 등록 함수
  const handleFurnitureAppend = (e: any) => {
    if (e.key === "Enter" && furniture) {
      setFurnitureList(() => [...furnitureList, furniture]);
      console.log(`가구가 추가됐습니다. 총 가구는 ${furnitureList} 입니다.`);
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
    // interface ProductUploadDto {
    //   type: String;
    //   regionId: String;
    //   address: String;
    //   deposit: number;
    //   rent: number;
    //   maintenance: number;
    //   maintenanceInfo: String;
    //   isRentSupportable: Boolean;
    //   isFurnitureSupportable: Boolean;
    //   square: number;
    //   room: number;
    //   option: number;
    //   additionalOption: String[];
    //   startDate: Date;
    //   endDate: Date;
    //   AddressDetail: String;
    //   lat: number;
    //   lng: number;
    //   }

    const lnum = async () => {
      const [lat, lng] = await getUserAddressNum(address);
    };

    // 이부분 수정중!!!!
    const productUploadDto: ProductUploadDto = {
      address,
      deposit: Number(deposit),
      rent: Number(charge),
      maintenance: Number(maintanence),
      maintenanceInfo: maintanenceInfo,
      square: Number(area),
      room: Number(room),
      additionalOption: furnitureList,
      startDate: dayjs(date[0]).toDate(),
      endDate: dayjs(date[1]).toDate(),
      AddressDetail: addressDetail,
    };
    const formData = new FormData();

    // 보낼 값을 formData에 append
    formData.append("productAddress", address);
    formData.append("addressDetail", addressDetail);
    formData.append("productDeposit", deposit);
    formData.append("productRent", charge);
    formData.append("productMaintenence", maintanence);
    formData.append("productMaintenenceInfo", maintanenceInfo);
    formData.append("productSquare", area);
    formData.append("remainDate", remainDate);
    formData.append("productRoom", room);
    formData.append("furniture", furniture);
    formData.append("productStartDate", dayjs(date[0]).format("YYYY-MM-DD"));
    formData.append("productEndDate", dayjs(date[1]).format("YYYY-MM-DD"));

    // Option 처리 부분
    let option: string = "0000000";
    if (optionObj["풀옵션"]) {
      option = "1111111";
    } else {
      const optionArr = (
        Object.keys(optionObj) as (keyof typeof optionObj)[]
      ).map((opt) => {
        return optionObj[opt] ? "1" : "0";
      });
      option = optionArr.slice(1).join("");
    }
    formData.append("productOption", option);

    // 이미지와 영상 업로드
    if (imgFile) {
      formData.append(`productMedia[0]`, imgFile);
    }
    if (movieFile) {
      formData.append(`productMedia[1]`, movieFile);
    }

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/products/upload`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
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
    <div className="mt-5">
      <h2 className="font-bold text-xl">매물 정보를 입력해주세요.</h2>
      <form id="input-container" className="mt-5">
        <InputBox
          placeholder="주소"
          buttonType="search"
          size="large"
          type="text"
          width={"70vw"}
          value={address}
          onIconClick={handleAddressPopUp}
        />
        <InputBox
          placeholder="상세 주소를 입력해주세요"
          type="text"
          value={addressDetail}
          onChange={(e) => setAddressDetail(e.target.value)}
          width={"auto"}
        />
        <div className="w-full flex justify-between">
          <InputBox
            placeholder="보증금"
            size="large"
            type="number"
            width={"45%"}
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
          />
          <InputBox
            placeholder="월세"
            size="large"
            type="text"
            width={"45%"}
            value={charge}
            onChange={(e) => setCharge(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-between">
          <InputBox
            placeholder="관리비"
            size="large"
            type="text"
            width={"45%"}
            value={maintanence}
            onChange={(e) => setMaintanence(e.target.value)}
          />
          <InputBox
            placeholder="관리비 항목"
            size="large"
            type="text"
            width={"45%"}
            value={maintanenceInfo}
            onChange={(e) => setMaintanenceInfo(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-between">
          <InputBox
            placeholder="면적"
            size="large"
            type="text"
            width={"45%"}
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
          <div style={{ width: "45%" }}>
            <Popover
              trigger="click"
              placement="bottom"
              title={
                <p className="text-center mb-3">
                  양도 가능 기간을 설정해주세요.
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
          </div>
        </div>
      </form>
      <div className="mt-5" id="how-many-room">
        <p className="text-lg">방 갯수</p>
        <div className="flex justify-center items-center">
          <RadioGroup onChange={handleRoomOption} />
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
                  <button
                    className={
                      "flex flex-col items-center border border-lime-500 rounded-full m-1 px-3 py-1 text-lime-500 bg-white"
                    }
                    onClick={() => hadleFurnitureRemove(opt)}
                  >
                    {opt}
                  </button>
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
            backgroundColor="bg-yellow-300"
            height="h-10"
            onClick={handleUploadClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
