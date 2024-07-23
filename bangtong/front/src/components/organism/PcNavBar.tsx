import React from 'react';
import { Link } from 'react-router-dom';

// 컴포넌트 불러오기
import IconBtn from '../atoms/IconBtn';
import Btn from '../atoms/Btn';

// 이미지 소스
import Bell from '../../assets/Bell.png' 


const PcNavBar: React.FC = () => {
  return (
    <div className='flex justify-between w-full bg-white p-5 mb-10'>
      <Link to="/" className='text-start'>
        <h1 className='font-extrabold text-4xl text-lime-600 text-nowrap'>
          방통터치
        </h1>
      </Link>
      <div className='flex items-center justify-between'>
        <Link to="/products">
          <p className='text-lg mx-3 text-nowrap text-gray-400'>
            방통 터치
          </p>
        </Link>
        <Link to="/chats">
          <p className='text-lg mx-3 text-nowrap text-gray-400'>
            채팅
          </p>
        </Link>
        <Link to="/profile">
          <p className='text-lg mx-3 text-nowrap text-gray-400'>
            마이방통
          </p>
        </Link>
        <Link to="/boards">
          <p className='text-lg mx-3 text-nowrap text-gray-400'>
            신통방톡
          </p>
        </Link>
        <div className='mx-7'>
          <IconBtn 
            imgSrc={Bell}
            size={30}
          />
        </div>
        <div className='mx-1'>
          <Btn 
            text='로그인'
            backgroundColor='yellow-400'
          />
        </div>
      </div>
    </div>
  );
}

export default PcNavBar;
