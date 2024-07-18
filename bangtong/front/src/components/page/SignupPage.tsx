import React, { useState } from "react";
import axios from "axios";

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
    const formData: FormData = new FormData();  // formData 인스턴스 생성
    const birthYear: string = socialNumber.slice(0, 6)  // 생일은 주민번호 앞자리를 자름
    const gender:number = Number(socialNumber[6]) % 2 // 성별은 주민번호 뒷자리 첫 자를 숫자로 변환 후 2로 나눈 나머지를 반환. 추후 프로필수정에서 수정
    // formData에 전송할 값을 append
    formData.append("name", name)
    formData.append("phone", phone)
    formData.append("password", password)
    formData.append("birthYear", birthYear)
    formData.append("gender", gender.toString())
    console.log(`email = ${email} 입니다.`)
    console.log(`formData = ${formData} 입니다.`)
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:8080/user/register/',
      headers: {
        enctype: 'multipart/form-data', // 파일 형식 확인
        // 나중에는 인증 정보도 집어넣어야함.
      },
      data: formData,
    })
    .then(response => console.log('성공적으로 전송됐습니다.', response.data)) // 확인용. refactoring 시 지울 것
    .catch(error => console.log('전송 실패'))
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
          onChange={(e) => {
            console.log(email)
            setEmail(e.target.value)}}
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
          <Btn text="다음" backgroundColor="lime-500" textColor="white" onClick={handleSignUp}/>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
