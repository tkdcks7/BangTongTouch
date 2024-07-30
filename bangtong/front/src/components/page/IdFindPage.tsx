import React from 'react';
import { Link } from 'react-router-dom';

// 컴포넌트 불러오기
import TextBox from '../atoms/TextBox';
import InputBox from '../molecules/InputBox';
import IconBtn from '../atoms/IconBtn';
import Btn from '../atoms/Btn';

// 이미지 소스
import Google from '../../assets/GoogleSocial.png'
import Kakao from '../../assets/KakaoSocial.png'
import Naver from '../../assets/NaverSocial.png'

const IdFindPage: React.FC = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className='text-3xl font-bold m-6'>
        <TextBox 
          text='아이디 찾기'
          size='2xl'
        />
      </div>
      <div>
        <InputBox 
          placeholder='핸드폰 번호'  
          buttonType='cancel'
          size='large'
          type='email'
          width={'70vw'}
        />
        <div className='flex justify-center mt-10'>
          <Btn 
            text='인증하기'
            backgroundColor='lime-500'
            textColor='white'
          />
        </div>
      </div>
    </div>
  );
}

export default IdFindPage;