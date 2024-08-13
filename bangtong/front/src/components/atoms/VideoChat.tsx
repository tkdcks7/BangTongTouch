import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import Video from "./Video";
import VideoButton from "./VideoButton";

interface SignalingMessage {
  type: string;
  sdp?: any;
  candidate?: RTCIceCandidateInit;
  target: string;
}

interface ExtendedPeerInstance extends Peer.Instance {
  addIceCandidate: (candidate: RTCIceCandidate) => void;
}

const VideoChat: React.FC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<ExtendedPeerInstance | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Get local video stream
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      })
      .catch((error) => console.error("Error accessing media devices:", error));

    // Connect to signaling server
    socketRef.current = new WebSocket("ws://localhost:8080/signal");
    socketRef.current.onmessage = handleSignalingMessage;

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const handleSignalingMessage = (event: MessageEvent) => {
    const message: SignalingMessage = JSON.parse(event.data);
    if (message.type === "offer") {
      handleOffer(message);
    } else if (message.type === "answer") {
      handleAnswer(message);
    } else if (message.type === "ice-candidate") {
      handleNewICECandidate(message);
    }
  };

  const createPeer = (initiator: boolean) => {
    if (!localStream) return;

    const newPeer = new Peer({
      initiator,
      trickle: false,
      stream: localStream,
    }) as ExtendedPeerInstance;

    newPeer.on("signal", (data: any) => {
      if (socketRef.current) {
        socketRef.current.send(
          JSON.stringify({
            type: initiator ? "offer" : "answer",
            sdp: data,
            target: "remote-peer-id", // Replace with actual peer ID
          }),
        );
      }
    });

    newPeer.on("stream", (stream: MediaStream) => {
      setRemoteStream(stream);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    });

    setPeer(newPeer);
  };

  const handleOffer = (offer: SignalingMessage) => {
    createPeer(false);
    if (peer) {
      peer.signal(offer.sdp);
    }
  };

  const handleAnswer = (answer: SignalingMessage) => {
    if (peer) {
      peer.signal(answer.sdp);
    }
  };

  const handleNewICECandidate = (message: SignalingMessage) => {
    if (peer && message.candidate) {
      peer.addIceCandidate(new RTCIceCandidate(message.candidate));
    }
  };

  const startCall = () => {
    createPeer(true);
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
    }
  };

  const endCall = () => {
    if (peer) {
      peer.destroy();
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    setLocalStream(null);
    setRemoteStream(null);
    setPeer(null);
  };

  return (
    <div>
      <Video ref={localVideoRef} autoPlay muted playsInline />
      <Video ref={remoteVideoRef} autoPlay playsInline />
      <VideoButton onClick={startCall}>Start Call</VideoButton>
      <VideoButton onClick={toggleAudio}>Toggle Audio</VideoButton>
      <VideoButton onClick={toggleVideo}>Toggle Video</VideoButton>
      <VideoButton onClick={endCall}>End Call</VideoButton>
    </div>
  );
};

export default VideoChat;
