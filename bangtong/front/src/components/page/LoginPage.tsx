import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// 컴포넌트 불러오기
import TextBox from '../atoms/TextBox';
import InputBox from '../molecules/InputBox';
import IconBtn from '../atoms/IconBtn';
import Btn from '../atoms/Btn';
import MNavBar from '../organism/MNavBar';
import MMenuBar from '../organism/MMenuBar';

// 이미지 소스
import Google from '../../assets/GoogleSocial.png'
import Kakao from '../../assets/KakaoSocial.png'
import Naver from '../../assets/NaverSocial.png'

/**
 * 검증 오류가 발생하였을 경우 id 값을 "e" 검증이 되었을 경우 "q", 기본 상태 "" 처럼 빈 값 string 변수로 전달
 * password, email 등의 type 전달
 * placeholder 전달
 * size => 글자 크기
 * width, height 픽셀 단위 크기
 * 추후 상태 관리 추가하여 기본 상태에서 포커싱 될 때 초록색 아웃라인 설정과
 * X 버튼 눌렀을 때 input 값 지우는 로직 작성하여야 함.
 * 
 * <InputBox
      placeholder="이메일 (아이디)"
      size="small"
      type="email"
      id=""
      width={400}
      height={96}
    />

 */

const LoginPage: React.FC = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  interface LoginInfo {
    email: string;
    password: string;
  }

  const handleLogIn = (e:any):void => {
    e.preventDefault();
    const payload:LoginInfo = {
      "email": email,
      "password": password
    }
    console.log(`payload = ${payload}`)
    console.log(`email = ${payload["email"]}`)
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:8080/user/login/',
      data: payload
    })
    .then(response => console.log(response.data, '성공적으로 전송됨'))
    .catch(error => console.log('전송 실패', error))
  }
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className='font-bold m-6'>
        <TextBox 
          text='로그인'
          size='3xl'
        />
      </div>
      <form className='mb-20'>
        <InputBox 
          placeholder='이메일 (아이디)'  
          buttonType='cancel'
          size='large'
          type='email'
          width={"70vw"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox 
          placeholder='비밀번호'  
          buttonType='cancel'
          size='large'
          type='password'
          width={"70vw"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='flex justify-between text-sm text-lime-500'>
          <Link to="/user/FindSelectPage">
            <TextBox 
              text='아이디/비밀번호 찾기'
            />
          </Link>
          <Link to="/user/register">
            <TextBox 
              text='회원가입'
            />
          </Link>
        </div>
        <div className='flex justify-center mt-3'>
          <div className='mx-2'>
            <IconBtn 
              imgSrc={Google}
              size={40}
            />
          </div>
          <div className='mx-2'>
            <IconBtn 
              imgSrc={Kakao}
              size={40}
            />
          </div>
          <div className='mx-2'>
            <IconBtn 
              imgSrc={Naver}
              size={40}
            />
          </div>
        </div>
        <div className='flex justify-center mt-20'>
          <Btn 
            text='로그인'
            backgroundColor='lime-500'
            textColor='white'
            onClick={handleLogIn}
          />
        </div>
      </form>
    </div>
  );
}

export default LoginPage;