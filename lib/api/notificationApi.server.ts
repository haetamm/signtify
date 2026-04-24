import { NotificationResponse } from "../types/notification";
import { parseErrors } from "./clientRequest";
import { serverRequest } from "./serverRequest";

export async function getNotificationServer(
  page: string,
  size: string,
): Promise<NotificationResponse | null> {
  const res = await serverRequest(
    `/api/notification?page=${page}&size=${size}`,
    "GET",
  );

  if (res.status === 401) return null;

  const data = await res.json();
  if (!res.ok) parseErrors(data, "Gagal mengambil data dashboard");
  return data as NotificationResponse;
}
