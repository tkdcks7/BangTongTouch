import React from "react";

// 게시글 데이터
import { contents } from "../../data.js";

// 컴포넌트
import Post from "../atoms/Post";

const ContentTable: React.FC = () => {
  return (
    <table className="border-collapse w-full text-sm text-nowrap">
      <thead className="bg-yellow-100">
        <tr>
          <th className="p-2">제목</th>
          <th className="p-2">작성자</th>
          <th className="p-2">작성시간</th>
        </tr>
      </thead>
      <tbody>
        {contents.map((item) => (
          <Post
            key={item.boardId}
            id={item.boardId}
            title={item.boardTitle}
            writer={item.boardWriter}
            tag={item.boardDate.slice(11, 16)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ContentTable;
