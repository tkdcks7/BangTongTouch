import React, { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import axios from "axios";

// 컴포넌트
import InputBox from "../molecules/InputBox";
import DropDown from "../molecules/DropDown";
import Attachment from "../atoms/Attachment";
import Btn from "../atoms/Btn";
import OptionBtnGroup from "../molecules/OptionBtnGroup";
import RadioGroup from "../molecules/RadioGroup";

const ProductUpload: React.FC = () => {
  // 백엔드에 넘겨줄 데이터를 위한 state
  const [address, setAddress] = useState<string>("");
  const [addressDetail, setAddressDetail] = useState<string>("");
  const [deposit, setDeposit] = useState<string>("0");
  const [charge, setCharge] = useState<string>("0");
  const [maintanence, setMaintanence] = useState<string>("0");
  const [maintanenceInfo, setMaintanenceInfo] = useState<string>("");
  const [area, setArea] = useState<string>("0");
  const [remainDate, setRemainDate] = useState<string>("0");
  const [room, setRoom] = useState<string>("");
  const [furniture, setFurniture] = useState<string>("");

  // 사진, 영상 state
  const [imgFile, setImgFile] = useState(null);
  const [movieFile, setMovieFile] = useState(null);

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

  // input의 placeholder를 우측으로 두기 위한 style설정. 아직 시도 못함.
  const styles = {
    input: {
      textAlign: "right",
    },
    placeholder: `
      ::placeholder {
        text-align: right;
      }
    `,
  };

  const handleFileChange = (fileInput: any, fileType: string) => {
    if (fileInput) {
      let extensionAllowed: string[] = [];
      const extensionName = fileInput.name.split(".").pop().toLowerCase();
      if (fileType === "사진") {
        extensionAllowed = ["jpg", "png", "gif"];
      } else if (fileType === "영상") {
        extensionAllowed = ["mp4"];
      } else {
        if (fileType === "사진") {
          setImgFile(null);
          alert(
            "지원하지 않는 형식의 파일입니다\n*확장자가 jpg, png, gif인 파일만 등록 가능"
          );
        } else {
          setMovieFile(null);
          alert(
            "지원하지 않는 형식의 파일입니다\n*확장자가 mp4인 파일만 등록 가능"
          );
        }
        return;
      }
      if (extensionAllowed.includes(extensionName)) {
        if (fileType === "사진") {
          setImgFile(fileInput);
        } else {
          setMovieFile(fileInput);
        }
      }
    }
  };

  // 매물 업로드 함수
  const handleUploadClick = () => {
    console.log(`이미지파일은 ${imgFile}입니다.`);
    const formData = new FormData();

    // 보낼 값을 formData에 append
    formData.append("address", address);
    formData.append("addressDetail", addressDetail);
    formData.append("deposit", deposit);
    formData.append("charge", charge);
    formData.append("maintanence", maintanence);
    formData.append("maintanenceInfo", maintanenceInfo);
    formData.append("area", area);
    formData.append("remainDate", remainDate);
    formData.append("room", room);
    formData.append("furniture", furniture);

    // 이미지와 영상은 null이면 안올려야하나, 임시로 올릴 수 있도록 작성
    if (imgFile) {
      formData.append("imgFile", imgFile);
    }

    if (movieFile) {
      formData.append("movieFile", movieFile);
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
          // onChange={(e) => setAddress(e.target.value)} 주소검색을 제외한 입력을 막기 위해 비활성화
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
          <InputBox
            placeholder="남은 계약기간"
            size="large"
            type="text"
            width={"45%"}
            value={remainDate}
            onChange={(e) => setRemainDate(e.target.value)}
          />
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
        <div className="w-full mt-5">
          <DropDown
            title="추가 옵션을 선택해주세요"
            itemList={["책상", "의자", "수납장", "에어프라이어", "오븐"]}
            width="full"
            textSize="base"
          />
          <div className="mt-2">
            <InputBox
              placeholder="희망하는 가구 거래 품목을 입력해주세요."
              type="text"
              width={"auto"}
              value={furniture}
              onChange={(e) => setFurniture(e.target.value)}
            />
          </div>
        </div>
        <div id="attachment-group">
          <Attachment fileType="사진" onFileChange={handleFileChange} />
          <Attachment fileType="동영상" onFileChange={handleFileChange} />
        </div>
        <div className="text-center mt-5">
          <Btn
            text="등록하기"
            backgroundColor="yellow-300"
            height="h-10"
            onClick={handleUploadClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
