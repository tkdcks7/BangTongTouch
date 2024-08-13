import React, { useEffect, useState } from "react";
import authAxios from "../../utils/authAxios";
import useUserStore from "../../store/userStore";

// 컴포넌트
import ImgCarousel from "./ImgCarousel";

// 이미지 소스
import Room from "../../assets/Room1.jpg";
import { useNavigate } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import Devider from "../atoms/Devider";

interface ChatBoxI {
  userNickname: string;
  chatRoomId: number;
  productAddress: string;
  productId: string;
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
            productId: response.data.data[i].productReturnDto.productId,
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
            <div>
              <div
                className="my-5 flex justify-between items-center px-4 hover:cursor-pointer"
                onClick={() => {
                  navigate(`${room.chatRoomId}`);
                }}
              >
                <div>
                  <p className="font-bold mb-1">{room.productAddress}</p>
                  <p>{room.userNickname}</p>
                </div>
                <div>
                  <RightOutlined />
                </div>
              </div>
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
