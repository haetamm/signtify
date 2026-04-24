import {
  AuthResponse,
  ForgotPassPayload,
  ForgotPassResponse,
  LoginPayload,
  LogoutResponse,
  ResetPassPayload,
  ResetPassResponse,
} from "../types/auth";
import { ErrorResponse } from "../utils/types";
import { clientRequest, parseErrors } from "./clientRequest";

export async function loginUser(payload: LoginPayload) {
  const res = await clientRequest("/api/auth/login", "POST", payload);
  const data: ErrorResponse | AuthResponse = await res.json();
  if (!res.ok) parseErrors(data, "Login gagal, coba lagi");
  return (data as AuthResponse).data;
}

export async function forgotPassword(
  payload: ForgotPassPayload,
): Promise<string> {
  const res = await clientRequest("/api/auth/forgot-password", "POST", payload);
  const data: ErrorResponse | ForgotPassResponse = await res.json();
  if (!res.ok) parseErrors(data, "Login gagal, coba lagi");
  return (data as ForgotPassResponse).data;
}

export async function refreshAccessToken(refreshToken: string) {
  const res = await clientRequest("/api/auth/refresh", "POST", {
    refreshToken,
  });
  const data: AuthResponse | ErrorResponse = await res.json();
  if (!res.ok) parseErrors(data, "Session Expired, silahkan login lagi");
  return (data as AuthResponse).data;
}

export async function resetPassword(
  token: string,
  payload: ResetPassPayload,
): Promise<string> {
  const res = await clientRequest(
    `/api/auth/reset-password?token=${token}`,
    "POST",
    payload,
  );
  const data: ErrorResponse | ResetPassResponse = await res.json();
  if (!res.ok) parseErrors(data, "Reset password gagal, coba lagi");
  return (data as ResetPassResponse).data;
}

export async function logoutUser(): Promise<string> {
  const res = await clientRequest(`/api/auth/logout`, "POST");
  const data: ErrorResponse | LogoutResponse = await res.json();
  if (!res.ok) parseErrors(data, "Logout gagal, coba lagi");
  return (data as LogoutResponse).data;
}
