import React, { useEffect, useRef, useState } from "react";
import SocketService from "../../utils/SocketService";

interface VideoChatProps {
  roomId: string;
}

const VideoChat: React.FC<VideoChatProps> = ({ roomId }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const [camKey, setCamKey] = useState<string | null>(null);

  useEffect(() => {
    const setupConnection = async () => {
      await new Promise<void>((resolve) => {
        SocketService.connect();

        const checkConnection = setInterval(() => {
          if (SocketService.client.connected) {
            clearInterval(checkConnection);
            resolve();
          }
        }, 100);
      });

      setupWebRTC();
    };

    setupConnection();

    return () => {
      SocketService.disconnect();
    };
  }, []);

  const setupWebRTC = async () => {
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
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate && camKey) {
        SocketService.send(
          `/app/peer/iceCandidate/${camKey}/${roomId}`,
          event.candidate,
        );
      }
    };

    SocketService.subscribe("/topic/call/key", (message) => {
      const key = JSON.parse(message.body);
      setCamKey(key);
      subscribeToRoom(key);
    });

    SocketService.send("/app/send/key", { roomId });
  };

  const subscribeToRoom = (key: string) => {
    SocketService.subscribe(`/topic/peer/offer/${key}/${roomId}`, handleOffer);
    SocketService.subscribe(
      `/topic/peer/iceCandidate/${key}/${roomId}`,
      handleIceCandidate,
    );
  };

  const handleOffer = async (message: { body: string }) => {
    const offer = JSON.parse(message.body);
    await peerConnectionRef.current?.setRemoteDescription(
      new RTCSessionDescription(offer),
    );
    const answer = await peerConnectionRef.current?.createAnswer();
    await peerConnectionRef.current?.setLocalDescription(answer);
    if (camKey) {
      SocketService.send(`/app/peer/offer/${camKey}/${roomId}`, answer);
    }
  };

  const handleIceCandidate = (message: { body: string }) => {
    const candidate = JSON.parse(message.body);
    peerConnectionRef.current?.addIceCandidate(new RTCIceCandidate(candidate));
  };

  return (
    <div>
      <div>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className={`scale-x-[-1]`}
        />
      </div>
      <div>
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className={`scale-x-[-1]`}
        />
      </div>
    </div>
  );
};

export default VideoChat;
