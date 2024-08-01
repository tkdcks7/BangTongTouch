import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// 컴포넌트
import MultiBtn from "../molecules/MultiBtn";
import ContentTable from "../molecules/ContentTable";
import InputBox from "../molecules/InputBox";
import IconBtn from "../atoms/IconBtn";
import { Pagination, ConfigProvider } from "antd";
import Loading from "../atoms/Loading";

// 이미지 소스
import Pencil from "../../assets/Pencil.png";

interface BoardWriter {
  userBirthYear: number;
  userEmail: string;
  userGender: number;
  userId: number;
  userIsAdmin: boolean;
  userIsBanned: boolean;
  userIsDeleted: boolean;
  userNickname: string;
  userPhone: string;
  userProvider: string;
  userRegisterDate: string;
}

interface Content {
  boardId: number;
  boardTitle: string;
  boardWriter: BoardWriter;
  boardDate: string;
}

const CommunityMain: React.FC = () => {
  // 데이터 (받아온 게시글들)
  const [page, setPage] = useState<number>(1);
  const [contents, setContents] = useState<Content[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // pagination 글로벌 디자인 토큰
  const theme = {
    token: {
      colorBgTextHover: "#E9FFE7",
      colorPrimary: "#129B07",
    },
  };

  const loadData = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/boards/list`,
      data: {
        pageNo: `${page - 1}`,
        size: "10",
      },
    })
      .then((response) => {
        setContents(response.data.content);
        setIsLoaded(true);
        console.log(response.data.content);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <>
      {isLoaded ? (
        <div className="flex flex-col items-center justify-center">
          <h2 className="my-5 text-4xl font-bold text-lime-500 hidden md:block text-nowrap">
            <button className="text-yellow-400">구미시</button> 신통방통
          </h2>
          <div className="w-full md:w-4/5">
            <InputBox
              placeholder="게시글 검색"
              buttonType="search"
              width="100%"
              height="100%"
            />
          </div>
          <div className="my-5 md:w-full">
            <MultiBtn />
          </div>
          {isLoaded && <ContentTable contents={contents} />}
          <div className="w-full p-2 mt-5 flex justify-end">
            <Link
              className="bg-yellow-300 p-3 rounded-xl shadow-lg"
              to={"write"}
            >
              <IconBtn imgSrc={Pencil} size={30} />
            </Link>
          </div>
          <ConfigProvider theme={theme}>
            <Pagination
              current={page}
              total={50}
              className="mt-10"
              responsive
              onChange={(pageNumber) => {
                setPage(pageNumber);
              }}
            />
          </ConfigProvider>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </>
  );
};

export default CommunityMain;
