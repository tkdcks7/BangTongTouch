import React, { useEffect, useState } from "react";
import useUserStore from "../../store/userStore";
import authAxios from "../../utils/authAxios";
import { useNavigate, useParams } from "react-router-dom";

// 컴포넌트
import Loading from "../atoms/Loading";

// 이미지 소스
import { RightOutlined } from "@ant-design/icons";
import defaultProfile from "../../assets/defaultprofile.jpg";

interface ChatBoxI {
  userNickname: string;
  chatRoomId: number;
  productAddress: string;
  productId: string;
  profileImg: string;
}

const ChatBox: React.FC = () => {
  const { id } = useUserStore();
  const navigate = useNavigate();
  const [chatBoxData, setChatBoxData] = useState<Array<ChatBoxI>>([]);
  const { roomId } = useParams();

  useEffect(() => {
    authAxios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/chatrooms/${id}`,
    })
      .then((response) => {
        console.log(response);
        const tempChatData: Array<ChatBoxI> = response.data.data.map(
          (item: any) => ({
            productAddress: item.productReturnDto.productAddress,
            chatRoomId: item.chatroomId,
            userNickname: item.profileDto.nickname,
            profileImg: item.profileDto.profileImage,
            productId: item.productReturnDto.productId,
          })
        );
        setChatBoxData(tempChatData);
        console.log(response.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      {chatBoxData.length > 0 ? (
        chatBoxData.map((room) => (
          <div
            key={room.chatRoomId} // 각 요소에 고유 키를 추가
            className={`p-3 flex justify-between items-center px-4 hover:cursor-pointer hover:bg-lime-300 dark:hover:bg-lime-500 ${
              roomId === String(room.chatRoomId)
                ? "bg-lime-300 dark:bg-lime-500"
                : ""
            }`} // 클래스명 조건부 적용 수정
            onClick={() => navigate(`${room.chatRoomId}`)}
          >
            <div>
              <p className="font-bold mb-1">{room.productAddress}</p>
              <div className="flex items-center">
                <img
                  src={
                    room.profileImg
                      ? `${process.env.REACT_APP_BACKEND_SRC_URL}/${room.profileImg}`
                      : defaultProfile
                  }
                  alt="프사"
                  className="w-8 h-8 me-3 rounded-full"
                />
                <p>{room.userNickname}</p>
              </div>
            </div>
            <RightOutlined />
          </div>
        ))
      ) : (
        <Loading />
      )}
    </React.Fragment>
  );
};

export default ChatBox;
