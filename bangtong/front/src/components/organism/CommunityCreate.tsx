import React, { useEffect, useRef, useState } from "react";
import { Params, redirect, useNavigate, useParams } from "react-router-dom";
import { contents } from "../../data";

// 컴포넌트
import DropDown from "../molecules/DropDown";
import IconBtn from "../atoms/IconBtn";
import RollBackBtn from "../atoms/RollBackBtn";

// 이미지 소스
import Clip from "../../assets/Clip.png";
import TextEditor from "../molecules/TextEditor";
import axios, { HttpStatusCode } from "axios";
import { getCookie } from "../../utils/cookie";
import { getUserAddressKr } from "../../utils/services";
import authAxios from "../../utils/authAxios";

const CommunityCreate: React.FC = () => {
  const [textEditorValue, setTextEditorValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const navigate = useNavigate();

  const redirectToBoards = () => {
    navigate("../");
  };

  useEffect(() => {
    const getAddress = async () => {
      const temp: any = await getUserAddressKr();
      console.log(temp);
    };
    getAddress();
  }, []);

  return (
    <div>
      <div className="mt-10">
        <RollBackBtn />
      </div>
      <form className="rounded-lg">
        <div className="bg-lime-500 flex justify-between p-2 rounded-t-lg">
          <input
            className="bg-transparent w-full focus:outline-none text-white placeholder:text-white"
            type="text"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            placeholder="제목을 입력해주세요."
          />
          <DropDown
            title="말머리 설정"
            itemList={["공구"]}
            rounded="lg"
            backgroundColor="yellow-color"
          />
        </div>
        <TextEditor data={textEditorValue} onChange={setTextEditorValue} />
        <div className="flex justify-end items-center bg-gray-200 rounded-b-lg">
          <button
            type="submit"
            className="bg-lime-400 p-2 px-10 rounded-lg m-3 text-black"
            onClick={(e) => {
              e.preventDefault();
              if (titleValue === "") {
                alert("제목을 입력해주세요.");
                return;
              }
              if (textEditorValue === "") {
                alert("내용을 입력해주세요.");
                return;
              }
              alert("글이 등록되었습니다.");
              const data = new FormData();
              data.append("boardTitle", titleValue);
              data.append("boardContent", textEditorValue);
              data.append("boardWriter", "1");

              authAxios({
                method: "POST",
                headers: {
                  "Content-Type": "application/json; charset=UTF-8",
                },
                url: `${process.env.REACT_APP_BACKEND_URL}/boards/write`,
                data: {
                  boardTitle: titleValue,
                  boardContent: textEditorValue,
                  boardWriter: 1,
                },
              })
                .then((response) => {
                  if (response.status === HttpStatusCode.Ok) redirectToBoards();
                  else alert("오류가 발생하였습니다.");
                })
                .catch((error) => console.log("전송 실패", error));
            }}
          >
            작성하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommunityCreate;
