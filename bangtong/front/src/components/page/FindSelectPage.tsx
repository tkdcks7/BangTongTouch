import React from 'react';
import { Link } from 'react-router-dom';

// 컴포넌트 불러오기
import TextBox from '../atoms/TextBox';
import Btn from '../atoms/Btn';


const FindSelectPage
: React.FC = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className='text-3xl font-bold m-6'>
        <TextBox 
          text='아이디/비밀번호 찾기'
          size='2xl'
        />
      </div>
      <div className='flex justify-center mt-5'>
        <Link to='/user/IdFIndPage'>
          <Btn 
            text='아이디 찾기'
            backgroundColor='lime-500'
            textColor='white'
          />
        </Link>
      </div>
      <div className='flex justify-center mt-5'>
        <Link to='/user/PwFindPage'>
          <Btn 
            text='비밀번호 찾기'
            backgroundColor='yellow-300'
            textColor='white'
          />
        </Link>
      </div>
    </div>
  );
}

export default FindSelectPage
;