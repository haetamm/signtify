import {
  forgotPassword,
  loginUser,
  logoutUser,
  resetPassword,
} from "@/lib/api/authApi";
import { useAuthStore } from "../stores/useAuthStore";
import {
  ForgotPassPayload,
  LoginPayload,
  ResetPassPayload,
} from "../types/auth";

export async function login(payload: LoginPayload) {
  const response = await loginUser(payload);

  const { username, token, refreshToken } = response;

  useAuthStore.getState().setAuth({
    user: { username },
    accessToken: token,
    refreshToken: refreshToken,
  });

  return response;
}

export async function forgotPass(payload: ForgotPassPayload) {
  const response = await forgotPassword(payload);
  return response;
}

export async function resetPass(
  payload: ResetPassPayload,
  refreshToken: string,
) {
  const response = await resetPassword(refreshToken, payload);
  return response;
}

export async function logout() {
  useAuthStore.getState().logout();
  return await logoutUser();
}
