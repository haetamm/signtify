import { ProfileResponse } from "../types/profile";
import { RoleResponse } from "../types/role";
import { parseErrors } from "./clientRequest";
import { serverRequest } from "./serverRequest";

export async function getProfileServer(): Promise<ProfileResponse | null> {
  const res = await serverRequest("/api/profile", "GET");
  if (res.status === 401) return null;
  const data = await res.json();
  if (!res.ok) parseErrors(data, "Gagal mengambil data profile");
  return data as ProfileResponse;
}

export async function getProfilePermissionsServer(): Promise<RoleResponse | null> {
  const res = await serverRequest("/api/profile/permission", "GET");

  if (res.status === 401) return null;

  const data = await res.json();
  if (!res.ok) parseErrors(data, "Gagal mengambil data role");
  return data as RoleResponse;
}
