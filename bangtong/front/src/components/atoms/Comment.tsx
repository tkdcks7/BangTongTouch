import React, { useEffect, useRef, useState } from "react";

import SubComment from "./SubComment";
import SubCommentInput from "./SubCommentInput";
import axios from "axios";
import { Modal } from "antd";
import authAxios from "../../utils/authAxios";
import useUserStore from "../../store/userStore";
/**
 *    예시   <Comment comment_id="까치" content="그건 좀;;" date={273890147923} />
 *  comment_id 작성자명 content 내용 date 시간 long long 형 milisec 단위
 */

interface iUser {
  userId: number;
  nickname: string;
  isBanned: boolean;
}

interface iSubComment {
  commentId: number;
  iuser: iUser;
  content: string;
  commentDate: string;
}

interface IComment {
  commentId: number;
  iuser: iUser;
  content: string;
  commentDate: string;
  boardId?: string;
  subcomments?: Array<iSubComment>;
}

const Comment: React.FC<IComment> = ({
  commentId,
  iuser,
  content,
  commentDate,
  boardId,
  subcomments = [],
}) => {
  const [isSubCommentInputOpen, setIsSubCommentInputOpen] =
    useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [isEditClicked, setIsEditClicked] = useState<boolean>(false);
  const editContent = useRef<string>(content);
  const reportRef = useRef<string>(content);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const changeModalStatus = () => {
    reportRef.current = "";
    setIsModalOpen(!isModalOpen);
  };
  const changeSubCommentInput = () => {
    setIsSubCommentInputOpen(!isSubCommentInputOpen);
  };
  const changeMenuVisible = () => {
    setMenuVisible(!menuVisible);
  };
  const changeIsEditClicked = () => {
    setIsEditClicked(!isEditClicked);
  };
  const deleteComment = () => {
    authAxios({
      method: "DELETE",
      url: `${process.env.REACT_APP_BACKEND_URL}/comments/delete/${commentId}`,
    })
      .then((response) => {
        alert("삭제가 완료되었습니다.");
        window.location.replace("");
      })
      .catch((error) => console.log(error));
  };
  const modifyComment = () => {
    authAxios({
      method: "PUT",
      url: `${process.env.REACT_APP_BACKEND_URL}/comments/modify/${commentId}`,
      data: { content: editContent.current },
    })
      .then((response) => {
        alert("수정이 완료되었습니다.");
        window.location.replace("");
      })
      .catch((error) => console.log(error));
  };
  const reportComment = () => {
    const formData = new FormData();
    formData.append("reportSubjectTypeId", "0");
    formData.append("reportTypeId", "0");
    formData.append("content", reportRef.current);
    formData.append("subjectId", "0");
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/reports/${iuser.userId}/0`,
      data: formData,
    })
      .then((response) => {
        alert("신고가 완료되었습니다.");
        window.location.replace("");
      })
      .then((error) => {
        console.log("error");
      });
    changeModalStatus();
  };
  return (
    <React.Fragment>
      <div className="flex pl-1 py-0.5">
        <Modal
          title="댓글 신고"
          open={isModalOpen}
          onOk={reportComment}
          onCancel={changeModalStatus}
        >
          <div>
            <div>댓글 작성자: {iuser.nickname}</div>
            <div>댓글 내용: </div>
          </div>
          <div>{content}</div>
          <span>신고 사유: </span>
          <input
            className="w-4/5 border"
            type="text"
            onChange={(e) => (reportRef.current = e.target.value)}
          />
        </Modal>
        <div className="flex-initial text-sm w-12">{iuser.nickname}</div>
        {isEditClicked === true ? (
          <div className="flex justify-between w-full">
            <input
              className="border w-4/5"
              defaultValue={editContent.current}
              onChange={(e) => (editContent.current = e.target.value)}
              type="text"
            />{" "}
            <button onClick={modifyComment} className="pr-4">
              수정
            </button>
          </div>
        ) : (
          <React.Fragment>
            <div
              className="flex-1 text-base break-words overflow-hidden whitespace-pre-wrap hover:cursor-pointer"
              onClick={changeSubCommentInput}
            >
              {content}
            </div>
            <div className="flex-initial text-xs w-16">
              {formatTimestamp(commentDate)}
            </div>
            <button onClick={changeMenuVisible}>…</button>
            {menuVisible === true ? (
              <div className="absolute bg-gray-300 right-2">
                {iuser.userId === useUserStore.getState().id ? (
                  <ul className="flex-col">
                    <button onClick={changeIsEditClicked}>수정</button>
                    <button onClick={deleteComment}>삭제</button>
                  </ul>
                ) : (
                  <ul className="flex-col">
                    <button onClick={changeModalStatus}>신고</button>
                  </ul>
                )}
              </div>
            ) : (
              ""
            )}
          </React.Fragment>
        )}
      </div>
      {isSubCommentInputOpen ? (
        <SubCommentInput parentId={commentId} boardId={boardId} />
      ) : null}
      {subcomments.length > 0 &&
        subcomments.map((cmt) => {
          return (
            <div>
              <SubComment
                key={cmt.commentId}
                commentId={cmt.commentId}
                iuser={cmt.iuser}
                content={cmt.content}
                commentDate={cmt.commentDate}
              />
            </div>
          );
        })}
    </React.Fragment>
  );
};
function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month}.${day}. ${hours}:${minutes}`;
}
export default Comment;
