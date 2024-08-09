import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import authAxios from "../../utils/authAxios";

// 컴포넌트 불러오기
import IconBtn from "../atoms/IconBtn";
import { Button, Dropdown, MenuProps, FloatButton } from "antd";

// 이미지 소스
import Bell from "../../assets/Bell.png";
import {MenuOutlined, MoonOutlined, SunOutlined} from "@ant-design/icons";

// 데이터
import useUserStore from "../../store/userStore";
import useAlarmInfoStore from "../../store/alarmInfoStore";

interface MMenuBarProps {
  dark: boolean;
  toggleDark: () => void;
}

const MMenuBar: React.FC<MMenuBarProps> = ({dark, toggleDark}) => {
  const navigate = useNavigate();
  const { alarms, alarmNum } = useAlarmInfoStore();
  const { token, id, setLogOut } = useUserStore();
  const alarmItems = useRef<Array<any>>();

  // logout 실행 함수
  const handleLogOutBtnClick = (e: any) => {
    authAxios({
      method: "PUT",
      url: `${process.env.REACT_APP_BACKEND_URL}/users/logout`,
    })
      .then((response) => {
        setLogOut(); // userInfo와 token을 초기화
        navigate("/user/login");
      })
      .catch((err) => console.log(err));
  };

  // signup 페이지로 이동하는 함수
  const handleSignUpBtnClick = (e: any) => {
    navigate("/user/register");
  };

  // login 페이지로 이동하는 함수
  const handleLogInBtnClick = (e: any) => {
    navigate("/user/login");
  };

  const items: MenuProps["items"] = id
    ? [
        {
          label: "로그아웃",
          key: "1",
          onClick: handleLogOutBtnClick,
        },
      ]
    : [
        {
          label: "로그인",
          key: "1",
          onClick: handleLogInBtnClick,
        },
        {
          label: "회원가입",
          key: "2",
          onClick: handleSignUpBtnClick,
        },
      ];

  const menuProps = {
    items,
  };

  useEffect(() => {
    if (token) {
      alarmItems.current = alarms?.map((item, index) => {
        return {
          label: (
            <div>
              <div>{item.alarmMessageDate}</div>
              <div>{item.alarmMessage}</div>
            </div>
          ),
          key: index,
        };
      });
    }
  }, []);

  return (
    <>
    <div className="flex justify-end items-center w-screen p-2">
      <div>
        {token ? (
          <Dropdown trigger={["click"]} menu={{ items: alarmItems.current }}>
            <IconBtn imgSrc={Bell} size={30} />
          </Dropdown>
        ) : (
          <IconBtn
            imgSrc={Bell}
            size={30}
            onClick={() => {
              alert("로그인 후 이용해 주세요.");
              navigate("/user/login");
            }}
          />
        )}
      </div>
      <div className="mx-3">
        <Dropdown menu={menuProps} trigger={["click"]}>
          <Button type="text" size="small">
            <MenuOutlined className="text-2xl" />
          </Button>
        </Dropdown>
      </div>
    </div>
      <FloatButton
          icon={!dark ? <SunOutlined/> : <MoonOutlined/>}
          onClick={toggleDark}
          tooltip={<div>{dark ? 'Switch to Dark Mode' : 'Switch to Light Mode'}</div>}
          className={'bg-yellow-300'}
      />
    </>
  );
};

export default MMenuBar;
