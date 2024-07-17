import React, { useState } from "react";

// 컴포넌트 불러오기
import TextBox from "../atoms/TextBox";
import InputBox from "../molecules/InputBox";
import PhoneInputBox from "../organism/PhoneInputBox";
import Btn from "../atoms/Btn";

const SignupPage: React.FC = () => {
  const [ name, setName ] = useState('')
  const [ socialNumber, setSocialNumber ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ certificationNumber, setCertificationNumber ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ passwordVerification, setPasswordVerification ] = useState('')

  const handleSignUp = (e: any):void => {
    e.preventDefault();
    const formData: FormData = new FormData();
    // formData.append()

  }
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="text-3xl font-bold m-6">
        <TextBox text="회원가입" />
      </div>
      <form>
        <InputBox
          id=""
          buttonType="cancel"
          placeholder="이름"
          size="large"
          type="email"
          width={400}
          height={50}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputBox
          placeholder="주민등록번호"
          buttonType="cancel"
          size="large"
          type="password"
          width={400}
          value={socialNumber}
          onChange={(e) => setSocialNumber(e.target.value)}
        />
        <PhoneInputBox
          placeholder="휴대폰 번호"
          buttonType="cancel"
          size="large"
          type="text"
          width={400}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <InputBox
          placeholder="인증번호 입력"
          buttonType="send"
          size="large"
          type="text"
          width={400}
          value={certificationNumber}
          onChange={(e) => setCertificationNumber(e.target.value)}
        />
        <InputBox
          placeholder="이메일"
          buttonType="cancel"
          size="large"
          type="email"
          width={400}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox
          placeholder="비밀번호"
          buttonType="cancel"
          size="large"
          type="password"
          width={400}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputBox
          placeholder="비밀번호 확인"
          buttonType="cancel"
          size="large"
          type="password"
          width={400}
          value={passwordVerification}
          onChange={(e) => setPasswordVerification(e.target.value)}
        />
        <div className="flex justify-center mt-20">
          <Btn text="다음" backgroundColor="lime-500" textColor="white"/>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
