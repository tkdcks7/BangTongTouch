import React, { useState } from 'react';

interface RadioBtnProps {
  location: string;
}

const RadioBtn: React.FC<RadioBtnProps> = ({location}) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`p-2 rounded-full ${selected ? 'bg-yellow-300' : 'bg-gray-200 text-black'}`}
      >
        {location}
      </button>
    </div>
  );
}

export default RadioBtn;
