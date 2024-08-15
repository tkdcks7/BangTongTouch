import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

const VideoChat: React.FC = () => {
  const [roomName, setRoomName] = useState<string>("");
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [myPeerConnection, setMyPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  const [myDataChannel, setMyDataChannel] = useState<RTCDataChannel | null>(
    null,
  );
  const [muted, setMuted] = useState<boolean>(false);
  const [cameraOff, setCameraOff] = useState<boolean>(false);

  const myFaceRef = useRef<HTMLVideoElement | null>(null);
  const peerFaceRef = useRef<HTMLVideoElement | null>(null);
  const camerasSelectRef = useRef<HTMLSelectElement | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const initWebRTC = async () => {
      if (!roomName) return;
      await initCall();
      if (camerasSelectRef.current) {
        await getCameras();
      }
      socketRef.current?.emit("join_room", roomName);
    };

    socketRef.current = io("https://i11d206.p.ssafy.io/rtc", {
      withCredentials: true,
      transports: ["websocket"], // WebSocket을 사용하여 연결 시도
    });

    const handleWelcome = async () => {
      if (myPeerConnection) {
        try {
          const dataChannel = myPeerConnection.createDataChannel("chat");
          dataChannel.addEventListener("message", (event) =>
            console.log(event.data),
          );
          setMyDataChannel(dataChannel);

          const offer = await myPeerConnection.createOffer();
          await myPeerConnection.setLocalDescription(offer);
          socketRef.current?.emit("offer", offer, roomName);
        } catch (error) {
          console.error("Error in 'welcome' event handler:", error);
        }
      }
    };

    const handleOffer = async (offer: RTCSessionDescriptionInit) => {
      if (myPeerConnection) {
        myPeerConnection.addEventListener("datachannel", (event) => {
          const channel = event.channel;
          if (channel) {
            setMyDataChannel(channel);
            channel.addEventListener("message", (event) =>
              console.log(event.data),
            );
          }
        });

        try {
          await myPeerConnection.setRemoteDescription(offer);
          const answer = await myPeerConnection.createAnswer();
          await myPeerConnection.setLocalDescription(answer);
          socketRef.current?.emit("answer", answer, roomName);
        } catch (error) {
          console.error("Error handling offer:", error);
        }
      }
    };

    const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
      if (myPeerConnection) {
        try {
          await myPeerConnection.setRemoteDescription(answer);
        } catch (error) {
          console.error("Error handling answer:", error);
        }
      }
    };

    const handleIce = async (ice: RTCIceCandidateInit) => {
      if (myPeerConnection) {
        try {
          await myPeerConnection.addIceCandidate(ice);
        } catch (error) {
          console.error("Error handling ICE candidate:", error);
        }
      }
    };

    socketRef.current.on("welcome", handleWelcome);
    socketRef.current.on("offer", handleOffer);
    socketRef.current.on("answer", handleAnswer);
    socketRef.current.on("ice", handleIce);

    return () => {
      socketRef.current?.off("welcome", handleWelcome);
      socketRef.current?.off("offer", handleOffer);
      socketRef.current?.off("answer", handleAnswer);
      socketRef.current?.off("ice", handleIce);
      socketRef.current?.disconnect();
      if (myPeerConnection) {
        myPeerConnection.close();
      }
    };
  }, [roomName, myPeerConnection]);

  const getCameras = async () => {
    if (camerasSelectRef.current) {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(
          (device) => device.kind === "videoinput",
        );
        const currentCamera = myStream?.getVideoTracks()[0];

        camerasSelectRef.current.innerHTML = "";
        cameras.forEach((camera) => {
          const option = document.createElement("option");
          option.value = camera.deviceId;
          option.text =
            camera.label ||
            `Camera ${camerasSelectRef.current!!.options.length + 1}`;
          if (currentCamera?.label === camera.label) {
            option.selected = true;
          }
          camerasSelectRef.current!!.appendChild(option);
        });
      } catch (error) {
        console.error("Error getting cameras:", error);
      }
    }
  };

  const getMedia = async (deviceId?: string) => {
    const constraints = deviceId
      ? { audio: true, video: { deviceId: { exact: deviceId } } }
      : { audio: true, video: { facingMode: "user" } };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setMyStream(stream);
      if (myFaceRef.current) {
        myFaceRef.current.srcObject = stream;
      }
      if (!deviceId) {
        await getCameras();
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const handleMuteClick = () => {
    if (myStream) {
      myStream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setMuted(!muted);
    }
  };

  const handleCameraClick = () => {
    if (myStream) {
      myStream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setCameraOff(!cameraOff);
    }
  };

  const handleCameraChange = async () => {
    await getMedia(camerasSelectRef.current?.value);
    if (myPeerConnection) {
      const videoTrack = myStream?.getVideoTracks()[0];
      const videoSender = myPeerConnection
        .getSenders()
        .find((sender) => sender.track?.kind === "video");
      if (videoTrack && videoSender) {
        videoSender.replaceTrack(videoTrack);
      }
    }
  };

  const initCall = async () => {
    if (!roomName) return;
    await getMedia(camerasSelectRef.current?.value);
    makeConnection();
  };

  const handleWelcomeSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const input = (
      event.currentTarget.querySelector("input") as HTMLInputElement
    )?.value;
    if (input) {
      setRoomName(input);
      await initCall();
      socketRef.current?.emit("join_room", input);
    }
  };

  const makeConnection = () => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ],
        },
      ],
    });

    peerConnection.addEventListener("icecandidate", (event) => {
      if (event.candidate) {
        socketRef.current?.emit("ice", event.candidate, roomName);
      }
    });

    peerConnection.addEventListener("track", (event) => {
      if (peerFaceRef.current) {
        peerFaceRef.current.srcObject = event.streams[0];
      }
    });

    if (myStream) {
      myStream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, myStream));
    }

    setMyPeerConnection(peerConnection);
  };

  return (
    <div>
      <div id="welcome">
        <form onSubmit={handleWelcomeSubmit}>
          <input placeholder="room name" type="text" />
          <button type="submit">Enter room</button>
        </form>
      </div>
      <div id="call">
        <video id="myFace" ref={myFaceRef} autoPlay playsInline></video>
        <button id="mute" onClick={handleMuteClick}>
          {muted ? "Unmute" : "Mute"}
        </button>
        <button id="camera" onClick={handleCameraClick}>
          {cameraOff ? "Turn Camera On" : "Turn Camera Off"}
        </button>
        <select
          id="cameras"
          ref={camerasSelectRef}
          onChange={handleCameraChange}
        ></select>
        <video id="peerFace" ref={peerFaceRef} autoPlay playsInline></video>
      </div>
    </div>
  );
};

export default VideoChat;
