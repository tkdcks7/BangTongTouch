<<<<<<< HEAD
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Btn from './components/atoms/Btn';
import BtnGreen from './components/atoms/BtnGreen';

const Router: React.FC = () => {
  return (
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<BtnGreen />} />
    </Routes>
  </BrowserRouter>
)
=======
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

// 로그인, 회원가입
import LoginPage from "./components/page/LoginPage"; // 로그인
import SignupPage from "./components/page/SignupPage"; // 회원가입
import FindSelectPage from "./components/page/FindSelectPage"; // 아이디, 비밀번호 찾기

// 메인
import MainPage from "./components/page/MainPage"; // 메인 페이지

// 매물
import ProductPage from "./components/page/ProductPage"; // 페이지
import ProductList from "./components/molecules/ProductList"; // 매물 리스트
import ProductDetail from "./components/organism/ProductDetail"; // 매물 상세
import ProductUpload from "./components/organism/ProductUpload"; // 매물 업로드

// 채팅
import ChattingPage from "./components/page/ChattingPage"; // 페이지
import ChatMain from "./components/organism/ChatMain"; // 채팅 목록
import ChatDetail from "./components/organism/ChatDetail"; // 채팅창

// 마이방통
import ProfilePage from "./components/page/ProfilePage"; // 페이지
import ProfileMain from "./components/organism/ProfileMain"; // 나의 거래
import ProfileUpdate from "./components/organism/ProfileUpdate"; // 회원 정보 수정
import ProfilePwConfirm from "./components/molecules/ProfilePwConfirm"; // 비밀번호 확인
import ProfileEdit from "./components/molecules/ProfileEdit"; // 회원정보 수정
import ProfileNotification from "./components/organism/ProfilNotification"; // 알림 권한 설정
import ProductMapBox from "./components/organism/ProductMapBox";

// 커뮤니티
import CommunityPage from "./components/page/CommunityPage"; // 페이지
import CommunityMain from "./components/organism/CommunityMain"; // 커뮤니티 메인(목록)창
import CommunityDetail from "./components/organism/CommunityDetail"; // 글 상세
import CommunityCreate from "./components/organism/CommunityCreate"; // 글 쓰기

// 로그인페이지, 회원가입페이지, 아이디, 비밀번호 찾기는 Nav가 없기 때문에 Layout 밖에 선언함
const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인, 회원가입, 아이디, 비밀번호 찾기 네비게이션바 X */}
        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/user/register" element={<SignupPage />} />
        <Route path="/user/FindSelectPage" element={<FindSelectPage />} />

        {/* 네비게이션바가 있는 페이지의 최상단 */}
        <Route path="/" element={<Layout />}>
          {/* 메인 페이지 */}
          <Route path="" element={<MainPage />} />

          {/* 상품(매물) 페이지 */}
          <Route path="products" element={<ProductPage />}>
            <Route path="" element={<ProductMapBox />} />
            <Route path="list" element={<ProductList />} />
            <Route path=":id" element={<ProductDetail />} />
            <Route path="upload" element={<ProductUpload />} />
          </Route>

          {/* 채팅 페이지 */}
          <Route path="chats" element={<ChattingPage />}>
            <Route path="" element={<ChatMain />} />
            <Route path=":id" element={<ChatDetail />} />
          </Route>

          {/* 마이페이지 */}
          <Route path="profile/:id" element={<ProfilePage />}>
            <Route path="" element={<ProfileMain />} />
            <Route path="update" element={<ProfileUpdate />}>
              <Route path="" element={<ProfilePwConfirm />} />
              <Route path="confirmed" element={<ProfileEdit />} />
            </Route>
            <Route path="notification" element={<ProfileNotification />} />
          </Route>

          {/* 커뮤니티 페이지 */}
          <Route path="boards" element={<CommunityPage />}>
            <Route path="" element={<CommunityMain />} />
            <Route path=":id" element={<CommunityDetail />} />
            <Route path="write" element={<CommunityCreate />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
>>>>>>> dev_front_components
};

export default Router;
