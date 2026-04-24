import { DashboardResponse } from "../types/dashboard";
import { ErrorResponse } from "../utils/types";
import { clientRequest, parseErrors } from "./clientRequest";

export async function getDashboard(): Promise<DashboardResponse> {
  const res = await clientRequest(`/api/dashboard`, "GET");
  const data: ErrorResponse | DashboardResponse = await res.json();
  if (!res.ok) parseErrors(data, "Gagal mengambil data dashboard");
  return data as DashboardResponse;
}
