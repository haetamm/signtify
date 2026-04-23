import {
  getNotification,
  markNotificationAsRead,
} from "../api/notificationApi";
import { useNotificationStore } from "../stores/useNotificationStore";

export async function fetchNotifications(page: string, size: string) {
  const response = await getNotification(page, size);
  useNotificationStore
    .getState()
    .setNotifications(response.data, response.paginationResponse);
  return response;
}

export async function markAsRead(id: string) {
  const response = await markNotificationAsRead(id);
  useNotificationStore.getState().markAsRead(id);
  return response;
}
