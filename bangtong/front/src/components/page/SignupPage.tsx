import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// 컴포넌트 불러오기
import TextBox from "../atoms/TextBox";
import InputBox from "../molecules/InputBox";
import Btn from "../atoms/Btn";
import DropDown from "../molecules/DropDown";
import { redirect } from "react-router-dom";

const SignupPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [socialNumber, setSocialNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [certificationNumber, setCertificationNumber] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVerification, setPasswordVerification] = useState<string>("");
  const signUpVariants = {
    inital: {
      y: 0,
    },
    target: {
      y: -10,
    },
  };

  const handleSignUp = (e: any): void => {
    if (name === "") {
      alert("이름을 입력해주세요");
      return;
    }
    console.log(email.includes("@"));
    if (socialNumber.length < 7) {
      alert("올바른 주민번호를 입력해주세요");
      return;
    }
    if (email === "" && email.includes("@") === false) {
      alert("올바른 이메일을 입력해주세요");
      return;
    }
    if (password === "") {
      alert("올바른 비밀번호를 입력해주세요");
      return;
    }
    if (password !== passwordVerification) {
      alert("비밀번호가 다릅니다. 다시 입력해주세요");
      return;
    }

    const formData: FormData = new FormData(); // formData 인스턴스 생성
    const birthYear: string = socialNumber.slice(0, 6); // 생일은 주민번호 앞자리를 자름
    const gender: number = Number(socialNumber[6]) % 2; // 성별은 주민번호 뒷자리 첫 자를 숫자로 변환 후 2로 나눈 나머지를 반환. 추후 프로필수정에서 수정
    // formData에 전송할 값을 append
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("birthYear", birthYear);
    formData.append("gender", gender.toString());
    console.log(`email = ${email} 입니다.`);
    console.log(`formData = ${formData} 입니다.`);
    axios({
      method: "POST",
      url: "http://127.0.0.1:8080/user/register/",
      headers: {
        enctype: "multipart/form-data", // 파일 형식 확인
        // 나중에는 인증 정보도 집어넣어야함.
      },
      data: formData,
    })
      .then((response) =>
        console.log("성공적으로 전송됐습니다.", response.data)
      ) // 확인용. refactoring 시 지울 것
      .catch((error) => console.log("전송 실패"));
    alert("회원가입이 완료되었습니다!");
    redirect("/user/login");
  };
  return (
    <motion.div
      variants={signUpVariants}
      initial="inital"
      animate="target"
      transition={{
        ease: "easeInOut",
        duration: 0.7,
        repeatDelay: 3,
      }}
      className="h-screen flex flex-col items-center justify-center"
    >
      <div className="text-3xl font-bold m-6">
        <TextBox text="회원가입" size="2xl" />
      </div>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <InputBox
          id=""
          buttonType="cancel"
          placeholder="이름"
          size="large"
          type="string"
          width={"70vw"}
          height={50}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <InputBox
          placeholder="주민등록번호 뒷자리 첫 번째 숫자까지"
          buttonType="cancel"
          size="large"
          type="number"
          width={"70vw"}
          value={socialNumber}
          onChange={(e) => {
            if (e.target.value.length < 8) {
              setSocialNumber(e.target.value);
            }
          }}
        />
        <div className="flex items-center" style={{ width: "70vw" }}>
          <DropDown />
          <InputBox
            placeholder="전화번호 - 없이 숫자만 입력"
            buttonType="send"
            size="large"
            width={"100%"}
            type="number"
            value={phone}
            onChange={(e) => {
              if (e.target.value.length < 12) {
                setPhone(e.target.value);
              }
            }}
          />
        </div>
        <InputBox
          placeholder="인증번호 입력"
          buttonType="send"
          size="large"
          type="text"
          width={"70vw"}
          value={certificationNumber}
          onChange={(e) => setCertificationNumber(e.target.value)}
        />
        <InputBox
          placeholder="이메일"
          buttonType="cancel"
          size="large"
          type="email"
          width={"70vw"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <InputBox
          placeholder="비밀번호"
          buttonType="cancel"
          size="large"
          type="password"
          maxLength={20}
          width={"70vw"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputBox
          placeholder="비밀번호 확인"
          buttonType="cancel"
          size="large"
          maxLength={20}
          type="password"
          width={"70vw"}
          id={
            password === "" ? "" : passwordVerification === password ? "q" : "e"
          }
          value={passwordVerification}
          onChange={(e) => setPasswordVerification(e.target.value)}
        />
        <div className="flex justify-center mt-20">
          <Btn
            text="다음"
            backgroundColor="lime-500"
            textColor="white"
            onClick={handleSignUp}
          />
        </div>
      </form>
    </motion.div>
  );
};

export default SignupPage;
