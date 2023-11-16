import { create } from "zustand";

interface UserState {
  displayName: string;
  token: string;
  uid: string;
}
interface UserAction {
  setDisplayName: (displayName: string) => void;
  setToken: (token: string) => void;
  setUid: (uid: string) => void;
}

export const useUserStore = create<UserAction & UserState>((set) => ({
  displayName: "",
  setDisplayName: (displayName: string) => set({ displayName }),
  token: "",
  setToken: (token: string) => set({ token }),
  uid: "",
  setUid: (uid: string) => set({ uid }),
}));
