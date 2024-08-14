import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 이미지 소스
import defaultprofile from "../../assets/defaultprofile.jpg";

interface ImageWithFallbackProps {
  src: string | null;
  profileId: number;
}

const ProfileImgBox: React.FC<ImageWithFallbackProps> = ({
  src,
  profileId,
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleError = () => {
    setIsLoaded(false);
  };

  return (
    <React.Fragment>
      <img
        src={src ? src : defaultprofile}
        alt="프로필 이미지"
        width={100}
        height={100}
        onError={handleError}
        className="rounded-full me-10"
        style={{ display: isLoaded ? "block" : "none" }}
        onClick={() => navigate(`/profile/${profileId}`)}
      />
      {!isLoaded && (
        <img
          src={defaultprofile}
          alt="기본 프로필 이미지"
          width={100}
          height={100}
          className="rounded-full me-10"
        />
      )}
    </React.Fragment>
  );
};

export default ProfileImgBox;
