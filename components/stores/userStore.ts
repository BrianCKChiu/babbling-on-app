import { create } from "zustand";

interface UserState {
  displayName: string;
  token: string;
}
interface UserAction {
  setDisplayName: (displayName: string) => void;
  setToken: (token: string) => void;
}

export const useUserStore = create<UserAction & UserState>((set) => ({
  displayName: "",
  setDisplayName: (displayName: string) => set({ displayName }),
  token: "",
  setToken: (token: string) => set({ token }),
}));
