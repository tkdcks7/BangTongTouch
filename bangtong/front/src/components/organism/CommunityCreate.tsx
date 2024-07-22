import React, { useEffect } from "react";
import { Params, useParams } from "react-router-dom";
import { contents } from "../../data";

// 컴포넌트
import DropDown from "../molecules/DropDown";
import IconBtn from "../atoms/IconBtn";
import RollBackBtn from "../atoms/RollBackBtn";

// 이미지 소스
import Clip from "../../assets/Clip.png"

const CommunityCreate: React.FC = () => {
  return (
    <div>
      <div className="mt-10">
        <RollBackBtn />
      </div>
      <form className="rounded-lg">
        <div className="bg-gray-200 flex justify-end p-2 rounded-t-lg">
          <DropDown 
            title="말머리 설정"
            itemList={["공구"]}
            rounded="lg"
            backgroundColor="yellow-300"
          />
        </div>
        <textarea placeholder="게시글 작성" name="message" rows={15} className="block p-2.5 w-full text-gray-900 bg-white border border-gray-300 focus:ring-lime-300 focus:border-lime-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </textarea>
        <div className="flex justify-between items-center bg-gray-200 rounded-b-lg">
          <div className="m-3 ms-5">
            <IconBtn 
              imgSrc={Clip}
              size={25}
            />
          </div>
          <button type="submit" className="bg-lime-400 p-2 px-10 rounded-lg m-3 text-black">작성하기</button>
        </div>
      </form>
    </div>
  )
};

export default CommunityCreate;