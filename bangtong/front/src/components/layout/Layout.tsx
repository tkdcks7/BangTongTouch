import React from 'react';
import MMenuBar from '../organism/MMenuBar';
import MNavBar from '../organism/MNavBar';
import ImgCarousel from '../molecules/ImgCarousel';
import ChatCard from '../molecules/ChatCard';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className='flex-row items-center justify-center'>
      <MMenuBar />
      <div className="flex flex-col items-center mx-10 mb-10">
        <Outlet />
      </div>
      <div className='h-20' />
      <MNavBar />
    </div>
  );
}

export default Layout;
