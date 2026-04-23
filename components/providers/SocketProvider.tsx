"use client";

import { useNotificationSocket } from "@/lib/hooks/useNotificationSocket";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import { useEffect } from "react";

export default function SocketProvider() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const token =
    accessToken ??
    (typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null);

  useNotificationSocket(token);
  return null;
}
