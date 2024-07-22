import React from "react";
import { useState } from "react";
import { contents } from "../../data.js";
import Post from "../atoms/Post";

const ContentTable: React.FC = () => {

  return (
    <table className="border-collapse border border-gray-400 w-full text-sm text-nowrap">
      <thead className="bg-gray-300">
        <tr>
          <th className="border border-gray-300 p-2">제목</th>
          <th className="border border-gray-300 p-2">작성자</th>
          <th className="border border-gray-300 p-2">작성시간</th>
        </tr>
      </thead>
      <tbody>
        {contents.map((item) => 
        <Post 
          key={item.boardId} 
          id={item.boardId}
          title={item.boardTitle} 
          writer={item.boardWriter} 
          tag={item.boardDate}
        />)}
      </tbody>
    </table>
  )
};

export default ContentTable;