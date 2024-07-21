import React, { useEffect } from "react";
import { Params, useParams } from "react-router-dom";
import { contents } from "../../data";

// 컴포넌트
import IconBtn from "../atoms/IconBtn";
import RollBackBtn from "../atoms/RollBackBtn";

// 이미지 소스
import ArrowBack from "../../assets/ArrowBack.png"

const CommunityDetail: React.FC = () => {

  let {id} = useParams<{id: string}>(); // 게시물 번호

  // id가 undefined인 경우
  if (id === undefined) {
    return <p>잘못된 접근입니다.</p>;
  }

  // boardId가 id인 게시글 찾기
  const item = contents.find(obj => obj.boardId === parseInt(id as string, 10));

  return (
    <div>
      <div className="mt-10">
        {item ? (
          <div>
            <RollBackBtn />
            <h1 className="text-2xl font-bold">
              {item.boardTitle}
            </h1>
            <div className="mt-2">
              <span className="pe-2">{item.boardWriter}</span>
              |
              <span className="ps-2">{item.boardDate}</span>
            </div>
            <div className="mt-5">
              {item.boardContent}
            </div>
            <div>
              <div className="mt-10 w-full bg-lime-400 p-3">
                댓글 목록
              </div>
              <div>
                댓글들...
              </div>
              <form className="mt-5 bg-gray-200 pb-3 rounded-lg">
                <textarea placeholder="댓글 입력" name="message" rows={4} className="block p-2.5 w-full text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-lime-300 focus:border-lime-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                <button type="submit" className="bg-lime-400 p-2 rounded-lg mt-3 ms-3 px-5 text-white">댓글 작성하기</button>
              </form>
            </div>
          </div>
        ) : (
          <p>게시글을 찾을 수 없습니다.</p>
        )}
      </div>
    </div>
  )
};

export default CommunityDetail;