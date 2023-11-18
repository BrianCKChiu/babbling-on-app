import { create } from "zustand";

interface UserState {}
interface UserAction {}

export const useUserStore = create<UserAction & UserState>((set) => ({}));
