import VideoChatMenuBar from "../organism/VideoChatMenuBar";
import VideoChat from "../atoms/VideoChat";

const VideoChatPage = () => {
  return (
    <>
      <div className="w-screen h-screen bg-black">
        <VideoChat roomId="1" />
        <VideoChatMenuBar />
      </div>
    </>
  );
};

export default VideoChatPage;
