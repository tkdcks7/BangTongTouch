import { isToken } from "typescript";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

// UserDto 를 바탕으로 Interface 생성
interface User {
  id: number;
  email: string | null;
  profileImage: string | null;
  nickname: string;
  token: string | null;
  setInfoUpdate: (data: any) => void;
  setprofileUpdate: (profileImage?: string, nickname?: string) => void;
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
      token: null,
      // 유저 정보 업데이트 setter
      setprofileUpdate: (profileImage?: string, nickname?: string) =>
        set((state) => {
          // profileImage와 nickname이 있을 경우에는 둘 다 수정, 둘 중 하나만 있을 경우에는 하나만 수정
          const newState: any = { ...state };
          if (profileImage) {
            newState.profileImage = profileImage;
          }
          if (nickname) {
            newState.nickname = nickname;
          }
          return { ...newState };
        }),
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
        console.log(token);
        set(() => ({ token }));
      },
      setLogOut: () => {
        set(() => ({
          id: 0,
          email: "",
          profileImage: "",
          nickname: "",
          token: null,
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
