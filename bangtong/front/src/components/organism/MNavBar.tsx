import React from 'react';

// 컴포넌트 불러오기
import TextBox from '../atoms/TextBox';
import IconBtn from '../atoms/IconBtn';

// 이미지 소스
import Home from '../../assets/Home.png'
import MapPin from '../../assets/MapPin.png'
import Message from '../../assets/Message.png'
import Profile from '../../assets/Profile.png'
import Community from '../../assets/Community.png'

const MNavBar: React.FC = () => {
  return (
    <div className='flex justify-around w-screen absolute bottom-0 left-0 bg-lime-500 p-2'>
      <button className='w-14'>
        <IconBtn 
          imgSrc={Home}
          size={20}
        />
        <TextBox 
          text='홈'
          size='sm'
        />
      </button>
      <button className='w-14'>
        <IconBtn 
          imgSrc={MapPin}
          size={20}
        />
        <TextBox 
          text='지도'
          size='sm'
        />
      </button>
      <button className='w-14'>
        <IconBtn 
          imgSrc={Message}
          size={20}
        />
        <TextBox 
          text='채팅'
          size='sm'
        />
      </button>
      <button className='w-14'>
        <IconBtn 
          imgSrc={Profile}
          size={20}
        />
        <TextBox 
          text='나의 방통'
          size='sm'
        />
      </button>
      <button className='w-14'>
        <IconBtn 
          imgSrc={Community}
          size={20}
        />
        <TextBox 
          text='커뮤니티'
          size='sm'
        />
      </button>
    </div>
  );
}

export default MNavBar;