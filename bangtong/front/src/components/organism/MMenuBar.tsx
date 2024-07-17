import React from 'react';

// 컴포넌트 불러오기
import IconBtn from '../atoms/IconBtn';

// 이미지 소스
import Bell from '../../assets/Bell.png'
import Settings from '../../assets/Settings.png'

const MMenuBar: React.FC = () => {
  return (
    <div className='flex justify-end w-screen p-2'>
      <div className='mx-3'>
        <IconBtn 
          imgSrc={Bell}
          size={30}
        />
      </div>
      <div className='mx-3'>
        <IconBtn 
          imgSrc={Settings}
          size={30}
        />
      </div>
    </div>
  );
}

export default MMenuBar;