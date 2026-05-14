"use client";

import { useRoleStore } from "@/lib/stores/useRoleStore";
import { Role } from "@/lib/types/role";
import { PaginationResponse } from "@/lib/utils/interface";
import { useEffect } from "react";

interface Props {
  roles: Role[];
  pagination: PaginationResponse;
}

export default function RoleStoreHydrator({ roles, pagination }: Props) {
  useEffect(() => {
    if (useRoleStore.getState().roles.length === 0) {
      useRoleStore.getState().setRoles(roles, pagination);
    }
  }, []);

  return null;
}
