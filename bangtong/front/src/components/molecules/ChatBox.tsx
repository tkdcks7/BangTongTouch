import React, { useEffect, useState } from "react";
import authAxios from "../../utils/authAxios";
import useUserStore from "../../store/userStore";

// 컴포넌트
// import Chatroom from "./Chatroom";

// 이미지 소스
import Room from "../../assets/Room1.jpg";

const ChatBox: React.FC = () => {
  const { id } = useUserStore();
  const [chatroomList, setChatroomList] = useState([]);

  useEffect(() => {
    authAxios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/chatroom/${id}`,
    })
      .then((response) => {
        console.log(response);
        setChatroomList(response.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <React.Fragment>
      {chatroomList.length > 0 ? (
        chatroomList.map((room) => {
          return (
            // 상속을 해줘야함.
            // <Chatroom />
            <p></p>
          );
        })
      ) : (
        <p>등록된 채팅이 없습니다.</p>
      )}
    </React.Fragment>
  );
};

export default ChatBox;
