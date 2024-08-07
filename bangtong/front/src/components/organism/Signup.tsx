import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

// 컴포넌트 불러오기
import TextBox from "../atoms/TextBox";
import InputBox from "../molecules/InputBox";
import Btn from "../atoms/Btn";
import DropDown from "../molecules/DropDown";
import { Form, Input, ConfigProvider, Button, Space } from "antd";

// 아이콘
import { LineOutlined } from "@ant-design/icons";

const SignupPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [socialNumber, setSocialNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [certificationNumber, setCertificationNumber] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVerification, setPasswordVerification] = useState<string>("");
  const [page, setPage] = useState(0); // 페이지 넘기기 위한 변수
  const [form] = Form.useForm();

  const navigate = useNavigate();

  // 닉네임 생성용 배열 만들기
  const animalArr = [
    "생쥐",
    "송아지",
    "호랑이",
    "토끼",
    "용용이",
    "구렁이",
    "망아지",
    "양양이",
    "원숭이",
    "병아리",
    "댕댕이",
    "도야지",
  ];
  const adjectiveArr = [
    "귀여운",
    "구슬픈",
    "활기찬",
    "활발한",
    "침착한",
    "냉정한",
    "피곤한",
    "신난",
    "멍한",
    "맹렬한",
  ];

  // 랜덤 양의 정수 생성함수
  const randInt = (max: number): number => {
    return Math.floor(Math.random() * max);
  };

  // 닉네임 자동생성 함수
  const nickNameCreate = (): string => {
    return (
      adjectiveArr[randInt(10)] + animalArr[randInt(12)] + String(randInt(1000))
    );
  };

  // 일반 회원가입 함수
  const handleSignUp = (e: any): void => {
    // 주민번호를 기반으로 출생년도와 성별을 산출
    let birthYear: number = Number(socialNumber.slice(0, 2)) + 1900;
    // 2000년 이후 주민 앞자리의 경우
    if ([3, 4, 7, 8].includes(Number(socialNumber[6]))) {
      birthYear += 100;
    }

    // 성별은 주민번호 뒷자리 첫 자를 숫자로 변환 후 2로 나눈 나머지를 반환
    const gender: number = Number(socialNumber[6]) % 2;
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/users/register`,
      data: {
        username: email,
        email: email,
        name: name,
        password: password,
        birthYear: birthYear,
        gender: gender,
        nickname: nickNameCreate(),
      },
    })
      .then((response) => {
        console.log("성공적으로 전송됐습니다.", response.data);
        alert("회원 가입이 완료됐습니다."); // 확인용. refactoring 시 지울 것
        navigate("/user/login");
      })
      .catch((err) => console.log(err));
  };

  // 이메일 인증 요청 함수
  const handleMailSend = (e: any) => {
    console.log("이메일 인증 요청합니다");
    // 발송된 이메일이 없는 메일 혹은 존재하는 사용자이면 status 400번대 response
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/무언가의주소`, // url api 명세 만들고 바꿔주세요
      data: {
        email,
      },
    })
      .then((response) => alert("해당 이메일로 인증번호가 전송됐습니다."))
      .catch((err) => {
        console.log(err);
        alert(
          "인증번호 전송에 실패했습니다. 입력한 메일을 다시 한 번 확인해주세요."
        );
      });
  };

  // 메일 인증번호 확인 handler
  const handleCertificateConfirm = (e: any) => {
    console.log("인증번호 확인 요청합니다.");
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/무언가의주소`, // url api 명세 만들고 바꿔주세요
      data: {
        certificationNumber, // 이것도 Dto랑 맞춰야함
      },
    })
      .then((response) => console.log("인증 성공!")) // 이후 framer-motion으로 UI 동작 이어서 진행
      .catch((err) => {
        console.log(err);
        alert(
          "인증번호 전송에 실패했습니다. 입력한 메일을 다시 한 번 확인해주세요."
        );
      });
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

  // ant design 글로벌 디자인 토큰
  const theme = {
    token: {
      colorBgTextHover: "#E9FFE7",
      colorPrimary: "#129B07",
      colorPrimaryBorder: "#129B07",
      colorLinkHover: "#6EF962",
    },
  };

  const handleNext = async () => {
    try {
      await form.validateFields();
      setPage(page + 1);
    } catch (error) {
      console.log("유효성 검사 실패:", error);
    }
  };

  return (
    <>
      <div className="text-3xl text-center font-bold m-6">
        <TextBox text="회원가입" size="2xl" />
      </div>
      <ConfigProvider theme={theme}>
        <Form form={form}>
          {/* <InputBox
          placeholder="인증번호 입력"
          buttonType="send"
          size="large"
          type="text"
          value={certificationNumber}
          onChange={(e) => setCertificationNumber(e.target.value)}
        /> */}
          {page > 3 ? (
            <Form.Item
              name="이메일 인증"
              rules={[{ required: true, message: "이메일 인증이 필요합니다." }]}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <Input
                  placeholder="이메일 인증번호"
                  className="rounded-full border-2"
                  size="large"
                  allowClear
                  onChange={(e) => handleCertificateConfirm(e.target.value)}
                />
              </motion.div>
            </Form.Item>
          ) : null}
          {page > 2 ? (
            <Form.Item
              name="이메일"
              rules={[
                { required: true, message: "이메일을 입력해주세요." },
                {
                  type: "email",
                  message: "올바른 이메일을 입력해주세요.",
                },
              ]}
              hasFeedback
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <Space.Compact style={{ width: "100%" }}>
                  <Input
                    placeholder="이메일"
                    className="rounded-full border-2"
                    size="large"
                    allowClear
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button type="primary" size="large" className="rounded-full">
                    인증하기
                  </Button>
                </Space.Compact>
              </motion.div>
            </Form.Item>
          ) : null}
          {page > 1 ? (
            <Form.Item
              name="휴대폰 번호"
              rules={[
                { required: true, message: "휴대폰번호를 입력해주세요." },
                { min: 11, max: 11, message: "휴대폰 번호는 11자리 입니다." },
                { type: "string" },
              ]}
              hasFeedback
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <Input
                  placeholder="휴대폰 번호 (- 제외)"
                  className="rounded-full border-2"
                  size="large"
                  allowClear
                  minLength={11}
                  maxLength={11}
                  disabled={page !== 2}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </motion.div>
            </Form.Item>
          ) : null}
          {page > 0 ? (
            <Form.Item
              name="주민등록번호"
              rules={[
                { required: true, message: "주민등록번호를 입력해주세요." },
                { min: 7, max: 7, message: "앞 6자리 + 뒤 1자리" },
                {
                  type: "string",
                  message: "올바른 주민등록번호를 입력해주세요.",
                },
              ]}
              hasFeedback
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                className="flex"
              >
                <Input
                  placeholder="주민번호 (- 제외)"
                  className="rounded-full border-2"
                  size="large"
                  allowClear
                  value={socialNumber}
                  disabled={page !== 1}
                  maxLength={13}
                  onChange={(e) => setSocialNumber(e.target.value)}
                />
              </motion.div>
            </Form.Item>
          ) : null}
          {page >= 0 ? (
            <Form.Item
              name="이름"
              rules={[
                { required: true, message: "이름을 입력해주세요." },
                { type: "string" },
              ]}
              hasFeedback
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <Input
                  placeholder="이름"
                  className="rounded-full border-2"
                  size="large"
                  allowClear
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={page !== 0}
                />
              </motion.div>
            </Form.Item>
          ) : null}
          <div className="text-center">
            <Button
              type="primary"
              className="py-6 px-10 rounded-full text-lg"
              onClick={page + 1 === 6 ? handleSignUp : handleNext}
              htmlType="submit"
            >
              {page + 1 === 6 ? "회원가입" : "다음"}
            </Button>
          </div>
        </Form>
        <div className="text-lime-500 text-sm md:text-base mt-3 text-center">
          <Link to={"/user/login"}>로그인 화면으로</Link>
        </div>
      </ConfigProvider>
      {/* <Form
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
          height={50}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onIconClick={(e) => setName("")}
        />
        <InputBox
          placeholder="주민등록번호 뒷자리 첫 번째 숫자까지"
          buttonType="cancel"
          size="large"
          type="number"
          value={socialNumber}
          onChange={(e) => {
            if (e.target.value.length < 8) {
              setSocialNumber(e.target.value);
            }
          }}
          onIconClick={(e) => setSocialNumber("")}
        />
        <div className="flex items-center">
          <DropDown />
          <InputBox
            placeholder="전화번호 - 없이 숫자만 입력"
            buttonType="send"
            size="large"
            type="number"
            value={phone}
            onChange={(e) => {
              if (e.target.value.length < 12) {
                setPhone(e.target.value);
              }
            }}
            onIconClick={(e) => setPhone("")}
          />
        </div>
        <InputBox
          placeholder="이메일"
          buttonType="send"
          size="large"
          type="email"
          width={"70vw"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onIconClick={(e) => setEmail("")}
        /> */}
      {/* <InputBox
          placeholder="인증번호 입력"
          buttonType="send"
          size="large"
          type="text"
          value={certificationNumber}
          onChange={(e) => setCertificationNumber(e.target.value)}
        /> */}
      {/* <InputBox
          placeholder="비밀번호"
          buttonType="cancel"
          size="large"
          type="password"
          maxLength={20}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onIconClick={(e) => setPassword("")}
        />
        <InputBox
          placeholder="비밀번호 확인"
          buttonType="cancel"
          size="large"
          maxLength={20}
          type="password"
          id={
            password === "" ? "" : passwordVerification === password ? "q" : "e"
          }
          value={passwordVerification}
          onChange={(e) => setPasswordVerification(e.target.value)}
          onIconClick={(e) => setPasswordVerification("")}
        />
        <div className="text-lime-500 text-sm md:text-base mt-3 text-end">
          <Link to={"/user/login"}>로그인 화면으로</Link>
        </div>
        <div className="flex justify-center mt-10">
          <Btn
            text="다음"
            backgroundColor="bg-lime-500"
            textColor="white"
            onClick={handleSignUp}
          />
        </div> 
      </Form> */}
    </>
  );
};

export default SignupPage;
