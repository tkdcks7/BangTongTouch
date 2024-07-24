import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';

// 로그인, 회원가입
import LoginPage from './components/page/LoginPage';
import SignupPage from './components/page/SignupPage';
import FindSelectPage from './components/page/FindSelectPage';
import IdFindPage from './components/page/IdFindPage';
import PwFindPage from './components/page/PwFindPage';

// 메인
import MainPage from './components/page/MainPage';

// 커뮤니티
import CommunityPage from './components/page/CommunityPage';
import CommunityMain from './components/organism/CommunityMain';
import CommunityDetail from './components/organism/CommunityDetail';
import CommunityCreate from './components/organism/CommunityCreate';

// 매물
import ProductPage from './components/page/ProductPage';
import ProductList from './components/molecules/ProductList';
import ProductDetail from './components/organism/ProductDetail';
import ProductUpload from './components/organism/ProductUpload';

// 마이방통
import ProfilePage from './components/page/ProfilePage';
import ProfileMain from './components/organism/ProfileMain';

// 로그인페이지와 회원가입페이지는 Nav가 없기 때문에 Layout 밖에 선언함
const Router: React.FC = () => {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/user/login' element={<LoginPage />} />
      <Route path='/user/register' element={<SignupPage />} />
      <Route path='/user/FindSelectPage' element={<FindSelectPage />} />
      <Route path='/user/IdFindPage' element={<IdFindPage />} />
      <Route path='/user/PwFindPage' element={<PwFindPage />} />
      <Route path='/' element={<Layout />} >
        <Route path='' element={<MainPage />} />
        <Route path='boards' element={<CommunityPage />}>
          <Route path='' element={<CommunityMain />} />
          <Route path=':id' element={<CommunityDetail />} />
          <Route path='write' element={<CommunityCreate />} />
        </Route>
        <Route path='products' element={<ProductPage />}>
          <Route path='' element={<ProductList />}/>
          <Route path=':id' element={<ProductDetail />}/>
          <Route path='upload' element={<ProductUpload />}/>
        </Route>
        <Route path='profile/:id' element={<ProfilePage />}>
          <Route path='' element={<ProfileMain />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)
};

export default Router;
