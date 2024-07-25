import React from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

// 데이터
import { users } from "../../data";

// 컴포넌트
import ProfileBox from "../molecules/ProfileBox";

const ProfilePage: React.FC = () => {

  let {id} = useParams<{id: string}>(); // 유저 번호

  // id가 undefined인 경우
  if (id === undefined) {
    return <p>잘못된 접근입니다.</p>
  }

  // userId가 id인 유저 찾기
  const user = users.find(obj => obj.userId === parseInt(id as string, 10))

  // user 닉네임
  const userNickname = user?.userNickname

  return (
    <div>
      <ProfileBox 
        userNickname={userNickname as string}
      />
      <Outlet />
    </div>
  )
}

export default ProfilePage;