import React from "react";

interface AttachmentProps {
  text: string;
}

const Attachment: React.FC<AttachmentProps> = ({ text, ...props }) => {
  return (
    <div className="flex items-center justify-between mt-3">
      <p>{text}</p>
      <input type="file" id="attach-file" className="hidden" />
      <label htmlFor="attach-file" className="bg-lime-500 p-2 px-20 text-white rounded-xl">
          파일 찾기
      </label>
    </div>
  )
}

export default Attachment;