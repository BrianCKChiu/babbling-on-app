import { create } from "zustand";
import { getLevelExp } from "../user/level";
import { Toast } from "native-base";

interface UserState {
  displayName: string;
  token: string;
  level: number;
  currentExp: number;
}
interface UserAction {
  setDisplayName: (displayName: string) => void;
  setToken: (token: string) => void;
  addExp: (exp: number) => void;
  setUserExp: (level: number, currentExp: number) => void;
}

export const useUserStore = create<UserAction & UserState>((set) => ({
  displayName: "",
  setDisplayName: (displayName: string) => set({ displayName }),
  token: "",
  setToken: (token: string) => set({ token }),

  level: 1,
  currentExp: 0,
  levelExp: 100,
  setUserExp: (level: number, currentExp: number) => set({ level, currentExp }),
  addExp: (exp: number) => {
    set((state) => {
      const currentExp = state.currentExp + exp;
      const currentLevelExp = getLevelExp(state.level);
      // handles user leveling up
      if (currentExp >= currentLevelExp) {
        Toast.show({
          description: `You leveled up to level ${state.level + 1}!`,
          variant: "success",
          duration: 3000,
        });
        const level = state.level + 1;
        const extraExp = currentExp - currentLevelExp;

        return { level, currentExp: extraExp };
      }
      return { currentExp };
    });
  },
}));
