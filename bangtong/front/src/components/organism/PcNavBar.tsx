import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import authAxios from "../../utils/authAxios";

// 컴포넌트 불러오기
import { Dropdown, FloatButton } from "antd";
import Btn from "../atoms/Btn";
import IconBtn from "../atoms/IconBtn";

// 이미지 소스
import Bell from "../../assets/Bell.png";
import Logo from "../../assets/GreenLogo.png";

// Store
import useAlarmInfoStore from "../../store/alarmInfoStore";
import useUserStore from "../../store/userStore";
import { BellOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";

interface PcNavBarProps {
  dark: boolean;
  toggleDark: () => void;
}

const PcNavBar: React.FC<PcNavBarProps> = ({ dark, toggleDark }) => {
  const { token, id, setLogOut } = useUserStore();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const alarms = useAlarmInfoStore().alarms;
  const alarmItems = useRef<Array<any>>();

  // signup 페이지로 이동하는 함수
  const handleSignUpBtnClick = (e: any) => {
    navigate("/user/register");
  };

  // login 페이지로 이동하는 함수
  const handleLogInBtnClick = (e: any) => {
    navigate("/user/login");
  };

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
  }, [token, alarms]);

  return (
      <>
        <header className={`flex justify-between items-center w-full p-5 mb-10 ${!dark ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
          <Link to="/" className="text-start">
            <img src={Logo} alt="로고" className="w-40"/>
          </Link>
          <div className="flex items-center justify-between">
            <NavLink
                className={({ isActive }) =>
                    `text-lg mx-3 text-nowrap ${isActive ? 'text-black' : 'text-gray-400'} ${dark ? 'dark:text-white' : ''}`
                }
                to="/products"
            >
              방통터치
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    `text-lg mx-3 text-nowrap ${isActive ? 'text-black' : 'text-gray-400'} ${dark ? 'dark:text-white' : ''}`
                }
                to="/chats"
            >
              채팅
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    `text-lg mx-3 text-nowrap ${isActive ? 'text-black' : 'text-gray-400'} ${dark ? 'dark:text-white' : ''}`
                }
                to={`/profile/${id}`}
            >
              마이방통
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    `text-lg mx-3 text-nowrap ${isActive ? 'text-black' : 'text-gray-400'} ${dark ? 'dark:text-white' : ''}`
                }
                to="/boards"
            >
              신통방톡
            </NavLink>

            <div className="flex items-center justify-center mx-3 w-10 h-10">
              {token ? (
                  <Dropdown trigger={["click"]} menu={{ items: alarmItems.current }}>
                    <BellOutlined className="text-xl" />
                  </Dropdown>
               ) :
                  <BellOutlined className="text-xl" onClick={() => {
                      alert("로그인 후 이용해 주세요.")
                      navigate("/user/login");
                  }}/>
              }
              {token ? useAlarmInfoStore.getState().alarmNum : null}
            </div>

            {/* 로그인 되면 로그아웃 버튼이 뜨도록 */}
            <div className="mx-1">
              {token ? (
                  <Btn
                      text="로그아웃"
                      backgroundColor="bg-red-400"
                      onClick={handleLogOutBtnClick}
                  />
              ) : (
                  <>
                    <div className="flex">
                      <div className="me-3">
                        <Btn
                            text="로그인"
                            backgroundColor="bg-lime-500"
                            onClick={handleLogInBtnClick}
                        />
                      </div>
                      <div>
                        <Btn
                            text="회원가입"
                            backgroundColor="bg-yellow-300"
                            onClick={handleSignUpBtnClick}
                        />
                      </div>
                    </div>
                  </>
              )}
            </div>
          </div>
        </header>

        <FloatButton
            icon={!dark ? <MoonOutlined /> : <SunOutlined />}
            onClick={toggleDark}
            tooltip={<div>{dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</div>}
            // className={'dark:bg-yellow-300'}
        />
      </>
  );
};

export default PcNavBar;
