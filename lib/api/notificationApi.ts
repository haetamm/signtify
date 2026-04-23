import { NotificationResponse } from "../types/notification";
import { apiRequest, parseErrors } from "../utils/helper";
import { ErrorResponse } from "../utils/types";

export async function getNotification(
  page: string,
  size: string,
): Promise<NotificationResponse> {
  const res = await apiRequest(
    `/api/notification?page=${page}&size=${size}`,
    "GET",
  );
  const data: ErrorResponse | NotificationResponse = await res.json();
  if (!res.ok) parseErrors(data, "Gagal mengambil data notification");
  return data as NotificationResponse;
}

export async function markNotificationAsRead(
  id: string,
): Promise<NotificationResponse> {
  const res = await apiRequest(`/api/notification/${id}/read`, "PATCH");
  const data: ErrorResponse | NotificationResponse = await res.json();
  if (!res.ok) parseErrors(data, "Gagal menandai notifikasi sebagai dibaca");
  return data as NotificationResponse;
}
