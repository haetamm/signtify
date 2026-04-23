import { NotificationResponse } from "../types/notification";
import { parseErrors } from "../utils/helper";
import { serverRequest } from "./serverRequest";

export async function getNotificationServer(
  page: string,
  size: string,
): Promise<NotificationResponse> {
  const res = await serverRequest(
    `/api/notification?page=${page}&size=${size}`,
    "GET",
  );
  const data = await res.json();
  if (!res.ok) parseErrors(data, "Gagal mengambil data dashboard");
  return data as NotificationResponse;
}
