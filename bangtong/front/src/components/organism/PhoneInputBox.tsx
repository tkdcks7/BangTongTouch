import { InputHTMLAttributes } from "react";
import InputBar from "../atoms/InputBar";
import IconBtn from "../atoms/IconBtn";
import DropDown from "../molecules/DropDown";

// 아이콘
import Cancel from "../../assets/CancelCircle.png"
import RedCancel from "../../assets/RedCancelCircle.png"
import Check from "../../assets/CheckCircle.png"
import DropDownIcon from "../../assets/DropDownIcon.png"
import Send from "../../assets/Send.png"

/**
 * 검증 오류가 발생하였을 경우 id 값을 "e" 검증이 되었을 경우 "q", 기본 상태 "" 처럼 빈 값 string 변수로 전달
 * password, email 등의 type 전달
 * placeholder 전달
 * size => 글자 크기
 * width, height 픽셀 단위 크기
 * 추후 상태 관리 추가하여 기본 상태에서 포커싱 될 때 초록색 아웃라인 설정과
 * X 버튼 눌렀을 때 input 값 지우는 로직 작성하여야 함.
 * 
 * <InputBox
      placeholder="이메일 (아이디)"
      size="small"
      type="email"
      id=""
      width={400}
      height={96}
    />

 */

interface PhoneInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  helperText?: string;
  error?: boolean;
  size?: "small" | "medium" | "large";
  buttonType?: string;  // cancel, check, dropdown, send
}

const PhoneInputBox: React.FC<PhoneInputProps> = ({
  helperText,
  error = false,
  placeholder,
  buttonType,
  size,
  type,
  id,
  width,
  height,
  ...props
}) => {
  const errorClasses =
    "border-red-500 focus:border-red-500 focus:ring-red-500 text-red-600 focus:text-red-500";
  const qualifiedClasses =
    "border-lime-500 bg-lime-500 text-white focus:text-white";

  const baseInputClasses = `flex items-center mt-1 px-3 py-2 bg-white border-2 border-gray-300 block rounded-full
${id === "" ? "focus:ring-lime-500" : ""}
    ${id === "e" ? errorClasses : ""}
    ${id === "q" ? qualifiedClasses : ""}}`;
  
  const inputStyle: React.CSSProperties = {};
  if (width) inputStyle.width = width;
  if (height) inputStyle.height = height;

  let whatBtn = '';

  if (buttonType === "cancel") {
    whatBtn = Cancel;
  } else if (buttonType === "check") {
    whatBtn = Check;
  } else if (buttonType === "dropdown") {
    whatBtn = DropDownIcon;
  } else {
    whatBtn = Send;
  }

  return (
      <div style={inputStyle}>
        <div className={baseInputClasses}>
          <div className="me-3">
            <DropDown />
          </div>
          <InputBar
            placeholder={placeholder}
            size={size}
            type={type}
            id={id}
            width={width}
            height={height}
          />
          <IconBtn 
            imgSrc={whatBtn}
            size={20}
          />
        </div>
      {helperText && (
        <p
          className={`mt-1 text-sm ${error ? "text-red-500" : "text-gray-500"}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default PhoneInputBox;
