import { create } from "zustand";

// Claude를 통해 생성한 스크립트. 참고용입니다.
interface SignUpInputState {
  name: string;
  residentNumber: string;
  isValidPhone: boolean;
  emailAddress: string;
  pass: string;
  pass2: string;
}

interface SignUpInputActions {
  setName: (name: string) => void;
  setResidentNumber: (residentNumber: string) => void;
  setIsValidPhone: (isValidPhone: boolean) => void;
  setEmailAddress: (emailAddress: string) => void;
  setPass: (pass: string) => void;
  setPass2: (pass2: string) => void;
}

type SignUpInputStore = SignUpInputState & SignUpInputActions;

export const useSignUpInputStore = create<SignUpInputStore>((set) => ({
  name: "",
  residentNumber: "",
  isValidPhone: false,
  emailAddress: "",
  pass: "",
  pass2: "",
  setName: (name: string) => set({ name }),
  setResidentNumber: (residentNumber: string) => set({ residentNumber }),
  setIsValidPhone: (isValidPhone: boolean) => set({ isValidPhone }),
  setEmailAddress: (emailAddress: string) => set({ emailAddress }),
  setPass: (pass: string) => set({ pass }),
  setPass2: (pass2: string) => set({ pass2 }),
}));