// VideoChat.tsx
import React, { useEffect, useRef, useState } from "react";
import SocketService from "../../utils/SocketService";
import { useNavigate, useParams } from "react-router-dom";

const VideoChat: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const [camKey, setCamKey] = useState<string | null>(null);
  const [isInitiator, setIsInitiator] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const setupConnection = async () => {
      await new Promise<void>((resolve) => {
        SocketService.connect();
        console.log("Setting up connection");
        const checkConnection = setInterval(() => {
          if (SocketService.client.connected) {
            clearInterval(checkConnection);
            resolve();
          }
        }, 100);
      });

      SocketService.subscribe(`/topic/video-room/joined`, (message) => {
        const { videoRoomId, isInitiator } = JSON.parse(message.body);
        console.log(
          `Joined video room ${videoRoomId}. Initiator: ${isInitiator}`,
        );
        setIsInitiator(isInitiator === "true");
        setupWebRTC(isInitiator === "true");
      });

      SocketService.send("/app/join/video-room", roomId);
    };

    setupConnection();

    return () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      if (camKey) {
        SocketService.send(
          "/app/leave/video-room",
          JSON.stringify({ chatRoomId: roomId, videoRoomId: camKey }),
        );
      }
      SocketService.disconnect();
    };
  }, [roomId]);

  const setupWebRTC = async (initiator: boolean) => {
    try {
      console.log("initiator: " + initiator);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      peerConnectionRef.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      stream.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, stream);
      });

      peerConnectionRef.current.ontrack = (event) => {
        console.log("Received remote track", event);
        if (remoteVideoRef.current && event.streams && event.streams[0]) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate && camKey) {
          SocketService.send(
            `/app/peer/iceCandidate/${camKey}/${roomId}`,
            JSON.stringify(event.candidate),
          );
        }
      };

      SocketService.subscribe("/topic/call/key", handleCallKey);
      SocketService.send("/app/send/key", JSON.stringify({ roomId }));

      if (initiator) {
        createOffer();
      } else {
        console.log("Waiting for offer from initiator");
      }
    } catch (error) {
      console.error("Error setting up WebRTC:", error);
    }
  };

  const handleCallKey = (message: { body: string }) => {
    const parsedBody = JSON.parse(JSON.parse(message.body));
    const key = parsedBody.roomId;

    console.log(key);

    setCamKey(key);
    subscribeToRoom(key);

    // if (!isInitiator) {
    //   createOffer();
    // }
  };

  const subscribeToRoom = (key: string) => {
    SocketService.subscribe(`/topic/peer/offer/${key}/${roomId}`, handleOffer);
    SocketService.subscribe(
      `/topic/peer/answer/${key}/${roomId}`,
      handleAnswer,
    );
    SocketService.subscribe(
      `/topic/peer/iceCandidate/${key}/${roomId}`,
      handleIceCandidate,
    );
  };

  const createOffer = async () => {
    if (!peerConnectionRef.current || !camKey) {
      console.log("createOffer: peerConnectionRef NOT current");
      return;
    }

    try {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);

      SocketService.send(
        `/app/peer/offer/${camKey}/${roomId}`,
        JSON.stringify(offer),
      );
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };

  const handleOffer = async (message: { body: string }) => {
    if (!peerConnectionRef.current || !camKey) return;
    try {
      const offer = JSON.parse(message.body);
      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(offer),
      );

      if (!isInitiator) {
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);
        SocketService.send(
          `/app/peer/answer/${camKey}/${roomId}`,
          JSON.stringify(answer),
        );
      }
    } catch (error) {
      console.error("Error handling offer:", error);
    }
  };

  const handleAnswer = async (message: { body: string }) => {
    if (!peerConnectionRef.current) {
      console.log("handleAnswer: peerConnectionRef NOT current");
      return;
    }

    try {
      const answer = JSON.parse(message.body);
      console.log("Received remote answer:", answer);

      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(answer),
      );
    } catch (error) {
      console.error("Error handling answer:", error);
    }
  };

  const handleIceCandidate = (message: { body: string }) => {
    if (!peerConnectionRef.current) {
      console.log("handleIceCandidate: peerConnectionRef NOT current");
      return;
    }

    try {
      const cc = JSON.parse(JSON.parse(message.body));
      console.log(cc);
      // console.log(cc.candidate);

      peerConnectionRef.current.addIceCandidate(
        new RTCIceCandidate({
          candidate: cc.candidate,
          sdpMid: cc.sdpMid,
          sdpMLineIndex: cc.sdpMLineIndex,
          usernameFragment: cc.usernameFragment,
        }),
      );
    } catch (error) {
      console.error("Error handling ICE candidate:", error);
    }
  };

  const leaveChat = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    SocketService.disconnect();
    navigate("/");
  };

  return (
    <div className="video-chat-container">
      <h2>Video Chat Room: {roomId}</h2>
      <button onClick={leaveChat}>Leave Chat</button>
      <div className="video-container">
        <div>
          <h3>Local Video</h3>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="scale-x-[-1]"
            width="300px"
          />
        </div>
        <div>
          <h3>Remote Video</h3>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="scale-x-[-1]"
            width="300px"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoChat;
