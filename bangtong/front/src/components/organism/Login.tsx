import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import useUserStore from "../../store/userStore";

// 컴포넌트 불러오기
import { Form, Input, Button, message, ConfigProvider } from "antd";
import TextBox from "../atoms/TextBox";
import IconBtn from "../atoms/IconBtn";

// 이미지 소스
import Google from "../../assets/GoogleSocial.png";
import Kakao from "../../assets/KakaoSocial.png";
import Naver from "../../assets/NaverSocial.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setInfoUpdate, setToken } = useUserStore(); // store
  const navigate = useNavigate();
  const [form] = Form.useForm(); // antd
  const [isRejected, setIsRejected] = useState(false);

  if (token) {
    navigate("/");
  }

  interface LoginInfo {
    username: string;
    password: string;
  }

  // ant design 글로벌 디자인 토큰
  const theme = {
    token: {
      colorBgTextHover: "#E9FFE7",
      colorPrimary: "#129B07",
      colorPrimaryBorder: "#129B07",
      colorLinkHover: "#6EF962",
    },
  };

  // 소셜 로그인
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const code = searchParams.get("code");
  const stateCode = searchParams.get("state");

  if (stateCode === "1234") {
    const formData: FormData = new FormData();
    formData.append("grant_type", "code");
    formData.append("client_id", process.env.REACT_APP_CLIENT_ID_NAVER + "");
    formData.append(
      "client_secret",
      process.env.REACT_APP_CLIENT_SECRET_NAVER + ""
    );
    formData.append("code", code + "");
    formData.append("state", stateCode);
    axios({
      method: "POST",
      url: "https://nid.naver.com/oauth2.0/token",
      data: formData,
    })
      .then((response) => {
        console.log(response.data, " 성공적");
      })
      .catch((error) => console.log("전송 실패", error));
  }

  // 일반 로그인함수
  const handleLogIn = (): void => {
    if (email === "") {
      alert("이메일을 입력해주세요");
      return;
    }
    if (password === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }
    const payload: LoginInfo = {
      username: email,
      password: password,
    };
    console.log(payload);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/users/login`,
      data: payload,
    })
      .then((response) => {
        console.log(response, "response입니다.");
        console.log(response.config.data, "성공적으로 전송됨");
        console.log(response.headers);
        setInfoUpdate(response.data.data);
        setToken(response.headers.authorization);
        navigate("../../");
      })
      .catch((error) => {
        console.log("전송 실패", error);
        setIsRejected(true);
      });
  };

  // 네이버 로그인 함수
  const handleNaverLogin = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID_NAVER;
    const redirectUri = encodeURIComponent(
      process.env.REACT_APP_CALLBACK_URL_NAVER + ""
    );
    const state = "1234";
    const naverLoginUri = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${redirectUri}`;
    window.open(naverLoginUri, "_blank", "width=600,height=600");
  };

  // 구글 로그인 함수
  const handleGoogleLogin = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID_GOOGLE;
    const redirectUri = encodeURIComponent(
      process.env.REACT_APP_CALLBACK_URL_GOOGLE + ""
    );
    const googleLoginUri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email`;
    window.open(googleLoginUri, "_blank", "width=600,height=600");
  };

  // 카카오 로그인 함수
  const handleKakaotalkLogin = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID_KAKAOTALK;
    const redirectUri = encodeURIComponent(
      process.env.REACT_APP_CALLBACK_URL_KAKAOTALK + ""
    );
    const kakaotalkLoginUri = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=profile_nickname profile_image`;
    window.open(kakaotalkLoginUri, "_blank", "width=600,height=600");
  };

  return (
    <>
      <div className="font-bold m-6 text-center">
        <TextBox text="로그인" size="2xl" />
      </div>
      <ConfigProvider theme={theme}>
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item
            name="이메일 (아이디)"
            rules={[
              { required: true, message: "아이디(이메일)를 입력하세요" },
              {
                type: "email",
                warningOnly: true,
                message: "이메일은 @ 기호를 포함해야 합니다.",
              },
              { type: "string" },
            ]}
            hasFeedback
            style={{ marginBottom: "8px" }}
          >
            <Input
              placeholder="이메일 (아이디)"
              className="rounded-full border-2"
              size="large"
              allowClear
              prefix={<UserOutlined />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="비밀번호"
            rules={[{ required: true, message: "" }]}
            style={{ marginBottom: "8px" }}
            hasFeedback
          >
            <Input.Password
              placeholder="비밀번호"
              className="rounded-full border-2"
              size="large"
              allowClear
              prefix={<LockOutlined />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <div className="flex justify-between text-sm md:text-base text-lime-500">
            <Link to="/user/FindSelectPage">아이디/비밀번호 찾기</Link>
            <Link to="/user/register">회원가입</Link>
          </div>
          <div className="flex justify-center mt-3">
            <div className="mx-2">
              <IconBtn imgSrc={Google} size={40} onClick={handleGoogleLogin} />
            </div>
            <div className="mx-2">
              <IconBtn
                imgSrc={Kakao}
                size={40}
                onClick={handleKakaotalkLogin}
              />
            </div>
            <div className="mx-2">
              <IconBtn imgSrc={Naver} size={40} onClick={handleNaverLogin} />
            </div>
          </div>
          {isRejected ? (
            <div className="bg-red-200 text-red-600 text-center p-4 rounded-md shadow-md max-w-xs mx-auto mt-4">
              로그인에 실패했습니다. <br />
              이메일/비밀번호를 확인해주세요.
            </div>
          ) : (
            <></>
          )}
          <div className="flex justify-center mt-10">
            <Button
              type="primary"
              onClick={handleLogIn}
              className="py-6 px-10 rounded-full text-lg"
            >
              로그인
            </Button>
          </div>
        </Form>
      </ConfigProvider>
    </>
  );
};

export default LoginPage;
