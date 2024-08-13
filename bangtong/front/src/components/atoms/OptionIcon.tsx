import React from "react";

interface OptionProps {
    src: string;
    text: string;
}

const OptionIcon: React.FC<OptionProps> = ({src, text}) => {
    return (
        <div className={`m-2 flex flex-col items-center`}>
            <img src={src} alt={text} width={50}/>
            <p>{text}</p>
        </div>
    );
};

export default OptionIcon;
