"use client";

import { useFilteredNav } from "@/lib/hooks/useFilteredNav";
import { useNotificationStore } from "@/lib/stores/useNotificationStore";
import { navItems } from "@/lib/utils/link";
import NavButton from "../atoms/NavButton";
import NavbarSkeleton from "./NavbarSkeleton";

export function Navbar() {
  const notifications = useNotificationStore((state) => state.notifications);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const { visible: visibleLeft, isLoading: leftLoading } = useFilteredNav(
    navItems.left,
  );
  const { visible: visibleRight, isLoading: rightLoading } = useFilteredNav(
    navItems.right,
  );

  if (leftLoading || rightLoading) return <NavbarSkeleton />;

  return (
    <>
      <div className="flex items-end gap-1 md:gap-3">
        {visibleLeft.map((item) => (
          <NavButton key={item.label} {...item} />
        ))}
      </div>
      <div className="flex items-end gap-1 md:gap-2">
        {visibleRight.map((item) => {
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
