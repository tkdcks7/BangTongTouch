import React, { useState } from "react";
import VideoChatBtn from "../atoms/VideoChatBtn";

// 아이콘
import {
  AudioFilled,
  AudioMutedOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";

const VideoChatBtnGroup: React.FC = () => {
  const [isMute, setIsMute] = useState<boolean>(false);
  const [isChatOnline, setIsChatOnline] = useState<boolean>(false);
  const [isVideoMute, setIsVideoMute] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const toggleMute = () => {
    setIsMute(!isMute);
  };
  const toggleChatOnline = () => {
    setIsChatOnline(!isChatOnline);
  };
  const toggleVideoMute = () => {
    setIsVideoMute(!isVideoMute);
  };
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="mx-auto flex flex-wrap flex-row justify-center items-center">
      <VideoChatBtn
        icon={!isMute ? AudioFilled : AudioMutedOutlined}
        backgroundColor={!isMute ? "bg-green-400" : "bg-red-500"}
        padding="p-3"
        rounded="rounded-full"
        // className={!isMute ? null : "text-white"}
        onClick={() => toggleMute()}
      />
    </div>
  );
};

export default VideoChatBtnGroup;
