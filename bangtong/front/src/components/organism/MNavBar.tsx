import React from "react";
import { Link } from "react-router-dom";

// 컴포넌트 불러오기
import TextBox from "../atoms/TextBox";
import IconBtn from "../atoms/IconBtn";

// 이미지 소스
import Home from "../../assets/Home.png";
import MapPin from "../../assets/MapPin.png";
import Message from "../../assets/Message.png";
import Profile from "../../assets/Profile.png";
import Community from "../../assets/Community.png";

// Store
import useUserStore from "../../store/userStore";

const MNavBar: React.FC = () => {
  const { id } = useUserStore();

  return (
    <div className="flex justify-around w-full fixed bottom-0 left-0 bg-lime-500 dark:bg-lime-600 p-2 pb-5">
      <Link to="/" className="w-14 flex flex-col items-center">
        <IconBtn imgSrc={Home} size={20} />
        <TextBox text="홈" size="sm" color="black" />
      </Link>
      <Link to="/products/" className="w-14 flex flex-col items-center">
        <IconBtn imgSrc={MapPin} size={20} />
        <TextBox text="지도" size="sm" color="black"/>
      </Link>
      <Link to="/chats" className="w-14 flex flex-col items-center">
        <IconBtn imgSrc={Message} size={20} />
        <TextBox text="채팅" size="sm" color="black" />
      </Link>
      <Link to={`/profile/${id}`} className="w-14 flex flex-col items-center">
        <IconBtn imgSrc={Profile} size={20} />
        <TextBox text="나의 방통" size="sm" color="black" />
      </Link>
      <Link to="/boards" className="w-14 flex flex-col items-center">
        <IconBtn imgSrc={Community} size={20} />
        <TextBox text="커뮤니티" size="sm" color="black" />
      </Link>
    </div>
  );
};

export default MNavBar;
