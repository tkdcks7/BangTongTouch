import React from "react";
import { Link } from "react-router-dom";

// 이미지 소스
import WhiteLogo from "../../assets/WhiteLogo.png";

// 아이콘
import StackIcon from "tech-stack-icons";
import { color } from "framer-motion";
import { MailFilled, PhoneFilled } from "@ant-design/icons";

const PcFooter: React.FC = () => {
  return (
    <div className="bg-lime-800 text-white p-5">
      <div className="grid grid-cols-4 gap-4 px-10">
        <div>
          <p className="text-xl font-bold my-3">Link</p>
          <p>
            <Link to={"products"}>방통터치</Link>
          </p>
          <p>
            <Link to={"chats"}>채팅</Link>
          </p>
          <p>
            <Link to={"profile"}>마이방통</Link>
          </p>
          <p>
            <Link to={"boards"}>신통방톡</Link>
          </p>
        </div>
        <div>
          <p className="text-xl font-bold my-3">Founders</p>
          <p>정지원</p>
          <p>강상찬</p>
          <p>민서령</p>
          <p>황준</p>
          <p>박병우</p>
          <p>김재혁</p>
        </div>
        <div>
          <p className="text-xl font-bold my-3">Contact Us</p>
          <div className="flex items-center">
            <MailFilled />
            <span className="ml-3">ssafy@ssafy.com</span>
          </div>
          <div className="flex items-center">
            <PhoneFilled />
            <span className="ml-3">02-3429-5100</span>
          </div>
        </div>
        <div>
          <p className="text-xl font-bold my-3">Tech</p>
          <div className="flex flex-wrap">
            <StackIcon className="w-10 m-2" name="reactjs" grayscale />
            <StackIcon className="w-10 m-2" name="typescript" grayscale />
            <StackIcon className="w-10 m-2" name="html5" grayscale />
            <StackIcon className="w-10 m-2" name="spring" grayscale />
            <StackIcon className="w-10 m-2" name="tailwindcss" grayscale />
            <StackIcon className="w-10 m-2" name="mysql" grayscale />
            <StackIcon className="w-10 m-2" name="gitlab" grayscale />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PcFooter;
