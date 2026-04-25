import {
  ChangePassPayload,
  ChangePassResponse,
  ProfilePayload,
  ProfileResponse,
} from "../types/profile";
import { ErrorResponse } from "../utils/types";
import { clientRequest, parseErrors } from "./clientRequest";

export async function getProfile(): Promise<ProfileResponse> {
  const res = await clientRequest("/api/profile", "GET");
  const data: ErrorResponse | ProfileResponse = await res.json();
  if (!res.ok) parseErrors(data, "Gagal mengambil data profile");
  return data as ProfileResponse;
}

export async function updateProfile(
  payload: ProfilePayload,
): Promise<ProfileResponse> {
  const res = await clientRequest("/api/profile/edit", "PUT", payload);
  const data: ErrorResponse | ProfileResponse = await res.json();
  if (!res.ok) parseErrors(data, "Gagal mengupdate data profile");
  return data as ProfileResponse;
}

export async function changePassword(
  payload: ChangePassPayload,
): Promise<ChangePassResponse> {
  const res = await clientRequest("/api/profile/credential", "POST", payload);
  const data: ErrorResponse | ChangePassResponse = await res.json();
  if (!res.ok) parseErrors(data, "Gagal mengupdate password");
  return data as ChangePassResponse;
}
