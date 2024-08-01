import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

// 컴포넌트 불러오기
import TextBox from "../atoms/TextBox";
import InputBox from "../molecules/InputBox";
import IconBtn from "../atoms/IconBtn";
import Btn from "../atoms/Btn";

// 이미지 소스
import Google from "../../assets/GoogleSocial.png";
import Kakao from "../../assets/KakaoSocial.png";
import Naver from "../../assets/NaverSocial.png";

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
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginVariants = {
    inital: {
      y: 0,
    },
    target: {
      y: -10,
    },
  };

  interface LoginInfo {
    email: string;
    password: string;
  }

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const code = searchParams.get("code");
  const stateCode = searchParams.get("state");
  console.log("check" + code);
  console.log("state:" + stateCode);

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

  const handleLogIn = (e: any): void => {
    e.preventDefault();
    const payload: LoginInfo = {
      email: email,
      password: password,
    };
    console.log(`payload = ${payload}`);
    console.log(`email = ${payload["email"]}`);
    axios({
      method: "POST",
      url: "http://127.0.0.1:8080/user/login/",
      data: payload,
    })
      .then((response) => console.log(response.data, "성공적으로 전송됨"))
      .catch((error) => console.log("전송 실패", error));
  };
  const handleNaverLogin = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID_NAVER;
    const redirectUri = encodeURIComponent(
      process.env.REACT_APP_CALLBACK_URL_NAVER + ""
    );
    const state = "1234";
    const naverLoginUri = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${redirectUri}`;
    window.open(naverLoginUri, "_blank", "width=600,height=600");
  };

  const handleGoogleLogin = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID_GOOGLE;
    const redirectUri = encodeURIComponent(
      process.env.REACT_APP_CALLBACK_URL_GOOGLE + ""
    );
    const googleLoginUri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email`;
    window.open(googleLoginUri, "_blank", "width=600,height=600");
  };

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
      <form>
        <InputBox
          placeholder="이메일 (아이디)"
          buttonType="cancel"
          size="large"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox
          placeholder="비밀번호"
          buttonType="cancel"
          size="large"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between text-sm md:text-base text-lime-500 mt-3">
          <Link to="/user/FindSelectPage">아이디/비밀번호 찾기</Link>
          <Link to="/user/register">회원가입</Link>
        </div>
        <div className="flex justify-center mt-3">
          <div className="mx-2">
            <IconBtn imgSrc={Google} size={40} onClick={handleGoogleLogin} />
          </div>
          <div className="mx-2">
            <IconBtn imgSrc={Kakao} size={40} onClick={handleKakaotalkLogin} />
          </div>
          <div className="mx-2">
            <IconBtn imgSrc={Naver} size={40} onClick={handleNaverLogin} />
          </div>
        </div>
        <div className="flex justify-center mt-20">
          <Btn
            text="로그인"
            backgroundColor="lime-500"
            textColor="white"
            onClick={handleLogIn}
          />
        </div>
      </form>
    </>
  );
};

export default LoginPage;
