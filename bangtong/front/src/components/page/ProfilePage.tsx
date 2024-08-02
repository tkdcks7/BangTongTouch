import React from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

// 데이터
import { users } from "../../data";

// 컴포넌트
import ProfileBox from "../molecules/ProfileBox";

// Store
import useUserStore from "../../store/userStore";

const ProfilePage: React.FC = () => {
  const { id, nickname } = useUserStore(); // 유저 번호

  // id가 undefined인 경우
  if (id === undefined) {
    return <p>잘못된 접근입니다.</p>;
  }

  return (
    <div className="w-full md:w-3/5">
      {id ? (
        <div>
          <ProfileBox userNickname={nickname} />
          <Outlet />
        </div>
      ) : (
        <div>
          <h1 className="text-2xl md:text-3xl text-red-500 text-center font-bold my-40">
            로그인 후 이용가능합니다.
          </h1>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
