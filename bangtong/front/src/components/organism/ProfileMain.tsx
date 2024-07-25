import React from "react";

// 컴포넌트
import ProfileMenu from "../molecules/ProfileMenu";
import ProfileBox from "../molecules/ProfileBox";
import { useParams } from "react-router-dom";

// 데이터
import { users } from "../../data";

const ProfileMain: React.FC = () => {
  let { id } = useParams<{ id: string }>(); // 유저 번호

  // id가 undefined인 경우
  if (id === undefined) {
    return <p>잘못된 접근입니다.</p>;
  }

  // userId가 id인 유저 찾기
  const user = users.find((obj) => obj.userId === parseInt(id as string, 10));

  // user 닉네임
  const userNickname = user?.userNickname;

  return (
    <div>
      <ProfileBox userNickname={userNickname as string} />
      <h2 className="w-full text-xl text-left mt-5 text-lime-500 font-bold">
        나의 거래
      </h2>
      <ProfileMenu />
    </div>
  );
};

export default ProfileMain;
