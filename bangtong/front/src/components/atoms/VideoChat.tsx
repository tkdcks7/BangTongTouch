import React, { useEffect, useRef, useState } from "react";
import SocketService from "../../utils/SocketService";
import { useParams } from "react-router-dom";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

const VideoChat: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
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
    try {
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
        console.log("Received event", event);

        if (remoteVideoRef.current) {
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

      peerConnectionRef.current.onconnectionstatechange = () => {
        console.log(
          "Connection statechange",
          peerConnectionRef.current?.connectionState,
        );
      };

      SocketService.subscribe("/topic/call/key", (message) => {
        const key = JSON.parse(message.body);
        setCamKey(key);
        subscribeToRoom(key);
      });

      SocketService.send("/app/send/key", { roomId });
    } catch (error) {
      console.error("Error occurred while sending message", error);
    }
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

  const handleOffer = async (message: { body: string }) => {
    try {
      const offer = JSON.parse(message.body);
      await peerConnectionRef.current?.setRemoteDescription(
        new RTCSessionDescription(offer),
      );
      const answer = await peerConnectionRef.current?.createAnswer();
      await peerConnectionRef.current?.setLocalDescription(answer);
      if (camKey) {
        SocketService.send(`/app/peer/offer/${camKey}/${roomId}`, answer);
      }
    } catch (error) {
      console.error("Error handling offer: ", error);
    }
  };

  const handleAnswer = async (message: { body: string }) => {
    try {
      const answer = JSON.parse(message.body);
      await peerConnectionRef.current?.setRemoteDescription(
        new RTCSessionDescription(answer),
      );
    } catch (error) {
      console.error("Error handling answer:", error);
    }
  };

  const handleIceCandidate = (message: { body: string }) => {
    try {
      const candidate = JSON.parse(message.body);
      peerConnectionRef.current?.addIceCandidate(
        new RTCIceCandidate(candidate),
      );
    } catch (error) {
      console.error("Error handling ICE candidate:", error);
    }
  };

  return (
    <div>
      <h2>Room: {roomId}</h2>
      <div>
        <h3>Local Video</h3>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className={`scale-x-[-1]`}
        />
      </div>
      <div>
        <h3>Remote Video</h3>
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
