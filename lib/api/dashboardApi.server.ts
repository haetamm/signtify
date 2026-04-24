import { DashboardResponse } from "../types/dashboard";
import { parseErrors } from "./clientRequest";
import { serverRequest } from "./serverRequest";

export async function getDashboardServer(): Promise<DashboardResponse | null> {
  const res = await serverRequest("/api/dashboard", "GET");

  if (res.status === 401) return null;

  const data = await res.json();
  if (!res.ok) parseErrors(data, "Gagal mengambil data dashboard");
  return data as DashboardResponse;
}
