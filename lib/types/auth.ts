import { BaseResponse } from "../utils/interface";

export interface ForgotPassPayload {
  email: string;
}

export interface ForgotPassResponse extends BaseResponse {
  data: string;
}

export interface ResetPassPayload {
  password: string;
  confirmPassword: string;
}

export interface ResetPassResponse extends BaseResponse {
  data: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthResponse extends BaseResponse {
  data: {
    username: string;
    token: string;
    refreshToken: string;
  };
}

export interface LogoutResponse extends BaseResponse {
  data: string;
}

export interface AuthUser {
  username: string;
}

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}
