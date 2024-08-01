import axios from "axios";
import React, { useRef } from "react";

interface SubCommentInputProps {
  parentId: number;
  boardId?: string;
}

const SubCommentInput: React.FC<SubCommentInputProps> = ({
  parentId,
  boardId,
}) => {
  const content = useRef<string>("");
  const postSubCommentInput = () => {
    if (content.current === "") return;
    console.log("check");
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/comments/${boardId}/write`,
      headers: {},
      data: {
        content: content.current,
        parentId,
      },
    })
      .then(() => {
        alert("등록이 되었습니다.");
        window.location.replace("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <form className="border flex justify-between px-4">
      <input
        type="text"
        placeholder="대댓글을 입력해주세요."
        onChange={(e) => (content.current = e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          postSubCommentInput();
        }}
      >
        등록
      </button>
    </form>
  );
};

export default SubCommentInput;
