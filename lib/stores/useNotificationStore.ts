import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Notification } from "../types/notification";
import { PaginationResponse } from "../utils/interface";

type FilterOption = "all" | "unread" | "read";

interface NotificationState {
  notifications: Notification[];
  pagination: PaginationResponse | null;
  filter: FilterOption;
}

interface NotificationActions {
  setNotifications: (
    notifications: Notification[],
    pagination: PaginationResponse,
  ) => void;
  setFilter: (filter: FilterOption) => void;
  markAsRead: (id: string) => void;
  addNotification: (notification: Notification) => void;
}

type NotificationStore = NotificationState & NotificationActions;

export const useNotificationStore = create<NotificationStore>()(
  devtools(
    (set) => ({
      notifications: [],
      pagination: null,
      filter: "all",

      setNotifications: (notifications, pagination) => {
        set(
          { notifications, pagination },
          false,
          "notification/setNotifications",
        );
      },

      setFilter: (filter) => {
        set({ filter }, false, "notification/setFilter");
      },

      markAsRead: (id) => {
        set(
          (state) => ({
            notifications: state.notifications.map((n) =>
              n.id === id ? { ...n, isRead: true } : n,
            ),
          }),
          false,
          "notification/markAsRead",
        );
      },

      addNotification: (notification: Notification) => {
        set(
          (state) => ({
            notifications: [notification, ...state.notifications],
            pagination: state.pagination
              ? {
                  ...state.pagination,
                  totalElements: state.pagination.totalElements + 1,
                }
              : null,
          }),
          false,
          "notification/addNotification",
        );
      },
    }),
    { name: "NotificationStore" },
  ),
);
