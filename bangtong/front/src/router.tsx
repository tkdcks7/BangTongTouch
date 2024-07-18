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
};

export default Router;