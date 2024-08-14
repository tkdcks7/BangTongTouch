import React, { useEffect, useRef, useState } from "react";

// 아이콘
import {
  VideoCameraOutlined,
  PaperClipOutlined,
  SmileOutlined,
  CalendarOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import authAxios from "../../utils/authAxios";
import { Modal, Select } from "antd";
import SocketService from "../../utils/SocketService";

interface ChatAdditionalBarProps {
  roomId: string;
  reportUserId: number;
  reportUserNickname: string;
}

const ChatAdditionalBar: React.FC<ChatAdditionalBarProps> = ({
  roomId,
  reportUserId,
  reportUserNickname,
}) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!SocketService.client.connected) {
  //     SocketService.connect();
  //   }
  //
  //   return () => {
  //     if (SocketService.client.connected) {
  //       SocketService.disconnect();
  //     }
  //   };
  // }, []);
  //
  // const handleVideoChat = () => {
  //   const setupConnection = async () => {
  //     if (!SocketService.client.connected) {
  //       await new Promise<void>((resolve) => {
  //         SocketService.connect();
  //         const checkConnection = setInterval(() => {
  //           if (SocketService.client.connected) {
  //             clearInterval(checkConnection);
  //             resolve();
  //           }
  //         }, 100);
  //       });
  //     }
  //
  //     SocketService.subscribe("/topic/video-room/joined", (message) => {
  //       const { videoRoomId, isInitiator } = JSON.parse(message.body);
  //       navigate(`/chats/videochat/${videoRoomId}`);
  //     });
  //
  //     SocketService.send("/app/join/video-room", roomId);
  //   };
  //
  //   setupConnection();
  // };

  const reportRef = useRef<string>("");
  const reportTypeRef = useRef<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const changeModalStatus = () => {
    reportRef.current = "";
    setIsModalOpen(!isModalOpen);
  };
  const reportComment = () => {
    if (reportTypeRef.current === 0) {
      alert("신고 유형을 선택해주세요.");
      return;
    }

    if (reportRef.current === "") {
      alert("사유를 입력해주세요.");
      return;
    }
    authAxios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/reports`,
      data: {
        reportSubjectTypeId: 2,
        reportTypeId: reportTypeRef.current,
        content: reportRef.current,
        subjectId: reportUserId,
      },
    })
      .then((response) => {
        alert("신고가 완료되었습니다.");
        reportRef.current = "";
      })
      .catch((error) => {
        alert("로그인 후 이용하실 수 있습니다.");
      });
    changeModalStatus();
  };

  return (
    <div className="w-full bg-yellow-200 fixed md:static bottom-16 left-0 flex justify-around p-2 md:rounded-2xl">
      <Modal
        title="댓글 신고"
        open={isModalOpen}
        onOk={reportComment}
        onCancel={changeModalStatus}
      >
        <div>
          <div>댓글 작성자: {reportUserNickname}</div>
        </div>
        <Select
          defaultValue={"신고 유형"}
          className="w-full my-2"
          onChange={(e) => {
            reportTypeRef.current = parseInt(e);
            console.log(reportTypeRef.current);
          }}
          options={[
            { value: 1, label: "스팸/도배" },
            { value: 2, label: "음란물" },
            { value: 3, label: "유해한 내용" },
            { value: 4, label: "비속어/차별적 표현" },
            { value: 5, label: "개인정보 노출" },
            { value: 6, label: "불쾌한 표현" },
          ]}
        />
        <span>신고 사유</span>
        <textarea
          className="w-full border resize-none"
          onChange={(e) => {
            console.log(e.target.value);
            reportRef.current = e.target.value;
          }}
        />
      </Modal>
      <button
        className="text-center"
        // onClick={handleVideoChat}
        // onClick={(e) => {
        //   navigate(`/chats/videochat/${roomId}`);
        // }}
      >
        <VideoCameraOutlined />
        <p>라이브 시작</p>
      </button>
      <button className="text-center">
        <PaperClipOutlined />
        <p>파일 첨부</p>
      </button>
      <button className="text-center">
        <SmileOutlined />
        <p>이모티콘</p>
      </button>
      <button className="text-center">
        <CalendarOutlined />
        <p>일정 잡기</p>
      </button>
      <button className="text-center" type="button" onClick={changeModalStatus}>
        <WarningOutlined />
        <p>신고하기</p>
      </button>
    </div>
  );
};

export default ChatAdditionalBar;
