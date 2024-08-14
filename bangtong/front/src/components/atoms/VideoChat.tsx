import React, { useEffect, useRef, useState } from "react";
import SocketService from "../../utils/SocketService";
import WebRTCService from "../../utils/WebRTCService";

interface VideoChatProps {
  roomId: string;
  userId: string;
}

const VideoChat: React.FC<VideoChatProps> = ({ roomId, userId }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const initializeVideoChat = async () => {
      await SocketService.connect();
      await WebRTCService.initializePeerConnection(roomId);

      SocketService.subscribe(`/topic/signal/${roomId}`, (message) => {
        const data = JSON.parse(message.body);
        switch (data.type) {
          case "offer":
            WebRTCService.handleOffer(data.sdp, roomId);
            break;
          case "answer":
            WebRTCService.handleAnswer(data.sdp);
            break;
          case "ice-candidate":
            WebRTCService.handleIceCandidate(data.candidate);
            break;
        }
      });

      SocketService.subscribe(`/topic/join/${roomId}`, (message) => {
        const joinedUserId = message.body;
        if (joinedUserId !== userId) {
          WebRTCService.createOffer(roomId);
        }
      });

      SocketService.send(`/app/join/${roomId}`, userId);

      const localStream = WebRTCService.getLocalStream();
      if (localVideoRef.current && localStream) {
        localVideoRef.current.srcObject = localStream;
      }

      setIsConnected(true);
    };

    initializeVideoChat();

    return () => {
      WebRTCService.closeConnection();
      SocketService.disconnect();
    };
  }, [roomId, userId]);

  useEffect(() => {
    const remoteStream = WebRTCService.getRemoteStream();
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [isConnected]);

  return (
    <div>
      <h2>Video Chat Room: {roomId}</h2>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <h3>Local Video</h3>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            style={{ width: "400px" }}
          />
        </div>
        <div>
          <h3>Remote Video</h3>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{ width: "400px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoChat;
