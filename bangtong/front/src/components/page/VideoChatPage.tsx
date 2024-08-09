import VideoChatMenuBar from "../organism/VideoChatMenuBar";
import VideoChat from "../atoms/VideoChat";

const VideoChatPage: React.FC = () => {
  return (
    <>
      <div className="w-screen h-screen">
        <VideoChat />
        <VideoChatMenuBar />
      </div>
    </>
  );
};

export default VideoChatPage;
