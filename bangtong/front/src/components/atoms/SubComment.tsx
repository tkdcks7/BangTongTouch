import React from "react";

/**
 *    예시   <SubComment comment_id="까치" content="그건 좀;;" date={273890147923} />
 *  comment_id 작성자명 content 내용 date 시간 long long 형 milisec 단위
 */

interface ChildProps {
  commentId: number;
  userName: string;
  content: string;
  date: string;
}

const SubComment: React.FC<ChildProps> = ({
  commentId,
  userName,
  content,
  date,
}) => {
  return (
    <div className="flex pl-4 py-0.5">
      <div className="flex text-xl items-center justify-center pr-2">
        <div>┖</div>
      </div>
      <div className="flex w-full">
        <div className="flex-initial text-sm w-12">{userName}</div>
        <div className="flex-1 text-base break-words overflow-hidden whitespace-pre-wrap">
          {content}
        </div>
        <div className="flex-initial text-xs w-16">{formatTimestamp(date)}</div>
      </div>
    </div>
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
export default SubComment;
