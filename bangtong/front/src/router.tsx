import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoginPage from './components/page/LoginPage';
import SignupPage from './components/page/SignupPage';
import FindSelectPage from './components/page/FindSelectPage';
import IdFindPage from './components/page/IdFindPage';
import PwFindPage from './components/page/PwFindPage';

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
    {/* <Route path='/' element={<Layout />}>
    이 사이에 Nav가 포함돼있는 기타 페이지를 작성하면 됩니다.
    </Route> */}

    </Routes>
  </BrowserRouter>
)
};

export default Router;