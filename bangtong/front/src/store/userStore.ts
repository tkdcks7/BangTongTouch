import { create } from "zustand";

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

// 유저 정보 및 유저정보 업데이트, 토큰 업데이트 setter 선언
const useUserStore = create<User>((set) => ({
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
}));

export default useUserStore;
