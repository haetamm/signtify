import { DashboardResponse } from "../types/dashboard";
import { apiRequest, parseErrors } from "../utils/helper";
import { ErrorResponse } from "../utils/types";

export async function getDashboard(): Promise<DashboardResponse> {
  const res = await apiRequest(`/api/dashboard`, "GET");
  const data: ErrorResponse | DashboardResponse = await res.json();
  if (!res.ok) parseErrors(data, "Gagal mengambil data dashboard");
  return data as DashboardResponse;
}
