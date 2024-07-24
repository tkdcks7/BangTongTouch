import React from "react";

// 컴포넌트
import InputBox from "../molecules/InputBox";
import DropDown from "../molecules/DropDown";
import Attachment from "../atoms/Attachment";
import Btn from "../atoms/Btn";
import OptionBtnGroup from "../molecules/OptionBtnGroup";
import InputGroup from "../molecules/InputGroup";
import RadioGroup from "../molecules/RadioGroup";

const ProductUpload: React.FC = () => {
  return (
    <div className="mt-5">
      <h2 className="font-bold text-xl">매물 정보를 입력해주세요.</h2>
      <form id="input-container" className="mt-5">
        <InputBox 
          buttonType="search"
          placeholder="주소 검색"
          width={"auto"}
        />
        <InputBox 
          placeholder="상세 주소를 입력해주세요"
          width={"auto"}
        />
        <InputGroup
          leftText="보증금"
          rightText="월세"
        />
        <InputGroup
          leftText="관리비"
          rightText="관리비 항목"
        />
        <InputGroup
          leftText="면적"
          rightText="남은 계약 기간"
        />
      </form>
      <div className="mt-5" id="how-many-room">
        <p className="text-lg">방 갯수</p>
        <RadioGroup />
      </div>
      <div className="mt-5" id="options">
        <p className="text-lg">옵션</p>
        <OptionBtnGroup />
        <div id="addtional-option-group" className="w-full mt-5">
          <DropDown 
            title="추가 옵션을 선택해주세요"
            itemList={["책상", "의자", "수납장", "에어프라이어", "오븐",]}
            width="full"
            textSize="base"
          />
          <div className="mt-2">
            <InputBox 
              placeholder="희망하는 가구 거래 품목을 입력해주세요."
              width={"auto"}
            />
          </div>
        </div>
        <div id="attachment-group">
          <Attachment 
            text="사진 첨부"
          />
          <Attachment 
            text="동영상 첨부"
          />
        </div>
        <div className="text-center mt-5">
          <Btn 
            text="등록하기"
            backgroundColor="yellow-300"
            height="h-10"
          />
        </div>
      </div>
    </div>
  )
}

export default ProductUpload