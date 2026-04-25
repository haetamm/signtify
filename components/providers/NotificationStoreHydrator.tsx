"use client";

import { useNotificationStore } from "@/lib/stores/useNotificationStore";
import { Notification } from "@/lib/types/notification";
import { PaginationResponse } from "@/lib/utils/interface";
import { useEffect } from "react";

interface Props {
  notifications: Notification[];
  pagination: PaginationResponse;
}

export default function NotificationStoreHydrator({
  notifications,
  pagination,
}: Props) {
  useEffect(() => {
    const storeIsEmpty =
      useNotificationStore.getState().notifications.length === 0;
    if (storeIsEmpty) {
      useNotificationStore
        .getState()
        .setNotifications(notifications, pagination);
    }
  }, []);

  return null;
}
