import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AuthState, AuthUser } from "../types/auth";

interface AuthActions {
  setAuth: (params: {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
  }) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  hydrate: () => void;
}

type AuthStore = AuthState & AuthActions;

function setCookie(name: string, value: string, days = 1) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Strict`;
}

function removeCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: ({ user, accessToken, refreshToken }) => {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("refreshToken", refreshToken);
          // Cookie flag untuk Next.js middleware (bukan token asli)
          setCookie("isAuthenticated", "true");
        }
        set(
          { user, accessToken, refreshToken, isAuthenticated: true },
          false,
          "auth/setAuth",
        );
      },

      setTokens: (accessToken, refreshToken) => {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("refreshToken", refreshToken);
        }
        set({ accessToken, refreshToken }, false, "auth/setTokens");
      },

      logout: () => {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          removeCookie("isAuthenticated");
        }
        set(
          {
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
          },
          false,
          "auth/logout",
        );
      },

      hydrate: () => {
        if (typeof window === "undefined") return;
        const accessToken = sessionStorage.getItem("accessToken");
        const refreshToken = sessionStorage.getItem("refreshToken");
        if (accessToken && refreshToken) {
          set(
            { accessToken, refreshToken, isAuthenticated: true },
            false,
            "auth/hydrate",
          );
        }
      },
    }),
    { name: "AuthStore" },
  ),
);
