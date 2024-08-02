import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// 컴포넌트 불러오기
import TextBox from "../atoms/TextBox";
import Btn from "../atoms/Btn";
import InputBox from "../molecules/InputBox";

const FindSelectPage: React.FC = () => {
  const navigate = useNavigate();

  const [isIdBtnShow, setIsIdBtnShow] = useState<boolean>(false);
  const [isMailChecked, setIsMailChecked] = useState<boolean>(false);
  const [isPwBtnShow, setIsPwBtnShow] = useState<boolean>(false);
  const [isAuthShow, setIsAuthShow] = useState<boolean>(false);

  const [phone, setPhone] = useState<string>("");
  const [maskedEmail, setMaskedEmail] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [auth, setAuth] = useState<string>("");

  const handleIdFindBtnClick: React.MouseEventHandler<HTMLElement> = (
    e: any
  ) => {
    setIsIdBtnShow(() => !isIdBtnShow);
    setIsPwBtnShow(() => false);
  };

  const handlePwFindBtnClick: React.MouseEventHandler<HTMLElement> = (
    e: any
  ) => {
    setIsPwBtnShow(() => !isPwBtnShow);
    setIsIdBtnShow(() => false);
  };

  // 전화번호를 보내서 연동된 메일이 있는지 확인하는 함수. 받아온 이메일은 마스킹 후 보여준다.
  const mailCheck: React.MouseEventHandler<HTMLElement> = (e: any) => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:8080/users/find/id",
      data: { phone }, // 전화번호를 넘겨 메일을 받아옴.
    })
      .then((response) => {
        const sentMail: string[] = response.data["email"].split("@");
        setMaskedEmail(() => "***" + sentMail[0].slice(3) + sentMail[1]);
        setIsMailChecked(true);
        console.log(`받아온 메일: ${sentMail}`); // 리팩토링 시 이 줄 삭제
      })
      .catch((error) => console.log("에러발생", error));
  };

  // 이메일을 입력하여 인증 메일 발송&인증번호 input을 띄우는 함수.
  const emailVerifiyHandler = (e: any) => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:8080/users/find/password",
      data: { email }, // 1차 검증으로 이메일을 전송.
    })
      .then((response) => setIsAuthShow(() => !isAuthShow)) // 인증번호입력 input을 띄움.
      .catch((error) => console.log("에러발생", error));
  };

  // 인증번호를 발송하여 맞는지 아닌지 확인
  const verifyAuthHandler = (e: any) => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:8080/users/find/password/auth",
      data: { email, auth }, // 2차 검증으로 이메일,  전송.
    })
      .then((response) => {
        console.log("비밀번호가 변경됐습니다.");
        alert("비밀번호가 변경됐습니다.");
        navigate("/user/login");
      }) // 비밀번호가 변경됨을 알리고 login page로 redirect
      .catch((error) => console.log("에러발생", error));
  };

  return (
    <>
      <div className="text-3xl text-center font-bold m-6">
        <TextBox text="아이디/비밀번호 찾기" size="2xl" />
      </div>
      <div className="flex justify-center mt-5">
        <Btn
          text="아이디 찾기"
          backgroundColor="bg-lime-500"
          textColor="white"
          onClick={handleIdFindBtnClick}
        />
      </div>
      <div
        className={`flex justify-center mt-5 ${isIdBtnShow ? "" : "hidden"}`}
      >
        <InputBox
          placeholder="핸드폰 번호(- 없이 숫자만 입력)"
          buttonType="send"
          size="small"
          type="text"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            console.log(phone);
          }}
          width={"70vw"}
        />
        {/* input send가 안돼서 임시로 넣음. 구현되면 제거할 것 */}
        <Btn
          text="전송"
          backgroundColor="bg-lime-500"
          textColor="white"
          width="w-24"
          height="h-12"
          onClick={mailCheck}
        />
      </div>

      {/* 이메일 확인이 끝날 시, "메일은 ~~~입니다." 라고 알려주는 div */}
      <div
        className={`flex justify-center mt-5 ${isMailChecked ? "" : "hidden"}`}
      >
        <TextBox text={`이메일은 ${maskedEmail} 입니다.`} size="xl" />
      </div>

      <div className="flex justify-center mt-5">
        <Btn
          text="비밀번호 찾기"
          backgroundColor="bg-yellow-300"
          textColor="white"
          onClick={handlePwFindBtnClick}
        />
      </div>
      <div
        className={`flex justify-center mt-5 ${isPwBtnShow ? "" : "hidden"}`}
      >
        <InputBox
          placeholder="이메일"
          buttonType="send"
          size="small"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            console.log(email);
          }}
          width={"70vw"}
        />
        {/* input send가 안돼서 임시로 넣음. 구현되면 제거할 것 */}
        <Btn
          text="전송"
          backgroundColor="bg-lime-500"
          textColor="white"
          width="w-24"
          height="h-12"
          onClick={emailVerifiyHandler}
        />
      </div>
      <div className={`flex justify-center mt-5 ${isAuthShow ? "" : "hidden"}`}>
        <InputBox
          placeholder="인증번호 입력"
          buttonType="send"
          size="small"
          type="text"
          value={auth}
          onChange={(e) => setAuth(e.target.value)}
          width={"70vw"}
        />
        {/* input send가 안돼서 임시로 넣음. 구현되면 제거할 것 */}
        <Btn
          text="인증번호 전송"
          backgroundColor="bg-lime-500"
          textColor="white"
          width="w-24"
          height="h-12"
          onClick={verifyAuthHandler}
        />
      </div>

      <div className="text-lime-500 text-sm md:text-base mt-3 text-center">
        <Link to={"/user/login"}>로그인 화면으로</Link>
      </div>
    </>
  );
};

export default FindSelectPage;
