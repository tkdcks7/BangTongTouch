import React from "react";

/**
 *    예시   <SubComment comment_id="까치" content="그건 좀;;" date={273890147923} />
 *  comment_id 작성자명 content 내용 date 시간 long long 형 milisec 단위
 */

interface ChildProps {
  comment_id: string;
  content: string;
  date: number;
}

const SubComment: React.FC<ChildProps> = ({ comment_id, content, date }) => {
  return (
    <div className="flex pl-4 py-0.5">
      <div className="flex text-xl items-center justify-center pr-2">
        <div>┖</div>
      </div>
      <div className="w-full">
        <div className="text-lg">{comment_id}</div>
        <div className="text-base">{content}</div>
        <div className="text-sm">{formatTimestamp(date)}</div>
      </div>
    </div>
  );
};
function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day}. ${hours}:${minutes}`;
}
export default SubComment;
