import React, { useEffect, useState } from "react";
import authAxios from "../../utils/authAxios";
import useUserStore from "../../store/userStore";

// 컴포넌트
// import Chatroom from "./Chatroom";

// 이미지 소스
import Room from "../../assets/Room1.jpg";
import { useNavigate } from "react-router-dom";

interface ChatBoxI {
  userNickname: string;
  chatRoomId: number;
  productAddress: string;
}

const ChatBox: React.FC = () => {
  const { id } = useUserStore();
  const navigate = useNavigate();
  const [chatBoxData, setChatBoxData] = useState<Array<ChatBoxI>>([]);

  useEffect(() => {
    authAxios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/chatrooms/${id}`,
    })
      .then((response) => {
        console.log(response);
        const tempChatData: Array<ChatBoxI> = [];
        for (let i = 0; i < response.data.data.length; i++) {
          tempChatData.push({
            productAddress:
              response.data.data[i].productReturnDto.productAddress,
            chatRoomId: response.data.data[i].chatroomId,
            userNickname: response.data.data[i].profileDto.nickname,
          });
        }
        setChatBoxData(tempChatData);
        console.log(response.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <React.Fragment>
      {chatBoxData.length > 0 ? (
        chatBoxData.map((room) => {
          return (
            <div
              className="hover:pointer"
              onClick={() => {
                navigate(`${room.chatRoomId}`);
              }}
            >
              <p>{room.productAddress}</p>
              <p>{room.userNickname}</p>
            </div>
          );
        })
      ) : (
        <p>등록된 채팅이 없습니다.</p>
      )}
    </React.Fragment>
  );
};

export default ChatBox;
