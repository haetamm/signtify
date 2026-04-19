import { DashboardResponse } from "../types/dashboard";
import { parseErrors } from "../utils/helper";
import { serverRequest } from "./serverRequest";

export async function getDashboardServer(): Promise<DashboardResponse> {
  const res = await serverRequest("/api/dashboard", "GET");
  const data = await res.json();
  if (!res.ok) parseErrors(data, "Gagal mengambil data dashboard");
  return data as DashboardResponse;
}
