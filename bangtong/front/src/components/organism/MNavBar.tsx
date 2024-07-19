import React from 'react';
import { Link } from 'react-router-dom';

// 컴포넌트 불러오기
import TextBox from '../atoms/TextBox';
import IconBtn from '../atoms/IconBtn';

// 이미지 소스
import Home from '../../assets/Home.png'
import MapPin from '../../assets/MapPin.png'
import Message from '../../assets/Message.png'
import Profile from '../../assets/Profile.png'
import Community from '../../assets/Community.png'
import { Button } from '@headlessui/react';

const MNavBar: React.FC = () => {
  return (
    <div className='flex justify-around w-full fixed bottom-0 left-0 bg-lime-500 p-2 pb-5'>
      <Link to="/">
        <Button className='w-14'>
          <IconBtn 
            imgSrc={Home}
            size={20}
          />
          <TextBox 
            text='홈'
            size='sm'
          />
        </Button>
      </Link>
      <Link to="/map">
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
      </Link>
      <Link to="/chats">
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
      </Link>
      <Link to="/profile">
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
      </Link>
      <Link to="/boards">
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
      </Link>
    </div>
  );
}

export default MNavBar;