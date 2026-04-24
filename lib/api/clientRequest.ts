import { useAuthStore } from "../stores/useAuthStore";
import { ErrorResponse, FieldErrors } from "../utils/types";

let isRefreshing = false;
let refreshQueue: Array<
  (result: { ok: boolean; accessToken?: string; refreshToken?: string }) => void
> = [];

async function tryRefresh(): Promise<{
  ok: boolean;
  accessToken?: string;
  refreshToken?: string;
}> {
  if (isRefreshing) {
    return new Promise((resolve) => {
      refreshQueue.push(resolve);
    });
  }

  isRefreshing = true;

  try {
    const res = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "same-origin",
    });
    console.log(res);
    if (!res.ok) {
      const result = { ok: false };
      refreshQueue.forEach((cb) => cb(result));
      refreshQueue = [];
      return result;
    }

    const data = await res.json();
    const result = {
      ok: true,
      accessToken: data.data.token,
      refreshToken: data.data.refreshToken,
    };

    refreshQueue.forEach((cb) => cb(result));
    refreshQueue = [];
    return result;
  } catch {
    const result = { ok: false };
    refreshQueue.forEach((cb) => cb(result));
    refreshQueue = [];
    return result;
  } finally {
    isRefreshing = false;
  }
}

export async function clientRequest(
  url: string,
  method: string,
  body?: unknown,
  isRetry = false,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401 && !isRetry) {
    const { ok, accessToken, refreshToken } = await tryRefresh();

    if (!ok) {
      useAuthStore.getState().logout();
      window.location.href = "/";
      return res;
    }

    // Update store dan sessionStorage dengan token baru
    if (accessToken && refreshToken) {
      useAuthStore.getState().setTokens(accessToken, refreshToken);
    }

    return clientRequest(url, method, body, true);
  }

  return res;
}

export function parseErrors(
  data: ErrorResponse | unknown,
  fallback: string,
): never {
  const errors: FieldErrors = {};

  if (data && typeof data === "object") {
    if ("code" in data) {
      errors.code = (data as ErrorResponse).code;
    }
    if ("messages" in data) {
      const { messages } = data as ErrorResponse;
      if (Array.isArray(messages)) {
        messages.forEach((err) => (errors[err.path] = err.message));
      } else if (typeof messages === "string") {
        errors.general = messages;
      }
    }
  }

  if (!errors.general) {
    errors.general = fallback;
  }

  throw errors;
}
