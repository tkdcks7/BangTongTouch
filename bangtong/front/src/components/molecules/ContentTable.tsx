import React from "react";

// 게시글 데이터
import { contents as contentsData } from "../../data.js";

// 컴포넌트
import Post from "../atoms/Post";
import { Link } from "react-router-dom";

interface boardWriter {
  userBirthYear: number;
  userEmail: string;
  userGender: number;
  userId: number;
  userIsAdmin: boolean;
  userIsBanned: boolean;
  userIsDeleted: boolean;
  userNickname: string;
  userPhone: string;
  userProvider: string;
  userRegisterDate: string;
}

interface Content {
  boardId: number;
  boardTitle: string;
  boardWriter: boardWriter;
  boardDate: string;
}

interface ContentTableProps {
  contents: Array<Content>;
}

const ContentTable: React.FC<ContentTableProps> = ({ contents }) => {
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
        {contents.map((content) => (
          <Post
            key={content.boardId}
            id={content.boardId}
            title={content.boardTitle}
            writer={content.boardWriter.userNickname}
            date={content.boardDate}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ContentTable;
