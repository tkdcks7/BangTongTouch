import React, { useEffect, useRef, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import { sanitize } from "dompurify";

// 컴포넌트
import RollBackBtn from "../atoms/RollBackBtn";
import Comment from "../atoms/Comment";

// Store
import useUserStore from "../../store/userStore";

interface IBoardContent {
  boardId: number;
  boardTitle: string;
  boardContent: string;
  boardDate: string;
  boardWriter: string;
}

interface iUser {
  id: number;
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
  subcomments?: Array<iSubComment>;
}

const CommunityDetail: React.FC = () => {
  let { id } = useParams<{ id: string }>(); // 게시물 번호

  const myId = useUserStore().id;
  const myNickname = useUserStore().nickname;

  const [boardContent, setBoardContent] = useState<IBoardContent>();
  const [comments, setComments] = useState<Array<IComment>>([]);
  const commentRef = useRef<string>("");

  // 시간 찍기 함수
  // const timeStamp = (): string => {
  //   const date = new Date();
  //   const year = String(date.getFullYear());
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const hours = String(date.getHours()).padStart(2, "0");
  //   const minutes = String(date.getMinutes()).padStart(2, "0");
  //   const seconds = String(date.getSeconds()).padStart(2, "0");

  //   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  // };

  // 댓글을 받아오는 함수
  const handleCommentGet = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/comments/${id}`,
      headers: {},
    }).then((response) => {
      setComments(response.data.data);
    });
  };

  // 댓글 작성 함수. 백엔드로 댓글을 전송하고 그 데이터를 활용해 댓글 리스트 state에 하나를 붙여 갱신
  const handleCommentCreate = (boardId: number, content: string) => {
    console.log("check");
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/comments/${boardId}/write`,
      headers: {},
      data: {
        content,
      },
    })
      .then((response) => {
        alert("등록이 되었습니다.");
        console.log(response);
        window.location.replace("");
        // setComments([
        //   ...comments,
        //   {
        //     commentId: comments[-1]["commentId"] + 1,
        //     commentContent: commentRef.current,
        //     commentNickname: myNickname,
        //     commentDate: timeStamp(),
        //   },
        // ]);
      })
      .catch(() => {
        alert("로그인 후 작성하실 수 있습니다.");
      });
  };

  // 상세 페이지로 이동 시, 페이지 정보를 받아오는 함수. board 안에 상세페이지의 모든 정보가 저장됨
  useEffect(() => {
    handleCommentGet();
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/boards/${id}`,
    })
      .then((response) => {
        setBoardContent({
          boardId: response.data.board.boardId,
          boardTitle: response.data.board.boardTitle,
          boardDate: response.data.board.boardDate,
          boardWriter: response.data.board.boardWriter.userNickname,
          boardContent: response.data.board.boardContent,
        });
      })
      .catch((err) => {
        window.open(err);
      });
  }, []);

  const sanitizedData = () => ({
    __html: boardContent !== undefined ? boardContent.boardContent : "",
  });

  return (
    <div>
      <div className="mt-10">
        {boardContent ? (
          <div>
            <RollBackBtn />
            <h1 className="text-2xl font-bold">{boardContent.boardTitle}</h1>
            <div className="mt-2">
              <span className="pe-2">{boardContent.boardWriter}</span>|
              <span className="ps-2">{boardContent.boardDate}</span>
            </div>
            <div className="mt-5 board-content">
              <div dangerouslySetInnerHTML={sanitizedData()} />
            </div>
            <div>
              <div className="mt-10 w-full bg-lime-400 p-3">댓글 목록</div>
              {comments.map((comment: any) => {
                return (
                  <Comment
                    key={comment.commentId}
                    commentId={comment.commentId}
                    iuser={comment.iuser}
                    content={comment.content}
                    commentDate={comment.commentDate}
                    subcomments={comment.subcomments}
                    boardId={id}
                  />
                );
              })}
              <form className="mt-5 bg-gray-200 pb-3 rounded-lg">
                <textarea
                  placeholder="댓글 입력"
                  name="message"
                  rows={4}
                  className="block p-2.5 w-full text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-lime-300 focus:border-lime-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
                  onChange={(e) => (commentRef.current = e.target.value)}
                ></textarea>
                <button
                  className="bg-lime-400 p-2 rounded-lg mt-3 ms-3 px-5 text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(`값은 ${commentRef.current}입니다.`); // 테스트코드
                    handleCommentCreate(Number(id), commentRef.current);
                  }}
                >
                  댓글 작성하기
                </button>
              </form>
            </div>
          </div>
        ) : (
          <p>게시글을 찾을 수 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default CommunityDetail;
