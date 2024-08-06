import { create } from "zustand";

interface DarkModeStore {
  isDarkMode: boolean;
}

export const darkModeStore = create<DarkModeStore>((dark) => ({
  isDarkMode : false

    // function
}));
