import React from "react";

import SubComment from "./SubComment";
/**
 *    예시   <Comment comment_id="까치" content="그건 좀;;" date={273890147923} />
 *  comment_id 작성자명 content 내용 date 시간 long long 형 milisec 단위
 */

interface SubCommnetProps {
  commentId: number;
  commentUser: any;
  commentContent: string;
  commentDate: string;
}

interface ChildProps {
  commentId: number;
  userName: string;
  content: string;
  date: string;
  comments: Array<SubCommnetProps>;
}

const Comment: React.FC<ChildProps> = ({
  commentId,
  userName,
  content,
  date,
  comments,
}) => {
  return (
    <React.Fragment>
      <div className="flex pl-1 py-0.5">
        <div className="flex-initial text-sm w-12">{userName}</div>
        <div className="flex-1 text-base break-words overflow-hidden whitespace-pre-wrap">
          {content}
        </div>
        <div className="flex-initial text-xs w-16">{formatTimestamp(date)}</div>
      </div>
      {comments.length > 0 &&
        comments.map((cmt) => {
          console.log("cmt=", cmt);
          return (
            <SubComment
              key={cmt.commentId}
              commentId={cmt.commentId}
              userName={cmt.commentUser.userName}
              content={cmt.commentContent}
              date={cmt.commentDate}
            />
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
