import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BtnGreen from './components/atoms/BtnGreen';
import Layout from './components/layout/Layout';

const Router: React.FC = () => {
  return (
  <BrowserRouter>
    <Routes>
    {/* <Route path="/" element={<BtnGreen />} /> */}
    <Route path='/' element={<Layout />}>
      로그인
    </Route>

    </Routes>
  </BrowserRouter>
)
};

export default Router;