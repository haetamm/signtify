import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { refreshAccessToken } from "./authApi";

// Extend config untuk flag retry agar tidak infinite loop
interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosClient = axios.create({
  // Semua request lewat internal proxy Next.js, bukan Spring Boot langsung
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ── Request Interceptor ────────────────────────────────────────
// Attach access token dari sessionStorage ke setiap request
axiosClient.interceptors.request.use(
  (config) => {
    // Ambil store secara lazy untuk menghindari circular import
    // Import dinamis di runtime aman karena ini berjalan di browser
    const accessToken =
      typeof window !== "undefined"
        ? sessionStorage.getItem("accessToken")
        : null;

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response Interceptor ───────────────────────────────────────
// Handle 401: coba refresh, retry, atau logout
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig;

    // Hanya handle 401 dan hanya retry sekali
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const storedRefreshToken =
          typeof window !== "undefined"
            ? sessionStorage.getItem("refreshToken")
            : null;

        if (!storedRefreshToken) {
          throw new Error("No refresh token available");
        }

        // Panggil internal refresh route
        const res = await refreshAccessToken(storedRefreshToken);
        const newAccessToken = res.data.token;
        const newRefreshToken = res.data.refreshToken;

        // Simpan token baru
        sessionStorage.setItem("accessToken", newAccessToken);
        sessionStorage.setItem("refreshToken", newRefreshToken);

        // Update header dan retry request asal
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return axiosClient(originalRequest);
      } catch {
        // Refresh gagal — bersihkan sesi dan redirect ke login
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");

        // Lazy import store untuk logout agar tidak circular
        const { useAuthStore } = await import("@/lib/stores/useAuthStore");
        useAuthStore.getState().logout();

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
