import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

// UserDto 를 바탕으로 Interface 생성
interface User {
  id: number;
  email: string | null;
  profileImage: string | null;
  nickname: string;
  token: string;
  setInfoUpdate: (data: any) => void;
  setToken: (token: string) => void;
  setLogOut: () => void;
}

// 알람 설정 interface
interface UserAlarmSetting {
  alarmPhoneChat: boolean;
  alarmPhoneComplete: boolean;
  alarmPhoneInterest: boolean;
  alarmEmailChat: boolean;
  alarmEmailInterest: boolean;
  alarmEmailComplete: boolean;
  setAlarmToggle: (
    alarm: keyof Omit<UserAlarmSetting, "setTotalAlarm" | "setAlarmToggle">
  ) => void;
}

// persist 사용 시 name과 저장 위치 설정
const userPersistOptions = {
  name: "user-storage",
  getStorage: () => localStorage,
};

// 유저 정보 및 유저정보 업데이트, 토큰 업데이트 setter 선언
// persist를 사용해 localStorage에 저장
const useUserStore = create<User>()(
  persist(
    (set) => ({
      id: 0,
      email: "",
      profileImage: "",
      nickname: "",
      token: "",
      // 유저 정보 업데이트 setter
      setInfoUpdate: ({ id, email, profileImage, nickname }) => {
        set(() => ({
          id,
          email,
          profileImage,
          nickname,
        }));
      },
      // 토큰 업데이트 setter
      setToken: (token) => {
        set(() => ({ token }));
      },
      setLogOut: () => {
        set(() => ({
          id: 0,
          email: "",
          profileImage: "",
          nickname: "",
          token: "",
        }));
      },
    }),
    userPersistOptions
  )
);

// 유저 알람 설정 store
export const useAlarmStore = create<UserAlarmSetting>()((set) => ({
  alarmPhoneChat: false,
  alarmPhoneComplete: false,
  alarmPhoneInterest: false,
  alarmEmailChat: false,
  alarmEmailInterest: false,
  alarmEmailComplete: false,
  setAlarmToggle: (alarm: keyof UserAlarmSetting) => {
    set((state) => ({
      ...state,
      [alarm]: !state[alarm],
    }));
  },
}));

export default useUserStore;
