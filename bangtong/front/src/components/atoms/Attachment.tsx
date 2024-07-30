import React from "react";

interface AttachmentProps {
  fileType: string;
  onFileChange: any;
}

const Attachment: React.FC<AttachmentProps> = ({
  fileType,
  onFileChange,
  ...props
}) => {
  const handleFileChange = (e: any) => {
    const selectedFile: any[] = e.target.files[0];
    onFileChange(selectedFile, fileType);
  };

  return (
    <div className="flex items-center justify-between mt-3">
      <p>{fileType + " 등록"}</p>
      <input
        type="file"
        id={"attach-file" + fileType}
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor={"attach-file" + fileType}
        className="bg-lime-500 p-2 px-20 text-white rounded-xl"
      >
        파일 찾기
      </label>
    </div>
  );
};

export default Attachment;
