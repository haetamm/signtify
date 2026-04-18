import {
  AuthResponse,
  ForgotPassPayload,
  ForgotPassResponse,
  LoginPayload,
  ResetPassPayload,
  ResetPassResponse,
} from "../types/auth";
import { ErrorResponse } from "../utils/types";

type FieldErrors = Record<string, string>;

function postJSON(url: string, body: unknown): Promise<Response> {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
}

function parseErrors(data: ErrorResponse | unknown, fallback: string): never {
  const errors: FieldErrors = {};

  if (data && typeof data === "object" && "messages" in data) {
    const { messages } = data as ErrorResponse;
    if (Array.isArray(messages)) {
      messages.forEach((err) => (errors[err.path] = err.message));
    } else if (typeof messages === "string") {
      errors.general = messages;
    }
  }

  if (Object.keys(errors).length === 0) {
    errors.general = fallback;
  }

  throw errors;
}

export async function loginUser(payload: LoginPayload) {
  const res = await postJSON("/api/auth/login", payload);
  const data: ErrorResponse | AuthResponse = await res.json();
  if (!res.ok) parseErrors(data, "Login gagal, coba lagi");
  return (data as AuthResponse).data;
}

export async function forgotPassword(
  payload: ForgotPassPayload,
): Promise<string> {
  const res = await postJSON("/api/auth/forgot-password", payload);
  const data: ErrorResponse | ForgotPassResponse = await res.json();
  if (!res.ok) parseErrors(data, "Login gagal, coba lagi");
  return (data as ForgotPassResponse).data;
}

export async function refreshAccessToken(refreshToken: string) {
  const res = await postJSON("/api/auth/refresh", { refreshToken });
  const data: AuthResponse | ErrorResponse = await res.json();
  if (!res.ok) parseErrors(data, "Session Expired, silahkan login lagi");
  return (data as AuthResponse).data;
}

export async function resetPassword(
  token: string,
  payload: ResetPassPayload,
): Promise<string> {
  const res = await postJSON(
    `/api/auth/reset-password?token=${token}`,
    payload,
  );
  const data: ErrorResponse | ResetPassResponse = await res.json();
  if (!res.ok) parseErrors(data, "Reset password gagal, coba lagi");
  return (data as ResetPassResponse).data;
}
