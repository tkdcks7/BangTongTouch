import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

const VideoChat: React.FC = () => {
  const [roomName, setRoomName] = useState<string>("");
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [muted, setMuted] = useState<boolean>(false);
  const [cameraOff, setCameraOff] = useState<boolean>(false);

  const myFaceRef = useRef<HTMLVideoElement | null>(null);
  const peerFaceRef = useRef<HTMLVideoElement | null>(null);
  const camerasSelectRef = useRef<HTMLSelectElement | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    if (!roomName) return; // 방 이름이 설정되지 않은 경우 실행 안 함

    const initSocket = () => {
      socketRef.current = io("https://i11d206.p.ssafy.io", {
        path: "/rtc/socket.io/",
        withCredentials: true,
        transports: ["websocket"],
      });

      socketRef.current.on("welcome", handleWelcome);
      socketRef.current.on("offer", handleOffer);
      socketRef.current.on("answer", handleAnswer);
      socketRef.current.on("ice", handleIce);
    };

    const handleWelcome = async () => {
      if (peerConnectionRef.current) {
        try {
          console.log("welcome");
          const dataChannel =
            peerConnectionRef.current.createDataChannel("chat");
          dataChannel.addEventListener("message", (event) =>
            console.log("DataChannel message:", event.data),
          );

          const offer = await peerConnectionRef.current.createOffer();
          await peerConnectionRef.current.setLocalDescription(offer);
          console.log("Sending offer:", offer);
          socketRef.current?.emit("offer", offer, roomName);
        } catch (error) {
          console.error("Error in 'welcome' event handler:", error);
        }
      }
    };

    const handleOffer = async (offer: RTCSessionDescriptionInit) => {
      if (peerConnectionRef.current) {
        console.log("offer");
        peerConnectionRef.current.addEventListener("datachannel", (event) => {
          const channel = event.channel;
          if (channel) {
            channel.addEventListener("message", (event) =>
              console.log("DataChannel message:", event.data),
            );
          }
        });

        try {
          await peerConnectionRef.current.setRemoteDescription(offer);
          const answer = await peerConnectionRef.current.createAnswer();
          await peerConnectionRef.current.setLocalDescription(answer);
          socketRef.current?.emit("answer", answer, roomName);
        } catch (error) {
          console.error("Error handling offer:", error);
        }
      }
    };

    const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
      if (peerConnectionRef.current) {
        try {
          console.log("answer");
          await peerConnectionRef.current.setRemoteDescription(answer);
        } catch (error) {
          console.error("Error handling answer:", error);
        }
      }
    };

    const handleIce = async (ice: RTCIceCandidateInit) => {
      if (peerConnectionRef.current) {
        try {
          console.log("handle ice");
          await peerConnectionRef.current.addIceCandidate(ice);
        } catch (error) {
          console.error("Error handling ICE candidate:", error);
        }
      }
    };

    const cleanupSocket = () => {
      socketRef.current?.off("welcome", handleWelcome);
      socketRef.current?.off("offer", handleOffer);
      socketRef.current?.off("answer", handleAnswer);
      socketRef.current?.off("ice", handleIce);
      socketRef.current?.disconnect();
    };

    const initCall = async () => {
      if (!roomName) return;
      await getMedia(camerasSelectRef.current?.value);
      makeConnection();
    };

    initSocket();
    initCall();

    return () => {
      cleanupSocket();
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, [roomName]);

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
    if (peerConnectionRef.current) {
      const videoTrack = myStream?.getVideoTracks()[0];
      const videoSender = peerConnectionRef.current
        .getSenders()
        .find((sender) => sender.track?.kind === "video");
      if (videoTrack && videoSender) {
        videoSender.replaceTrack(videoTrack);
      }
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

    peerConnectionRef.current = peerConnection;

    console.log("PeerConnection created:", peerConnection);
    socketRef.current?.emit("join_room", roomName);
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
    }
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
