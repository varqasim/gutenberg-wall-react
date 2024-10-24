import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  authToken: string;
}

interface UserStoreState {
  user?: User;
  setUser(user: User | undefined): void;
}

export const useUserStore = create<UserStoreState>()((set) => ({
  user: undefined,
  setUser: (user: User | undefined) => set(() => ({ user: user })),
}))