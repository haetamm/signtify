"use client";

import { useNotificationStore } from "@/lib/stores/useNotificationStore";
import { navItems } from "@/lib/utils/link";
import NavButton from "../atoms/NavButton";

export function Navbar() {
  const notifications = useNotificationStore((state) => state.notifications);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <>
      <div className="flex items-end gap-1 md:gap-3">
        {navItems.left.map((item) => (
          <NavButton key={item.label} {...item} />
        ))}
      </div>
      <div className="flex items-end gap-1 md:gap-2">
        {navItems.right.map((item) => {
          // badge untuk item Notifications
          if (item.label === "Notifications") {
            return (
              <NavButton key={item.label} {...item} badgeCount={unreadCount} />
            );
          }
          return <NavButton key={item.label} {...item} />;
        })}
      </div>
    </>
  );
}
