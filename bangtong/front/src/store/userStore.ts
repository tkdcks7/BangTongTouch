import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import axios from "axios";

// UserDto 를 바탕으로 Interface 생성
interface User {
  id: number;
  email: string;
  profileImage: string | null;
  name: string;
  nickname: string;
  birthYear: string;
  phone: string;
  registerDate: string;
  gender: number;
  token: string;
  setInfoUpdate: (data: any) => void;
  setToken: (token: string) => void;
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

const userPersistOptions: PersistOptions<User> = {
  name: "user-storage",
  getStorage: () => localStorage,
};

// 유저 정보 및 유저정보 업데이트, 토큰 업데이트 setter 선언
const useUserStore = create<User>()(
  persist(
    (set) => ({
      id: 0,
      email: "",
      profileImage: null,
      name: "",
      nickname: "",
      birthYear: "",
      phone: "",
      registerDate: "",
      gender: 0,
      token: "",
      // 유저 정보 업데이트 setter
      setInfoUpdate: ({
        id,
        email,
        profileImage,
        name,
        nickname,
        birthYear,
        phone,
        registerDate,
        gender,
      }) => {
        set(() => ({
          id,
          email,
          profileImage,
          name,
          nickname,
          birthYear,
          phone,
          registerDate,
          gender,
        }));
      },
      // 토큰 업데이트 setter
      setToken: (token) => {
        set(() => ({ token }));
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
