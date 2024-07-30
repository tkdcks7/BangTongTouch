import React from "react";
import { useState } from "react";
 
// 컴포넌트
import TabBtn from "../atoms/TabBtn";

const MultiBtn: React.FC = () => {

  const [selectedTopic, setSelectedTopic] = useState('전체 게시글');

  function handleSelect(selectedButton: string) {
    setSelectedTopic(selectedButton)
  }

  return (
    <div className="w-full flex justify-center items-center bg-yellow-300 text-nowrap">
      <menu>
        <TabBtn 
          isSelected={selectedTopic === '전체 게시글'}
          onSelect={() => handleSelect('전체 게시글')}
        >
          전체 게시글
        </TabBtn>
        <TabBtn
          isSelected={selectedTopic === '내 지역 게시글'}
          onSelect={() => handleSelect('내 지역 게시글')}
        >
          내 지역 게시글
        </TabBtn>
        <TabBtn
          isSelected={selectedTopic === '말머리'}
          onSelect={() => handleSelect('말머리')}
        >
          말머리
        </TabBtn>
      </menu>
    </div>
  )
};

export default MultiBtn;