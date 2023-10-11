import { create } from "zustand";

interface UserState {
  displayName: string;
}
interface UserAction {
  setDisplayName: (displayName: string) => void;
}

export const useUserStore = create<UserAction & UserState>((set) => ({
  displayName: "",
  setDisplayName: (displayName: string) => set({ displayName }),
}));
