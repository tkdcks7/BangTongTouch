import React, { FormEvent, useEffect, useRef, useState } from "react";

// 컴포넌트
import RollBackBtn from "../atoms/RollBackBtn";
import ChatMsgBox from "../atoms/ChatMsgBox";
import ChatAdditionalBar from "./ChatAdditionalBar";

// 이미지 소스
import defaultProfile from "../../assets/defaultprofile.jpg";
import InputBox from "../molecules/InputBox";
import authAxios from "../../utils/authAxios";
import { useNavigate, useParams } from "react-router-dom";
import { Client, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import useUserStore from "../../store/userStore";

interface ChatI {
  chatRoom: number;
  sender: number;
  chatContent: string;
  timestamp?: Date;
  receiver: number;
}

const ChatDetail: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const userId = useUserStore().id;
  const url: string = `${process.env.REACT_APP_BACKEND_URL}/ws`;
  const connectUrl: string = `/topic/greetings/${roomId}`;
  const sendUrl: string = `app/hello/${roomId}`;
  const navigate = useNavigate();

  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<string>>([]);
  const [chatMessage, setChatMessage] = useState<string>();

  const clientRef = useRef<Client | null>(null);

  const addMessage = (message: string) => {
    console.log(message);
    // setMessages((prev) => [...(prev || []), message]);
  };

  useEffect(() => {
    const handleBeforeUnloload = () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnloload);

    const loadMessages = async () => {
      await authAxios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKEND_URL}/chatrooms/chat/1`,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          alert("잘못된 접근입니다.");
          // navigate("/");
        });
    };
    const connectWS = () => {
      if (clientRef.current && clientRef.current.active) {
        console.log("WebSocket is already connected");
        return;
      }

      const sock = new SockJS(url);
      clientRef.current = Stomp.over(sock);

      clientRef.current.activate();
      clientRef.current.onConnect = (frame) => {
        console.log("connected:", frame);
        setConnected(true);
        console.log("ShowMessages");
        console.log(clientRef.current);
        clientRef.current!.subscribe(connectUrl, (message) => {
          console.log(message.body);
          addMessage(message.body);
        });
      };
    };
    loadMessages();
    connectWS();
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnloload);
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, []);

  const sendMessage = () => {
    if (chatMessage && chatMessage.trim() !== "") {
      const chat: ChatI = {
        chatRoom: parseInt(roomId!!),
        sender: userId,
        receiver: 2,
        chatContent: chatMessage!!,
      };
      clientRef.current?.publish({
        destination: sendUrl,
        body: JSON.stringify({ chat }),
      });
      setChatMessage("");
    }
  };

  // const disconnect = () => {
  //   if (clientRef.current) {
  //     clientRef.current.deactivate();
  //     setConnected(false);
  //     console.log("disConnected");
  //   }
  // };

  return (
    <div>
      <RollBackBtn />
      <div className="flex-row">
        <div className="flex mt-3">
          <img
            src={defaultProfile}
            alt="프로필 사진"
            className="w-10 h-10 rounded-full me-3"
          />
          <ChatMsgBox message="안녕하세요~" date="2024-07-26 17:41" />
        </div>
        <div className="flex mt-3">
          <img
            src={defaultProfile}
            alt="프로필 사진"
            className="w-10 h-10 rounded-full me-3"
          />
          <ChatMsgBox message="안녕하세요~" date="2024-07-26 17:41" />
        </div>

        <div className="flex mt-3 justify-end">
          <ChatMsgBox
            message="안녕하세요~"
            backgroundColor="bg-lime-500"
            date="2024-07-26 17:41"
            flag={true}
          />
        </div>
      </div>
      <div className="mt-10">
        <InputBox
          placeholder="채팅 입력"
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          width={"auto"}
          buttonType="send"
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              sendMessage();
            }
          }}
          onIconClick={sendMessage}
        />
      </div>
      <ChatAdditionalBar />
    </div>
  );
};

export default ChatDetail;
