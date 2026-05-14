"use client";

import { useUserStore } from "@/lib/stores/useUserStore";
import { User } from "@/lib/types/user";
import { PaginationResponse } from "@/lib/utils/interface";
import { useEffect } from "react";

interface Props {
  users: User[];
  pagination: PaginationResponse;
}

export default function UserStoreHydrator({ users, pagination }: Props) {
  useEffect(() => {
    if (useUserStore.getState().users.length === 0) {
      useUserStore.getState().setUsers(users, pagination);
    }
  }, []);

  return null;
}
