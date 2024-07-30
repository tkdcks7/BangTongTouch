import React from "react";
import { Link } from "react-router-dom";
import { Accordion } from "@szhsin/react-accordion";

// 컴포넌트
import AccordionPart from "../molecules/AccordionPart";
import ProfileMyFavItems from "./ProfileMyFavItems";
import ProfileModal from "./ProfileModal";

// 아이콘
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const ProfileMenu: React.FC = () => {
  return (
    <div className="mx-2 my-4 border-t">
      <Accordion transition transitionTimeout={200}>
        <AccordionPart header="내 관심 매물">
          <ProfileMyFavItems />
        </AccordionPart>

        <AccordionPart header="내가 올린 매물">
          <ProfileMyFavItems />
        </AccordionPart>
      </Accordion>
      <ProfileModal />
      <Link
        to={"update"}
        className="flex items-center w-full p-4 text-left hover:bg-slate-100 rounded-xl border border-black mb-2"
      >
        <p>회원 정보 수정</p>
        <ChevronRightIcon className="w-4 h-4 ml-auto" />
      </Link>
      <Link
        to={"notification"}
        className="flex items-center w-full p-4 text-left hover:bg-slate-100 rounded-xl border border-black"
      >
        <p>알림 권한 설정</p>
        <ChevronRightIcon className="w-4 h-4 ml-auto" />
      </Link>
    </div>
  );
};

export default ProfileMenu;
