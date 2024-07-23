import React from 'react';

// 컴포넌트
import MMenuBar from '../organism/MMenuBar';
import MNavBar from '../organism/MNavBar';
import PcNavBar from '../organism/PcNavBar';

import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className='flex-row items-center justify-center'>
      <div className='md:hidden'>
        <MMenuBar />
      </div>
      <div className='hidden md:block'>
        <PcNavBar />
      </div>
      <div className="flex flex-col items-center mx-10 mb-10 ">
        <Outlet />
      </div>
      <div className='h-20' />
      <div className='md:hidden'>
        <MNavBar />
      </div>
    </div>
  );
}

export default Layout;
