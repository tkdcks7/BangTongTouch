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
import Chat from "../molecules/Chat";

interface ChatI {
  chatRoom: number;
  chatContent: string;
  sender: number;
}

interface ShowMessage {
  chatContent: string;
  chatTime: string;
  userId?: number;
}

const ChatDetail: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const userId = useUserStore().id;
  const url: string = `${process.env.REACT_APP_BACKEND_URL}/ws`;
  const connectUrl: string = `/topic/greetings/${roomId}`;
  const sendUrl: string = `/app/hello/${roomId}`;
  const [pfpSrc, setPfpSrc] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const navigate = useNavigate();

  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<ShowMessage>>([]);
  const [chatMessage, setChatMessage] = useState<string>();

  const clientRef = useRef<Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const addMessage = (message: string) => {
    console.log(message);
    const parsedJson = JSON.parse(message);
    console.log(parsedJson);
    const data = JSON.parse(parsedJson.data);
    console.log(data);
    // const jsonStr = parsedJson.data
    //   .toString()
    //   .replace(/=/g, ":")
    //   .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3')
    //   .replace(/:\s*([^",}\s]+)/g, ': "$1"');
    // const content = JSON.parse(jsonStr);
    // const chat: ShowMessage = {
    //   chatContent: content.chatContent,
    //   chatTime: now.toString(),
    // };
    // setMessages((prev) => [...(prev || []), chat]);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    const loadMessages = async () => {
      await authAxios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKEND_URL}/chatrooms/chat/1`,
      })
        .then((response) => {
          if (response.data.data.maker.userId === userId) {
            setPfpSrc(response.data.data.maker.profileImage);
            setNickName(response.data.data.maker.nickname);
          } else {
            setPfpSrc(response.data.data.participant.profileImage);
            setNickName(response.data.data.participant.nickname);
          }
          setMessages(response.data.data.content);
        })
        .catch((error) => {
          console.log(error);
          alert("잘못된 접근입니다.");
          navigate("/");
        });
    };

    const connectWS = () => {
      if (clientRef.current && clientRef.current.active) {
        return;
      }

      const sock = new SockJS(url);
      clientRef.current = Stomp.over(sock);

      clientRef.current.activate();
      clientRef.current.onConnect = (frame) => {
        setConnected(true);
        clientRef.current!.subscribe(connectUrl, (message) => {
          addMessage(message.body);
        });
      };
    };

    loadMessages();
    connectWS();

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  const sendMessage = () => {
    if (chatMessage && chatMessage.trim() !== "") {
      const chat: ChatI = {
        chatRoom: parseInt(roomId!!),
        sender: userId,
        chatContent: chatMessage!!,
      };
      clientRef.current?.publish({
        destination: sendUrl,
        body: JSON.stringify({ chat }),
      });
      setChatMessage("");
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <RollBackBtn />
        <div className="inline-block text-center h-10 ms-3">{nickName}</div>
      </div>
      <div
        className="flex-row"
        ref={chatContainerRef}
        style={{
          overflowY: "auto",
          maxHeight: "400px",
        }}
      >
        <div className="flex mt-3">
          <img
            src={defaultProfile}
            alt="프로필 사진"
            className="w-10 h-10 rounded-full me-3"
          />
          <ChatMsgBox message="안녕하세요~" date="2024-07-26 17:41" />
        </div>
        {messages.map((item, index) => (
          <Chat
            chatContent={item.chatContent}
            chatTime={item.chatTime}
            key={index}
            imgUrl={process.env.REACT_APP_BACKEND_SRC_URL + pfpSrc}
            flag={true}
          />
        ))}
        <div className="flex mt-3 justify-end">
          <ChatMsgBox
            message="안녕하세요~"
            backgroundColor="bg-lime-500"
            date="2024-07-26 17:41"
            flag={true}
          />
        </div>
        <div ref={messagesEndRef} /> {/* 스크롤 이동을 위한 빈 div */}
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
              if (connected) sendMessage();
              else alert("연결중입니다. 잠시만 기다려주세요.");
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
