import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "../types/user";
import { PaginationResponse } from "../utils/interface";

interface UserState {
  users: User[];
  pagination: PaginationResponse | null;
}

interface UserActions {
  setUsers: (users: User[], pagination: PaginationResponse) => void;
}

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      users: [],
      pagination: null,

      setUsers: (users, pagination) => {
        set({ users, pagination }, false, "user/setUsers");
      },
    }),
    { name: "UserStore" },
  ),
);
