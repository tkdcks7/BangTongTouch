import React, { useState } from "react";
import VideoChat from "../atoms/VideoChat";

const VideoChatPage: React.FC = (props) => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [joinRoomId, setJoinRoomId] = useState<string>("");

  const handleStartLive = () => {
    const newRoomId = Math.random().toString(36).substring(7);
    setRoomId(newRoomId);
  };

  const handleJoinRoom = () => {
    if (joinRoomId) {
      setRoomId(joinRoomId);
    }
  };

  return (
    <div>
      <h1>Text Chat Room</h1>
      {/* Your existing text chat component */}

      <input
        type="text"
        placeholder="Enter your user ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      {!roomId && (
        <>
          <button onClick={handleStartLive}>Start Live</button>
          <div>
            <input
              type="text"
              placeholder="Enter room ID to join"
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
            />
            <button onClick={handleJoinRoom}>Join Room</button>
          </div>
        </>
      )}

      {roomId && userId && <VideoChat roomId={roomId} userId={userId} />}
    </div>
  );
};

export default VideoChatPage;
