import React, { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const WebRTCComponent = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    // Socket.io 연결
    socketRef.current = io("http://localhost:4000");

    // PeerConnection 설정
    peerConnectionRef.current = new RTCPeerConnection();

    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current?.emit("candidate", event.candidate);
      }
    };

    peerConnectionRef.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // 클라이언트 시그널링 핸들링
    socketRef.current.on("offer", async (data: any) => {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(data),
        );
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);
        socketRef.current?.emit("answer", answer);
      }
    });

    socketRef.current.on("answer", async (data: any) => {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(data),
        );
      }
    });

    socketRef.current.on("candidate", async (data: any) => {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.addIceCandidate(
          new RTCIceCandidate(data),
        );
      }
    });

    // 로컬 미디어 스트림 가져오기
    const startMediaStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      stream.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, stream);
      });
    };

    startMediaStream();

    return () => {
      socketRef.current?.disconnect();
      peerConnectionRef.current?.close();
    };
  }, []);

  const createOffer = async () => {
    if (peerConnectionRef.current) {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      socketRef.current?.emit("offer", offer);
    }
  };

  return (
    <div>
      <video ref={localVideoRef} autoPlay playsInline></video>
      <video ref={remoteVideoRef} autoPlay playsInline></video>
      <button onClick={createOffer}>Call</button>
    </div>
  );
};

export default WebRTCComponent;
