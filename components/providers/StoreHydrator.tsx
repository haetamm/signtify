"use client";

import { useNotificationStore } from "@/lib/stores/useNotificationStore";
import { useRoleStore } from "@/lib/stores/useRoleStore";
import { Notification } from "@/lib/types/notification";
import { Permissions } from "@/lib/types/role";
import { PaginationResponse } from "@/lib/utils/interface";
import { useEffect } from "react";

interface Props {
  notifications: Notification[];
  pagination: PaginationResponse;
  role: { roleId: string; roleName: string; permissions: Permissions[] } | null;
}

export default function StoreHydrator({
  notifications,
  pagination,
  role,
}: Props) {
  useEffect(() => {
    if (useNotificationStore.getState().notifications.length === 0) {
      useNotificationStore
        .getState()
        .setNotifications(notifications, pagination);
    }
    if (useRoleStore.getState().roleId === null && role) {
      useRoleStore
        .getState()
        .setRole(role.roleId, role.roleName, role.permissions);
    }
  }, []);

  return null;
}
