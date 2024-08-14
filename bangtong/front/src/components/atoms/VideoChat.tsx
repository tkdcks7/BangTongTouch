import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io();

interface MediaStreamEvent extends Event {
  stream: MediaStream;
}

const WebRTCComponent: React.FC = () => {
  const myFaceRef = useRef<HTMLVideoElement>(null);
  const peerFaceRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [showCall, setShowCall] = useState(false);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState("");

  const myStreamRef = useRef<MediaStream | null>(null);
  const myPeerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const myDataChannelRef = useRef<RTCDataChannel | null>(null);

  const getCameras = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameraDevices = devices.filter(
        (device) => device.kind === "videoinput",
      );
      setCameras(cameraDevices);

      if (myStreamRef.current) {
        const currentCamera = myStreamRef.current.getVideoTracks()[0];
        setSelectedCamera(currentCamera.getSettings().deviceId || "");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getMedia = async (deviceId?: string) => {
    const initialConstraints = {
      audio: true,
      video: { facingMode: "user" },
    };
    const cameraConstraints = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    };
    try {
      myStreamRef.current = await navigator.mediaDevices.getUserMedia(
        deviceId ? cameraConstraints : initialConstraints,
      );
      if (myFaceRef.current) {
        myFaceRef.current.srcObject = myStreamRef.current;
      }
      if (!deviceId) {
        await getCameras();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleMuteClick = () => {
    if (myStreamRef.current) {
      myStreamRef.current
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setMuted(!muted);
    }
  };

  const handleCameraClick = () => {
    if (myStreamRef.current) {
      myStreamRef.current
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setCameraOff(!cameraOff);
    }
  };

  const handleCameraChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    await getMedia(event.target.value);
    if (myPeerConnectionRef.current) {
      const videoTrack = myStreamRef.current?.getVideoTracks()[0];
      const videoSender = myPeerConnectionRef.current
        .getSenders()
        .find((sender) => sender.track?.kind === "video");
      if (videoSender && videoTrack) {
        videoSender.replaceTrack(videoTrack);
      }
    }
  };

  const initCall = async () => {
    setShowCall(true);
    await getMedia();
    makeConnection();
  };

  const handleWelcomeSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    await initCall();
    socket.emit("join_room", roomName);
    setRoomName("");
  };

  const makeConnection = () => {
    myPeerConnectionRef.current = new RTCPeerConnection({
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
    myPeerConnectionRef.current.addEventListener("icecandidate", handleIce);
    // @ts-ignore
    myPeerConnectionRef.current.addEventListener("addstream", handleAddStream);
    myStreamRef.current?.getTracks().forEach((track) => {
      if (myPeerConnectionRef.current && myStreamRef.current) {
        myPeerConnectionRef.current.addTrack(track, myStreamRef.current);
      }
    });
  };

  const handleIce = (data: RTCPeerConnectionIceEvent) => {
    console.log("sent candidate");
    socket.emit("ice", data.candidate, roomName);
  };

  const handleAddStream = (data: MediaStreamEvent) => {
    console.log("got an stream from my peer");
    if (peerFaceRef.current) {
      peerFaceRef.current.srcObject = data.stream;
    }
  };

  useEffect(() => {
    socket.on("welcome", async () => {
      if (myDataChannelRef.current !== undefined) {
        // @ts-ignore
        myDataChannelRef.current =
          myPeerConnectionRef.current?.createDataChannel("chat");
        myDataChannelRef.current?.addEventListener("message", (event) =>
          console.log(event.data),
        );
        console.log("made data channel");
        const offer = await myPeerConnectionRef.current?.createOffer();
        myPeerConnectionRef.current?.setLocalDescription(offer);
        console.log("sent the offer");
        socket.emit("offer", offer, roomName);
      }
    });

    socket.on("offer", async (offer: RTCSessionDescriptionInit) => {
      myPeerConnectionRef.current?.addEventListener("datachannel", (event) => {
        myDataChannelRef.current = event.channel;
        myDataChannelRef.current.addEventListener("message", (event) =>
          console.log(event.data),
        );
      });
      console.log("received the offer");
      myPeerConnectionRef.current?.setRemoteDescription(offer);
      const answer = await myPeerConnectionRef.current?.createAnswer();
      myPeerConnectionRef.current?.setLocalDescription(answer);
      socket.emit("answer", answer, roomName);
      console.log("sent the answer");
    });

    socket.on("answer", (answer: RTCSessionDescriptionInit) => {
      console.log("received the answer");
      myPeerConnectionRef.current?.setRemoteDescription(answer);
    });

    socket.on("ice", (ice: RTCIceCandidateInit) => {
      console.log("received candidate");
      myPeerConnectionRef.current?.addIceCandidate(ice);
    });

    return () => {
      socket.off("welcome");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice");
    };
  }, [roomName]);

  return (
    <div>
      {!showCall ? (
        <div id="welcome">
          <form onSubmit={handleWelcomeSubmit}>
            <input
              type="text"
              placeholder="Room Name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
            />
            <button type="submit">Enter Room</button>
          </form>
        </div>
      ) : (
        <div id="call">
          <video
            ref={myFaceRef}
            autoPlay
            playsInline
            width="400"
            height="300"
          />
          <video
            ref={peerFaceRef}
            autoPlay
            playsInline
            width="400"
            height="300"
          />
          <button onClick={handleMuteClick}>{muted ? "Unmute" : "Mute"}</button>
          <button onClick={handleCameraClick}>
            {cameraOff ? "Turn Camera On" : "Turn Camera Off"}
          </button>
          <select value={selectedCamera} onChange={handleCameraChange}>
            {cameras.map((camera) => (
              <option key={camera.deviceId} value={camera.deviceId}>
                {camera.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default WebRTCComponent;
