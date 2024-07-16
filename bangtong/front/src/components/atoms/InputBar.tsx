import React, { InputHTMLAttributes } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  helperText?: string;
  error?: boolean;
  size?: "small" | "medium" | "large";
}

const InputBar: React.FC<InputProps> = ({
  size = "medium",
  id,
  type,
  ...props
}) => {
  const sizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  const inputClasses = `
    ${sizeClasses[size]}
${id === "" ? "text-black" : id === "e" ? "text-text-red-500" : "text-black bg-white"}
    focus:outline-none
    pr-1
  `;

  const inputStyle: React.CSSProperties = {};
  inputStyle.width = "95%";
  inputStyle.height = "90%;";

  return (
    <input style={inputStyle} className={inputClasses} {...props} type={type} />
  );
};

export default InputBar;
