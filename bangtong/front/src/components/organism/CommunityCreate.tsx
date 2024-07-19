import React, { useEffect } from "react";
import { Params, useParams } from "react-router-dom";
import { contents } from "../../data";

// 컴포넌트
import TextBox from "../atoms/TextBox";

const CommunityCreate: React.FC = () => {

  let {id} = useParams<{id: string}>(); // 게시물 번호

  // id가 undefined인 경우
  if (id === undefined) {
    return <p>잘못된 접근입니다.</p>;
  }

  // boardId가 id인 게시글 찾기
  const item = contents.find(obj => obj.boardId === parseInt(id as string, 10));

  return (
    <div>
      <div className="flex">
      </div>
      <textarea name="" id=""></textarea>
    </div>
  )
};

export default CommunityCreate;