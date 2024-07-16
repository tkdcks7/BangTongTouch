import React from 'react';

const TextBox: React.FC = () => {
  return (
    <div className="p-2">
      <input 
        type="text" 
        className="border border-black p-2 outline-none focus:border-green-600"
      />
    </div>
  );
}

export default TextBox;
