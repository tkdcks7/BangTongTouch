import React, { useEffect, useRef, useState } from "react";
import { Params, useParams } from "react-router-dom";
import { contents } from "../../data";
import { resData } from "../../resData";
import axios from "axios";

// 컴포넌트
import IconBtn from "../atoms/IconBtn";
import RollBackBtn from "../atoms/RollBackBtn";
import Comment from "../atoms/Comment";

// Store
import useUserStore from "../../store/userStore";

// 이미지 소스
import ArrowBack from "../../assets/ArrowBack.png";

const CommunityDetail: React.FC = () => {
  let { id } = useParams<{ id: string }>(); // 게시물 번호

  // id가 undefined인 경우 -> 이 경우가 나올 수 있는지 고민 필요
  // if (id === undefined) {
  //   return <p>잘못된 접근입니다.</p>;
  // }

  const myId = useUserStore().id;
  const myNickname = useUserStore().nickname;

  const boardInit = {
    boardId: 1,
    boardTitle: "타이틀",
    boardContent: "asdfsadf",
    boardDate: "2024-07-22 11:24:16.017",
    boardIsBanned: false,
    boardIsDelete: false,
    boardHit: 0,
    boardScore: 0,
    boardRegion: null,
    boardComment: [],
    boardWriter: {
      userId: 0,
      userName: "초기닉",
      userIsDeleted: false,
      userIsBanned: false,
    },
  };

  // 댓글 정보
  // {
  //   commentId: 3,
  //   commentContent: "asdfasdfasdf",
  //   commentUser: {
  //     userId: 2,
  //     userName: "일반",
  //     userEmail: "user",
  //     userPassword:
  //       "$2a$10$HJFwab/8RwivR7Fr3Q4rM.J3eCZEPsxKijNqMpaV09zOA4eqEZPFe",
  //     userBirthYear: 1998,
  //     userPhone: "010",
  //     userRegisterDate: "2024-07-19 13:41:35.067",
  //     userNickname: "유저",
  //     userGender: 1,
  //     userSso: "GOOGLE",
  //     userIsAdmin: false,
  //     userIsDeleted: false,
  //     userIsBanned: false,
  //   },
  // commentDate: "2024-07-22T11:26:25.397+00:00",
  // commentIsDeleted: false,

  const [board, setBoard] = useState(boardInit);
  const [comments, setComments] = useState<any[]>([]);
  const commentRef = useRef<string>("");

  // 시간 찍기 함수
  const timeStamp = (): string => {
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // 댓글을 받아오는 함수
  const handleCommentGet = (id: number) => {
    axios({
      method: "POST",
      url: `http://127.0.0.1:8080/comments/${id}`,
      headers: {},
    }).then((response) => setComments([...response.data.comment]));
  };

  // 댓글 작성 함수. 백엔드로 댓글을 전송하고 그 데이터를 활용해 댓글 리스트 state에 하나를 붙여 갱신
  const handleCommentCreate = (
    boardId: number,
    content: string,
    parentId?: number
  ) => {
    axios({
      method: "POST",
      url: `http://127.0.0.1:8080/comments/${boardId}/write`,
      headers: {},
      data: {
        content,
        parentId,
      },
    })
      .then((response) => {
        console.log(response);
        setComments([
          ...comments,
          {
            commentId: comments[-1]["commentId"] + 1,
            commentContent: commentRef.current,
            commentUser: {
              userId: myId,
              userName: myNickname,
              userIsDeleted: false,
              userIsBanned: false,
            },
            commentDate: timeStamp(),
          },
        ]);
      })
      .catch((err) => console.log("댓글 못보냄요"));
  };

  // 상세 페이지로 이동 시, 페이지 정보를 받아오는 함수. board 안에 상세페이지의 모든 정보가 저장됨
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:8080/boards/${id}`,
      headers: {},
    })
      .then((response) => {
        setBoard({ ...response.data.board });
      })
      .catch((err) => console.log(err));
  }, []);

  // boardId가 id인 게시글 찾기
  const item = contents.find(
    (obj) => obj.boardId === parseInt(id as string, 10)
  );

  return (
    <div>
      <div className="mt-10">
        {item ? (
          <div>
            <RollBackBtn />
            <h1 className="text-2xl font-bold">{item.boardTitle}</h1>
            <div className="mt-2">
              <span className="pe-2">{board.boardWriter.userName}</span>|
              <span className="ps-2">{board.boardDate}</span>
            </div>
            <div className="mt-5">{item.boardContent}</div>
            <div>
              <div className="mt-10 w-full bg-lime-400 p-3">댓글 목록</div>
              {/* resData 부분을 comments로 바꿔주면 된다. */}
              {resData.board.boardComment.map((comment: any) => {
                return (
                  <Comment
                    key={comment.commentId}
                    commentId={comment.commentId}
                    userName={comment.commentUser.userName}
                    content={comment.commentContent}
                    date={comment.commentDate}
                    comments={comment.comments}
                  />
                );
              })}
              <form className="mt-5 bg-gray-200 pb-3 rounded-lg">
                <textarea
                  placeholder="댓글 입력"
                  name="message"
                  rows={4}
                  className="block p-2.5 w-full text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-lime-300 focus:border-lime-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
