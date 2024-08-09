import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

// 컴포넌트 불러오기
import TextBox from "../atoms/TextBox";
import { Button, ConfigProvider, Input, Modal, Form, Space } from "antd";

const FindSelectPage: React.FC = () => {
  const navigate = useNavigate();

  const [isIdModalOpen, setIsIdModalOpen] = useState(false);
  const [isMailChecked, setIsMailChecked] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  const [phone, setPhone] = useState<string>("");
  const [maskedEmail, setMaskedEmail] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [auth, setAuth] = useState<string>("");
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true);
  const [isAuthValid, setIsAuthValid] = useState<boolean>(true);

  const [isIdActive, setIsIdActive] = useState<boolean>(true);
  const [isIdAuthAtive, setIsIdAuthAtive] = useState<boolean>(false);

  // ant design 글로벌 디자인 토큰
  const theme = {
    token: {
      colorBgTextHover: "#E9FFE7",
      colorPrimary: "#129B07",
      colorPrimaryBorder: "#129B07",
      colorLinkHover: "#6EF962",
    },
  };

  const [form] = Form.useForm();

  // 전화번호를 보내서 연동된 메일이 있는지 확인하는 함수. 받아온 이메일은 마스킹 후 보여준다.
  const mailCheck: React.MouseEventHandler<HTMLElement> = (e: any) => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/users/find/id`,
      data: { phone }, // 전화번호를 넘겨 메일을 받아옴.
    })
      .then((response) => {
        console.log(response);
        if (response.data.data["email"].includes("@")) {
          const sentMail: string[] = response.data.data["email"].split("@");
          setMaskedEmail(() => "***" + sentMail[0].slice(3) + sentMail[1]);
          console.log(`받아온 메일: ${sentMail}`); // 리팩토링 시 이 줄 삭제
          setIsMailChecked(true);
        } else {
          setMaskedEmail(response.data.data["email"]);
        }
      })
      .catch((error) => console.log("에러발생", error));
  };

  // 인증번호를 발송하여 맞는지 아닌지 확인
  const verifyAuthHandler = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/users/find/password/auth`,
      data: { email, auth }, // 이메일, auth 전송.
    })
      .then((response) => {
        console.log("비밀번호가 변경됐습니다.");
        alert(
          `비밀번호가 변경됐습니다. 변경된 비밀번호는 ${response.data.data.user.password} 입니다.`
        );
        navigate("/user/login");
      }) // 비밀번호가 변경됨을 알리고 login page로 redirect
      .catch((error) => console.log("에러발생", error));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPhoneValid(true);
    const newValue = e.target.value;
    // 정규식을 사용하여 0-9 이외의 문자 제거
    if (/^\d*$/.test(newValue)) {
      setPhone(newValue);
    } else {
      setIsPhoneValid(false);
    }
  };

  const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPhoneValid(true);
    const newValue = e.target.value;
    // 정규식을 사용하여 0-9 이외의 문자 제거
    if (/^\d*$/.test(newValue)) {
      setAuth(newValue);
    } else {
      setIsAuthValid(false);
    }
  };

  return (
    <>
      <ConfigProvider theme={theme}>
        <div className="text-3xl text-center font-bold m-6">
          <div className="flex flex-col items-center mt-10">
            <div className="flex space-x-1">
              <span
                className={`hover:text-lime-500 hover:cursor-pointer text-2xl hover:underline ${isIdActive ? `text-lime-500 underline underline-offset-8` : "text-gray-400"}`}
                onClick={() => setIsIdActive(true)}
              >
                아이디
              </span>
              <span
                className={`hover:text-lime-500 hover:cursor-pointer text-2xl ${!isIdActive ? `text-lime-500 underline underline-offset-8` : "text-gray-400"}`}
                onClick={() => setIsIdActive(false)}
              >
                비밀번호
              </span>
              <span className={"text-2xl"}>찾기</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <Form form={form}>
            {isIdActive ? (
              <Form.Item
                name="이메일 인증"
                rules={[{ required: true, message: "숫자만 입력하세요" }]}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1,
                    ease: [0, 0.7, 0.2, 1],
                  }}
                >
                  <Space.Compact className="flex items-center">
                    <Input
                      placeholder="전화번호 숫자만 입력"
                      className="rounded-full border-2"
                      size="large"
                      value={phone}
                      onChange={(e) => handlePhoneChange(e)}
                      status={isPhoneValid ? "" : "error"}
                      allowClear
                    />
                    <Button
                      type="primary"
                      size="large"
                      className="text-sm rounded-full"
                      onClick={mailCheck}
                    >
                      확인
                    </Button>
                  </Space.Compact>
                </motion.div>
              </Form.Item>
            ) : (
              <>
                {/* 인증번호 form */}
                {isIdAuthAtive ? (
                  <Form.Item name="인증번호">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1,
                        ease: [0, 0.7, 0.2, 1],
                      }}
                    >
                      <Space.Compact className="flex items-center">
                        <Input
                          placeholder="인증번호를 입력하세요"
                          className="rounded-full border-2"
                          size="large"
                          value={auth}
                          status={isAuthValid ? "" : "error"}
                          onChange={(e) => handleAuthChange(e)}
                          allowClear
                        />
                        <Button
                          type="primary"
                          size="large"
                          className="text-sm rounded-full"
                        >
                          전송
                        </Button>
                      </Space.Compact>
                    </motion.div>
                  </Form.Item>
                ) : (
                  <></>
                )}

                {/* 이메일 form */}
                <Form.Item
                  name="이메일"
                  rules={[{ required: true, message: "이메일을 입력하세요" }]}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1,
                      ease: [0, 0.7, 0.2, 1],
                    }}
                  >
                    <Space.Compact className="flex items-center">
                      <Input
                        placeholder="이메일을 입력하세요"
                        className="rounded-full border-2"
                        size="large"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        allowClear
                      />
                      <Button
                        type="primary"
                        size="large"
                        className="text-sm rounded-full"
                        onClick={() => setIsIdAuthAtive(true)}
                      >
                        확인
                      </Button>
                    </Space.Compact>
                  </motion.div>
                </Form.Item>
              </>
            )}
          </Form>
        </div>

        <div className="flex justify-center mt-5">
          {/* 이메일 확인이 끝날 시, "메일은 ~~~입니다." 라고 알려주는 div */}
          <div
            className={`flex justify-center mt-2 bg-yellow-200 text-center p-3 rounded-md shadow-md max-w-xs mx-auto ${isMailChecked ? "" : "hidden"}`}
          >
            <TextBox text={`이메일은 ${maskedEmail} 입니다.`} size="xl" />
          </div>
        </div>
        <div className="text-lime-500 text-sm md:text-base mt-3 text-center">
          <Link to={"/user/login"}>로그인 화면으로</Link>
        </div>
        <Modal
          title="아이디 찾기"
          open={isIdModalOpen}
          onOk={(e) => {
            mailCheck(e);
            setIsIdModalOpen(false);
          }}
          onCancel={() => setIsIdModalOpen(false)}
        >
          <Input
            placeholder="본인의 휴대전화번호를 숫자만 입력하세요"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Modal>
        <Modal
          title="비밀번호 찾기"
          open={isAuthOpen}
          onOk={() => {
            verifyAuthHandler();
            setIsAuthOpen(false);
          }}
          onCancel={() => setIsAuthOpen(false)}
        >
          <Input
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="인증번호를 입력하세요"
            value={auth}
            onChange={(e) => setAuth(e.target.value)}
          />
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default FindSelectPage;
