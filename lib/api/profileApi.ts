import {
  ChangePassPayload,
  ProfilePayload,
  ProfileResponse,
} from "../types/profile";
import { GeneralResponse } from "../utils/interface";
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
): Promise<GeneralResponse> {
  const res = await clientRequest("/api/profile/credential", "POST", payload);
  const data: ErrorResponse | GeneralResponse = await res.json();
  if (!res.ok) parseErrors(data, "Gagal mengupdate password");
  return data as GeneralResponse;
}

export async function getAvatar(profileId: string): Promise<string> {
  const res = await clientRequest(
    `/api/profile/${profileId}/avatar?t=${Date.now()}`, // cache busting
    "GET",
  );

  if (!res.ok) {
    const data: ErrorResponse = await res.json();
    parseErrors(data, "Gagal mengambil avatar");
  }

  const blob = await res.blob();
  return URL.createObjectURL(blob);
}

export async function uploadAvatar(formData: FormData): Promise<string> {
  const res = await clientRequest("/api/profile/avatar", "POST", formData);
  const data: ErrorResponse | GeneralResponse = await res.json();

  if (!res.ok) {
    const data: ErrorResponse = await res.json();
    parseErrors(data, "Gagal mengupload avatar");
  }
  return (data as GeneralResponse).status;
}
