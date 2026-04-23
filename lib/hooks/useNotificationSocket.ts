"use client";

import { Client } from "@stomp/stompjs";
import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { useNotificationStore } from "../stores/useNotificationStore";

export function useNotificationSocket(token: string | null) {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!token) return;
    if (clientRef.current?.active) return; // cegah double connect

    const client = new Client({
      webSocketFactory: () => {
        const sock = new SockJS("http://localhost:3000/ws");
        return sock;
      },
      connectHeaders: { Authorization: `Bearer ${token}` },
      heartbeatIncoming: 0,
      heartbeatOutgoing: 0,
      debug: (str) => console.log("STOMP debug:", str), // ← tambah ini
      onConnect: () => {
        console.log("STOMP connected");

        client.subscribe("/user/queue/notifications", (msg) => {
          useNotificationStore.getState().addNotification(JSON.parse(msg.body));
        });
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
    };
  }, [token]);
}
